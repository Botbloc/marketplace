"use client";
import {useState,useEffect} from "react";
import { getAuth } from "firebase/auth";
import { fetchWithAuth } from "../../../lib/api";
import Table from "../../../components/elements/Table";

const Orders = () => {

    const [orders, setOrders] = useState([]);


    return(
        <div>
            <h5>orders info</h5>
            <Table content={orders}/>
        </div>
    );
}
export default Orders;