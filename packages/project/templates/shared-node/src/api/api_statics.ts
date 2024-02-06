import {readFile} from 'node:fs/promises';

import {GetObjectCommand, S3Client} from '@aws-sdk/client-s3';

import {CODE_BUCKET, NODE_ENV} from '@shared/env';

import {ApiRequest, ApiResponse} from '@shared-node/api/api_interface';
import {SessionManager} from '@shared-node/api/api_session';

export async function handleStatics(
  req: ApiRequest,
  opts: {frontendName: string; websiteUrl: string; session: SessionManager}
): Promise<ApiResponse | undefined> {
  const {method, path} = req;
  const {frontendName, websiteUrl, session} = opts;

  // index.html
  if (method === 'GET' && (path === '' || path === '/' || path === '/index.html')) {
    return getIndex(req, {frontendName, session});
  }
  // manifest.webmanifest
  if (method === 'GET' && path === '/manifest.webmanifest') {
    const manifestRes = await loadStatic({
      frontendName,
      path: 'assets/manifest.webmanifest',
      contentType: 'application/manifest+json',
    });
    const manifestJson = JSON.parse(manifestRes.body ?? '{}');
    manifestJson.start_url = websiteUrl;
    manifestRes.body = JSON.stringify(manifestJson);
    return manifestRes;
  }

  return undefined;
}

const staticsCache: Record<string, string> = {};
const s3Client = new S3Client();

const replaceManifestPath = (str: string): string =>
  str.replaceAll(
    /<link rel="manifest" href="[^"]+">/gu,
    '<link rel="manifest" href="manifest.webmanifest">'
  );

async function loadStatic(opts: {
  frontendName: string;
  path: string;
  contentType: string;
}): Promise<ApiResponse> {
  const {frontendName, path, contentType} = opts;
  const cacheKey = `${frontendName}::${path}`;
  if (staticsCache[cacheKey] !== undefined && NODE_ENV !== 'development') {
    return {body: staticsCache[cacheKey], opts: {contentType}};
  }
  if (NODE_ENV === 'development') {
    const buffer = await readFile(`./${frontendName}/dist/${path}`);
    // eslint-disable-next-line require-atomic-updates
    staticsCache[cacheKey] = replaceManifestPath(buffer.toString());
    return {body: staticsCache[cacheKey], opts: {contentType}};
  }
  const res = await s3Client.send(
    new GetObjectCommand({Bucket: CODE_BUCKET, Key: `${frontendName}/${path}`})
  );
  const content = await res.Body?.transformToString();
  if (content === undefined) {
    return {body: '', opts: {contentType}};
  }
  // eslint-disable-next-line require-atomic-updates
  staticsCache[cacheKey] = replaceManifestPath(content);
  return {body: staticsCache[cacheKey], opts: {contentType}};
}

export async function getIndex(
  req: ApiRequest,
  opts: {
    frontendName: string;
    session: SessionManager;
  }
): Promise<ApiResponse> {
  const res = await loadStatic({
    frontendName: opts.frontendName,
    path: 'index.html',
    contentType: 'text/html',
  });
  if (
    res.body !== undefined &&
    opts.session.isLikelyConnected({getRequestHeader: (h: string) => req.headers[h.toLowerCase()]})
  ) {
    res.body = res.body.replace('</head>', '<script>window.IS_CONNECTED = true</script></head>');
  }
  return res;
}
