import { getAuth } from "firebase/auth";
import { fetchWithTokenAuth } from "../lib/api";
import { User_type } from "../types/Index";

export const createNewUser = async (newUser: User_type) => {
  try {
    const user = getAuth().currentUser;
    const token = await user.getIdToken();

    await fetchWithTokenAuth("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchUsers = async (): Promise<User_type[]> => {
  return fetchWithTokenAuth<User_type[]>("/api/users");
};
