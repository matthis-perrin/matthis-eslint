interface LambdaEvent {
  path: string;
  headers: Record<string, string>;
  httpMethod: string;
  body: string | null;
}

interface LambdaResponse {
  headers?: Record<string, string>;
  statusCode: number;
  body: string;
}

function normalizePath(path: string): string {
  const withLeading = path.startsWith('/') ? path : `/${path}`;
  const withoutTrailing = withLeading.endsWith('/') ? withLeading.slice(0, -1) : withLeading;
  return withoutTrailing;
}

function parseBody(body: string | null): Record<string, unknown> {
  let jsonBody = {};
  if (typeof body === 'string') {
    try {
      jsonBody = JSON.parse(body);
    } catch {
      // leave jsonBody as an empty object
    }
  }
  return jsonBody;
}

export async function handler(event: LambdaEvent): Promise<LambdaResponse> {
  const method = event.httpMethod.toUpperCase();
  const path = normalizePath(event.path);
  const body = parseBody(event.body);
  return Promise.resolve({statusCode: 200, body: JSON.stringify({method, path, body})});
}
