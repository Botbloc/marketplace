import { getAuth } from "firebase/auth";

type SessionRequestBody = Record<string, unknown> | unknown[] | null;
type ApiErrorResponse = {
  error?: string;
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

    return res.json();
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
    const error = await res.json().catch(() => ({} as ApiErrorResponse));
    throw new Error(error?.error || "Request failed");
  }

  return res.json() as Promise<T>;
};
