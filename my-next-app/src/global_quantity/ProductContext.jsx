"use client";
import React from "react";
import {createContext, useState, useEffect} from "react";
import placeholder from "../assets/images/placeholder.jpg" 

// context storing the cart details that can be used later on
const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    
    const [product, setProduct] = useState([]);

    useEffect(() => {
        // get data from backend
    },[])
    
    const findProductByID = (id) => {
        for (let i of product){
            if (product.id === id){
                return (
                    {"exist" : true, "product_name" : product.product_name, "Price": product.price}
                )
            }

        }
        return(
            {"exist" : false}
        )
    }

    const addProduct = () => {

    }

    

    return (
        <ProductContext.Provider value={{product, findProductByID}}>
            {children} 
        </ProductContext.Provider>
    );
}




export default ProductContext;