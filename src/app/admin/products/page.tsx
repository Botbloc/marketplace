"use client";
import {useState,useEffect} from "react";
import { getAuth } from "firebase/auth";
import { fetchWithAuth } from "../../../lib/api";
import Table from "../../../components/elements/Table";
import { Products_type } from "../../types/product";
const Products = () => {

    const [products, setproducts] = useState([]);
    
    useEffect(() => {

        const fetchProducts = async () => {
            try{
                const user = getAuth().currentUser;
                const token = await user.getIdToken();
                const res_data = await fetchWithAuth<Products_type[]>("/api/products");
                setproducts(res_data);
            }
            catch(err){
                console.error(err);
            }
            
        };

        fetchProducts();

    }, []);

    const createNewProducts = async (newProducts : Products_type) => {
        try{
            const user = getAuth().currentUser;
            const token = await user.getIdToken();
            const res = await fetchWithAuth("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProducts),
            });
            
        }
        catch(err){
            console.error(err);
        }
    }

    return(
        <div>
            <h5>Products info</h5>
            <Table content={products}/>
        </div>
    );
}
export default Products;