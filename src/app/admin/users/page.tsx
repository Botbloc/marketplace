"use client";
import {useState,useEffect} from "react";
import { getAuth } from "firebase/auth";
import { fetchWithAuth } from "../../../lib/api";
import Table from "../../../components/elements/Table";
import { User_type } from "../../types/Index";
import { fetchUsers, createNewUser } from "../../service/users.service";
const Users = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const userColumns = [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "role", label: "Role" },
        { key: "createdAt", label: "Created" },
        ];

    useEffect(() => {

        const loadUsers = async () => {
            try{
                const data = await fetchUsers();
                setUsers(data);
            }catch (err) {
                console.error(err);
                setError("Failed to fetch users");
            } finally {
                setLoading(false);
            }
            
        };

        loadUsers();

    }, []);

    const renderTable = () => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>{error}</div>;
        return(
            <Table content={users} columns={userColumns}/>
        )
    }

    return(
        <div className="User_Information">
            <div className="feature_bar">
                <h3>User Information</h3>
            </div>
            <div className="table_session">
                {renderTable()}
            </div>
        </div>
    );
}
export default Users;