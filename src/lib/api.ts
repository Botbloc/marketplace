import { getAuth } from "firebase/auth";

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
) => {
  const user = getAuth().currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  const token = await user.getIdToken();
  const headers = new Headers(options.headers || {});
  headers.set("Authorization", `Bearer ${token}`);

  return fetch(url, {
    ...options,
    headers,
  });
};