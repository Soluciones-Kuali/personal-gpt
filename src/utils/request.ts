/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: Record<string, any> | FormData;
};

export default async function request<T>(
  url: string | URL,
  options: RequestOptions = {}
): Promise<T> {
  const { body, headers, ...restOptions } = options;

  const isFormData = body instanceof FormData;

  const response = await fetch(url, {
    ...restOptions,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    headers: {
      ...headers,
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    },
  });

  let responseData;
  try {
    responseData = await response.json();
  } catch {
    responseData = null;
  }

  if (!response.ok) {
    const error = new Error(responseData?.error || responseData?.message || `HTTP Error: ${response.status}`);
    (error as any).status = response.status;
    (error as any).data = responseData;
    throw error;
  }

  return responseData as T;
}
