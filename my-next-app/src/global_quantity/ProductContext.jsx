"use client";
import React from "react";
import {createContext, useState, useEffect} from "react";
import placeholder from "../assets/images/placeholder.jpg" 

// context storing the cart details that can be used later on
const ProductContext = createContext();

const items =[
  { id: 'a1', name: 'Apple' },
  { id: 'b2', name: 'Banana' },
  { id: 'c3', name: 'Cherry' },
];

export const ProductProvider = ({children}) => {
    
    const [product, setProduct] = useState();

    useEffect(() => {
        // get data from backend
        const itemMap = useMemo(() => new Map(items.map(item => [item.id, item])), [items]); // avoid rebuilding after every render
        setProduct(itemMap);
    },[])
    
    const findProductByID = (id) => {
        const item = product.get(id);
        if (item === undefined){
            return (
                {"exist" : true, "product_name" : item.product_name, "price": item.price}
            )
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