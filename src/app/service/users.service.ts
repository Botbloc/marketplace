import { User_type } from "../types/Index";
import { fetchWithAuth } from "../../lib/api";
import { getAuth } from "firebase/auth";

export const createNewUser = async (newUser : User_type) => {
    try{
        const user = getAuth().currentUser;
        const token = await user.getIdToken();
        const res = await fetchWithAuth("/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
        });
        //const data = await res.json();
        
    }
    catch(err){
        console.error(err);
    }
}

export const fetchUsers = async (): Promise<User_type[]> => {
  return fetchWithAuth<User_type[]>("/api/users");
};