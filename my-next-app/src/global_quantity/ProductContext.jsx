"use client";
import React from "react";
import {createContext, useState, useEffect,useMemo} from "react";
import placeholder from "../assets/images/placeholder.jpg" ;

// context storing the cart details that can be used later on
const ProductContext = createContext();

const items =[
  { id: 'a1', product_name: 'Apple', price: 200 },
  { id: 'b2', product_name: 'Banana', price: 100 },
  { id: 'c3', product_name: 'Cherry', price: 200  },
];

export const ProductProvider = ({children}) => {
    
    const [product, setProduct] = useState();


    useEffect(() => {
        const map = new Map(items.map(item => [item.id, item]));
        setProduct(map);
    }, [items]);    
    
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

    const addProduct = (id,product_name,price ) => {
        const newItem = {"id" : id, "product_name" : product_name, "price" : price};
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