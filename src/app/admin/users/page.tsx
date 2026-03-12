"use client";
import {useState,useEffect} from "react";
import { getAuth } from "firebase/auth";
import { fetchWithAuth } from "../../../lib/api";
import Table from "../../../components/elements/Table";
const Users = () => {

    const [users, setUsers] = useState([]);

    type User = {
        id: string
        email: string
        role: string
    }

    useEffect(() => {

        const fetchUsers = async () => {
            try{
                const user = getAuth().currentUser;
                const token = await user.getIdToken();
                const res = await fetchWithAuth("/api/users");
                const data = await res.json();
                setUsers(data);
            }
            catch(err){
                console.error(err);
            }
            
        };

        fetchUsers();

    }, []);

    const createNewUser = async (newUser : User) => {
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
            const data = await res.json();
            
        }
        catch(err){
            console.error(err);
        }
    }

    return(
        <div>
            <h5>users info</h5>
            <Table content={users}/>
        </div>
    );
}
export default Users;