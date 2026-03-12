import { getAuth } from "firebase/auth";

export const fetchWithAuth = async <T> (
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const user = getAuth().currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  const token = await user.getIdToken();
  const headers = new Headers(options.headers || {});
  headers.set("Authorization", `Bearer ${token}`);
  const res = await fetch(url, {
    ...options,
    headers,
  });

  return res.json();
};