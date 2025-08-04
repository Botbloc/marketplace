"use client";
import React from "react";
import {createContext, useState, useEffect,useMemo} from "react";
import placeholder from "../assets/images/placeholder.jpg" ;

// context storing the cart details that can be used later on
const ProductContext = createContext();

const items =[
  { id: '1', product_name: 'Apple', price: 200, currency:"$" },
  { id: '2', product_name: 'Banana', price: 100 , currency:"$"},
  { id: '3', product_name: 'Cherry', price: 200 , currency:"$" },
  { id: '4', product_name: 'Component 1', price: 1200 , currency:"$" },
  { id: '5', product_name: 'component 2', price: 3000 , currency:"$" }
];

export const ProductProvider = ({children}) => {
    
    const [product, setProduct] = useState(new Map());


    useEffect(() => {
        const map = new Map(items.map(item => [item.id, item]));
        setProduct(map);
    }, []);    
    
    const findProductByID = (id) => {
        console.log(product);
        const item = product.get(id);
        
        if (item !== undefined){
            return (
                {"exist" : true, "product_name" : item.product_name, "price": item.price,  currency:"$"} 
            )
        }
        return(
            {"exist" : false}
        )
    }

    const addProduct = (id,product_name,price ) => {
        const newItem = {"id" : id, "product_name" : product_name, "price" : price,  currency:"$"};
        const newMap = new Map(product);
        newMap.set(id, newItem);
        // maybe some verification here
        setProduct(newMap);

    }

    

    return (
        <ProductContext.Provider value={{product, findProductByID, addProduct}}>
            {children} 
        </ProductContext.Provider>
    );
}




export default ProductContext;