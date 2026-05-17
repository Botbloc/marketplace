import { getAuth } from "firebase/auth";

type SessionRequestBody = Record<string, unknown> | unknown[] | null;
type ApiErrorResponse = {
  error?: string;
};

const parseApiResponse = async <T>(res: Response): Promise<T> => {
  if (res.status === 204 || res.status === 205) {
    return undefined as T;
  }

  const contentLength = res.headers.get("content-length");
  const contentType = res.headers.get("content-type") ?? "";

  if (contentLength === "0" || contentType === "") {
    return undefined as T;
  }

  if (contentType.includes("application/json")) {
    return res.json() as Promise<T>;
  }

  return (await res.text()) as T;
};

export const fetchWithTokenAuth = async <T> (
  url: string,
  options: RequestInit = {},
  body?: any
): Promise<T> => {
  const user =  getAuth().currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }
  
  const token = await user.getIdToken();
  const headers = new Headers(options.headers || {});
  headers.set("Authorization", `Bearer ${token}`);

  if (body) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(url, {
    ...options,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error || "Request failed");
  }

  return parseApiResponse<T>(res);
};

export const fetchWithSessionAuth = async <T> (
  url: string,
  options: RequestInit = {},
  body?: SessionRequestBody
): Promise<T> => {
  const headers = new Headers(options.headers || {});

  if (body !== undefined && body !== null) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers,
    body: body !== undefined && body !== null ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    console.log('Response not OK:', res);
    const error = await res.json().catch(() => ({} as ApiErrorResponse));
    console.error('Error response:', error);
    throw new Error(error?.error || "Request failed");
  }

  return parseApiResponse<T>(res);
};
