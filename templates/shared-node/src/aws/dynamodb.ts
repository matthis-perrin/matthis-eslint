import {readFileSync} from 'node:fs';

import {
  AttributeValue,
  BatchGetItemCommand,
  BatchWriteItemCommand,
  DeleteItemCommand,
  DescribeTableCommand,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
  ScanCommand,
  ScanCommandOutput,
  TableDescription,
  TransactWriteItem,
  TransactWriteItemsCommand,
  Update,
  UpdateItemCommand,
  UpdateItemCommandInput,
  UpdateItemCommandOutput,
} from '@aws-sdk/client-dynamodb';
import {
  marshall as utilDynamodb_marshall,
  unmarshall as utilDynamodb_unmarshall,
} from '@aws-sdk/util-dynamodb';

import {NODE_ENV, REGION} from '@shared/env';
import {chunkArray, splitOnceOrThrow} from '@shared/lib/array_utils';
import {removeUndefined} from '@shared/lib/type_utils';

const MAX_BATCH_GET_ITEMS = 100;
const MAX_BATCH_WRITE_ITEMS = 25;
const PUT_ITEMS_MAX_RETRIES = 3;

function readCredentials(): {accessKeyId: string; secretAccessKey: string} | undefined {
  if (NODE_ENV !== 'development') {
    return;
  }
  const credentialsFile = readFileSync('./terraform/.aws-credentials').toString();
  const credentialsLines = credentialsFile.split('\n');
  const credentials = Object.fromEntries(
    credentialsLines
      .filter(line => line.includes(' = '))
      .map(line => {
        const [key, value] = splitOnceOrThrow(line, ' = ');
        return [key, value];
      })
  );
  const {aws_access_key_id, aws_secret_access_key} = credentials;
  if (aws_access_key_id === undefined || aws_secret_access_key === undefined) {
    return undefined;
  }
  return {accessKeyId: aws_access_key_id, secretAccessKey: aws_secret_access_key};
}

const client = new DynamoDBClient({region: REGION, credentials: readCredentials()});

type Key = Record<string, unknown>;
type AdditionalParams = Record<string, unknown>;

export const marshall = (input: Record<string, unknown>): Record<string, AttributeValue> =>
  utilDynamodb_marshall(input, {
    convertEmptyValues: false,
    removeUndefinedValues: true,
    convertClassInstanceToMap: false,
  });
export const unmarshall = utilDynamodb_unmarshall;

export async function deleteItem(params: {
  tableName: string;
  key: Record<string, unknown>;
  additionalParams?: Record<string, unknown>;
}): Promise<{itemExisted: boolean}> {
  const res = await client.send(
    new DeleteItemCommand({
      TableName: params.tableName,
      Key: marshall(params.key),
      ReturnValues: 'ALL_OLD',
      ...params.additionalParams,
    })
  );
  return {itemExisted: res.Attributes !== undefined};
}

export async function getItemRaw(params: {
  tableName: string;
  key: Key;
  additionalParams?: AdditionalParams;
}): Promise<Record<string, AttributeValue> | undefined> {
  const {Item} = await client.send(
    new GetItemCommand({
      TableName: params.tableName,
      Key: marshall(params.key),
      ...params.additionalParams,
    })
  );
  return Item;
}

export async function getItem<T>(params: {
  tableName: string;
  key: Key;
  additionalParams?: AdditionalParams;
}): Promise<T | undefined> {
  const item = await getItemRaw(params);
  if (item === undefined) {
    return undefined;
  }
  return unmarshall(item) as T;
}

export async function getItems<T>(params: {
  tableName: string;
  keys: Record<string, unknown>[];
  consistent?: boolean;
}): Promise<T[]> {
  const ConsistentRead = params.consistent;
  const allKeys = params.keys.map(key => marshall(key));
  const chunked = chunkArray(allKeys, MAX_BATCH_GET_ITEMS);
  const items: T[] = [];
  while (chunked.length > 0) {
    const chunk = chunked.pop();
    if (chunk) {
      // eslint-disable-next-line no-await-in-loop
      const data = await client.send(
        new BatchGetItemCommand({
          RequestItems: {[params.tableName]: {Keys: chunk, ConsistentRead}},
        })
      );

      const newItems = data.Responses?.[params.tableName];
      if (newItems) {
        items.push(...newItems.map(item => unmarshall(item) as T));
      }

      // Handle UnprocessedKeys by adding the missing keys back into our list of keys to fetch
      // https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_BatchGetItem.html
      const missingKeys = data.UnprocessedKeys?.[params.tableName]?.Keys;
      if (missingKeys) {
        chunked.push(missingKeys);
      }
    }
  }
  return items;
}

// simple transaction function to put items in multiple tables
export async function transactWriteItems(params: {
  transaction: TransactWriteItem[];
}): Promise<void> {
  await client.send(
    new TransactWriteItemsCommand({
      TransactItems: params.transaction,
    })
  );
}

export async function putItem<T extends Record<string, unknown>>(params: {
  tableName: string;
  item: T;
  additionalParams?: AdditionalParams;
}): Promise<void> {
  await client.send(
    new PutItemCommand({
      TableName: params.tableName,
      Item: marshall(params.item),
      ...params.additionalParams,
    })
  );
}

export async function putItems(params: {
  tableName: string;
  items: Record<string, unknown>[];
  retryNumber?: number;
}): Promise<void> {
  const unprocessedItems: Record<string, unknown>[] = [];
  const chunked = chunkArray(params.items, MAX_BATCH_WRITE_ITEMS);
  while (chunked.length > 0) {
    const chunk = chunked.pop();
    if (chunk) {
      // eslint-disable-next-line no-await-in-loop
      const {UnprocessedItems} = await client.send(
        new BatchWriteItemCommand({
          RequestItems: {
            [params.tableName]: chunk.map(item => ({
              PutRequest: {
                Item: marshall(item),
              },
            })),
          },
        })
      );
      if (UnprocessedItems !== undefined) {
        for (const writeRequest of Object.values(UnprocessedItems[params.tableName] ?? [])) {
          if (writeRequest.PutRequest?.Item) {
            unprocessedItems.push(writeRequest.PutRequest.Item);
          }
        }
      }
    }
    if (unprocessedItems.length > 0) {
      const retryNumber = (params.retryNumber ?? 0) + 1;
      console.warn(
        `Failed to add the following items, tentative n°${retryNumber}:`,
        JSON.stringify(unprocessedItems)
      );
      if (retryNumber === PUT_ITEMS_MAX_RETRIES) {
        throw new Error('Failed to put items in database');
      }
      // eslint-disable-next-line no-await-in-loop
      await putItems({
        tableName: params.tableName,
        items: unprocessedItems,
        retryNumber,
      });
    }
  }
}

export interface QueryParams {
  tableName: string;
  keyConditionExpression: string;
  expressionAttributeNames?: Record<string, string>;
  expressionAttributeValues?: Record<string, unknown>;
  filterExpression?: string;
  indexName?: string;
  scanIndexForward?: boolean;
  paginationToken?: string;
  limit?: number;
  additionalParams?: AdditionalParams;
}

export async function queryItems<T>(params: QueryParams): Promise<{
  items: T[];
  nextPaginationToken?: string;
  count?: number;
}> {
  let exclusiveStartKey: Record<string, AttributeValue> | undefined;
  if (params.paginationToken !== undefined) {
    try {
      exclusiveStartKey = JSON.parse(
        Buffer.from(params.paginationToken, 'base64').toString('utf8')
      );
    } catch {
      throw new Error('Invalid paginationToken');
    }
  }

  const items: Record<string, AttributeValue>[] = [];
  let count = 0;
  do {
    // eslint-disable-next-line no-await-in-loop
    const {Items, LastEvaluatedKey, Count} = await client.send(
      new QueryCommand({
        TableName: params.tableName,
        IndexName: params.indexName,
        ExclusiveStartKey: exclusiveStartKey,
        FilterExpression: params.filterExpression,
        KeyConditionExpression: params.keyConditionExpression,
        ExpressionAttributeNames: params.expressionAttributeNames ?? undefined,
        ExpressionAttributeValues: params.expressionAttributeValues
          ? marshall(params.expressionAttributeValues)
          : undefined,
        ScanIndexForward: params.scanIndexForward ?? undefined,
        Limit: params.limit,
        ...params.additionalParams,
      })
    );
    items.push(...(Items ?? []));
    exclusiveStartKey = LastEvaluatedKey;
    count += Count ?? 0;
  } while (
    exclusiveStartKey &&
    params.limit !== undefined &&
    params.limit > 0 &&
    items.length < params.limit
  );

  return {
    items: items.map(i => unmarshall(i) as T),
    nextPaginationToken: exclusiveStartKey
      ? Buffer.from(JSON.stringify(exclusiveStartKey)).toString('base64')
      : undefined,
    count,
  };
}

export async function queryAllItems<T>(
  params: Omit<QueryParams, 'paginationToken' | 'limit'>
): Promise<T[]> {
  let paginationToken: string | undefined;
  const items: T[] = [];
  do {
    // eslint-disable-next-line no-await-in-loop
    const res = await queryItems<T>({...params, paginationToken});
    paginationToken = res.nextPaginationToken;
    items.push(...res.items);
  } while (paginationToken !== undefined);
  return items;
}

export interface CountParams {
  tableName: string;
  keyConditionExpression: string;
  expressionAttributeNames?: Record<string, string>;
  expressionAttributeValues?: Record<string, unknown>;
  filterExpression?: string;
  indexName?: string;
  additionalParams?: AdditionalParams;
}

export async function countItems(params: CountParams): Promise<number> {
  let exclusiveStartKey: Record<string, AttributeValue> | undefined;

  let counter = 0;
  do {
    // eslint-disable-next-line no-await-in-loop
    const {LastEvaluatedKey, Count} = await client.send(
      new QueryCommand({
        TableName: params.tableName,
        IndexName: params.indexName,
        ExclusiveStartKey: exclusiveStartKey,
        FilterExpression: params.filterExpression,
        KeyConditionExpression: params.keyConditionExpression,
        ExpressionAttributeNames: params.expressionAttributeNames ?? undefined,
        ExpressionAttributeValues: params.expressionAttributeValues
          ? marshall(params.expressionAttributeValues)
          : undefined,
        Select: 'COUNT',
        ...params.additionalParams,
      })
    );
    counter += Count ?? 0;
    exclusiveStartKey = LastEvaluatedKey;
  } while (exclusiveStartKey);

  return counter;
}

export async function scanItems<T>(params: {
  tableName: string;
  expressionAttributeNames?: Record<string, string>;
  expressionAttributeValues?: Record<string, unknown>;
  filterExpression?: string;
  indexName?: string;
  paginationToken?: string;
  limit?: number;
  additionalParams?: AdditionalParams;
}): Promise<{
  items: T[];
  nextPaginationToken?: string;
}> {
  let exclusiveStartKey: Record<string, AttributeValue> | undefined;
  if (params.paginationToken !== undefined) {
    try {
      exclusiveStartKey = JSON.parse(
        Buffer.from(params.paginationToken, 'base64').toString('utf8')
      );
    } catch {
      throw new Error('Invalid paginationToken');
    }
  }

  const {Items, LastEvaluatedKey} = await client.send(
    new ScanCommand({
      TableName: params.tableName,
      IndexName: params.indexName,
      ExclusiveStartKey: exclusiveStartKey,
      FilterExpression: params.filterExpression,
      ExpressionAttributeNames: params.expressionAttributeNames ?? undefined,
      ExpressionAttributeValues: params.expressionAttributeValues
        ? marshall(params.expressionAttributeValues)
        : undefined,
      Limit: params.limit,
      ...params.additionalParams,
    })
  );

  return {
    items: (Items ?? []).map(i => unmarshall(i) as T),
    nextPaginationToken: LastEvaluatedKey
      ? Buffer.from(JSON.stringify(LastEvaluatedKey)).toString('base64')
      : undefined,
  };
}

export interface ScanAllItemsParams {
  tableName: string;
  expressionAttributeNames?: Record<string, string>;
  expressionAttributeValues?: Record<string, unknown>;
  filterExpression?: string;
  indexName?: string;
}
export async function scanAllItems(params: {
  tableName: string;
  expressionAttributeNames?: Record<string, string>;
  expressionAttributeValues?: Record<string, unknown>;
  filterExpression?: string;
  indexName?: string;
  projectionExpression?: string;
}): Promise<Record<string, unknown>[]> {
  const items: Record<string, unknown>[] = [];
  let lastEvaluatedKey;
  do {
    // eslint-disable-next-line no-await-in-loop
    const {Items, LastEvaluatedKey}: ScanCommandOutput = await client.send(
      new ScanCommand({
        TableName: params.tableName,
        IndexName: params.indexName,
        ExclusiveStartKey: lastEvaluatedKey,
        FilterExpression: params.filterExpression,
        ExpressionAttributeNames: params.expressionAttributeNames ?? undefined,
        ExpressionAttributeValues: params.expressionAttributeValues
          ? marshall(params.expressionAttributeValues)
          : undefined,
        ProjectionExpression: params.projectionExpression,
      })
    );
    items.push(...(Items ?? []).map(i => unmarshall(i)));
    lastEvaluatedKey = LastEvaluatedKey;
  } while (lastEvaluatedKey !== undefined);

  return items;
}

export interface UpdateExpression {
  set?: string[];
  remove?: string[];
  add?: string[];
  delete?: string[];
}

type OmittedFromAdditionalParams =
  | 'Key'
  | 'TableName'
  | 'UpdateExpression'
  | 'ExpressionAttributeNames'
  | 'ExpressionAttributeValues';

export interface UpdateItemParams {
  expressionAttributeNames?: Record<string, string>;
  expressionAttributeValues?: Record<string, unknown>;
  key: Key;
  tableName: string;
  updateExpression: UpdateExpression;
  additionalParams?:
    | Omit<UpdateItemCommandInput, OmittedFromAdditionalParams>
    | Omit<Update, OmittedFromAdditionalParams>;
}

const joinWithPrefix = (val: string[] | undefined, prefix: string): string | undefined => {
  if (val === undefined || val.length === 0) {
    return undefined;
  }
  return `${prefix} ${val.join(', ')}`;
};
export function generateUpdateExpression(updateExpression: UpdateExpression): string {
  return removeUndefined([
    joinWithPrefix(updateExpression.set, 'SET'),
    joinWithPrefix(updateExpression.remove, 'REMOVE'),
    joinWithPrefix(updateExpression.add, 'ADD'),
    joinWithPrefix(updateExpression.delete, 'DELETE'),
  ]).join(' ');
}

export function updateItemParamsToUpdateItemCommandInput(
  params: UpdateItemParams
): UpdateItemCommandInput & {UpdateExpression: string} {
  const updateExpression = params.updateExpression;
  const expressionAttributeNames = params.expressionAttributeNames ?? {};
  const expressionAttributeValues = params.expressionAttributeValues
    ? marshall(params.expressionAttributeValues)
    : {};

  return {
    Key: marshall(params.key),
    TableName: params.tableName,
    UpdateExpression: generateUpdateExpression(updateExpression),
    ExpressionAttributeNames:
      Object.keys(expressionAttributeNames).length > 0 ? expressionAttributeNames : undefined,
    ExpressionAttributeValues:
      Object.keys(expressionAttributeValues).length > 0 ? expressionAttributeValues : undefined,
    ...params.additionalParams,
  };
}

export async function updateItem(params: UpdateItemParams): Promise<UpdateItemCommandOutput> {
  return client.send(new UpdateItemCommand(updateItemParamsToUpdateItemCommandInput(params)));
}

export function makeUpdateBatchParams(
  props: {name: string; value: unknown}[]
): Pick<
  UpdateItemParams,
  'updateExpression' | 'expressionAttributeNames' | 'expressionAttributeValues'
> {
  const updateExpressionSet: string[] = [];
  const updateExpressionRemove: string[] = [];
  const expressionAttributeNames: Record<string, string> = {};
  const expressionAttributeValues: Record<string, unknown> = {};

  for (const [i, {name, value}] of Object.entries(props)) {
    // eslint-disable-next-line no-null/no-null
    if (value === null || value === undefined) {
      updateExpressionRemove.push(`#name${i}`);
      expressionAttributeNames[`#name${i}`] = name;
    } else {
      updateExpressionSet.push(`#name${i} = :value${i}`);
      expressionAttributeNames[`#name${i}`] = name;
      expressionAttributeValues[`:value${i}`] = value;
    }
  }

  const updateExpression: UpdateItemParams['updateExpression'] = {};
  if (updateExpressionSet.length > 0) {
    updateExpression.set = updateExpressionSet;
  }
  if (updateExpressionRemove.length > 0) {
    updateExpression.remove = updateExpressionRemove;
  }

  return {
    updateExpression,
    expressionAttributeNames,
    expressionAttributeValues,
  };
}

export async function describeTable(tableName: string): Promise<TableDescription | undefined> {
  const res = await client.send(new DescribeTableCommand({TableName: tableName}));
  return res.Table;
}