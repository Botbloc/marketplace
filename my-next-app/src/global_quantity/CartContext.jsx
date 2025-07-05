"use client";
import React, { useContext } from "react";
import {createContext, useState, useEffect} from "react";
import placeholder from "../assets/images/placeholder.jpg" ;
import ProductContext from "./ProductContext";

// context storing the cart details that can be used later on
const CartContext = createContext();

export const CartProvider = ({children}) => {
    const {product} = useContext(ProductContext); // map object for fast retrival
    const [cart, setCart] = useState([]);
    const [currency, setCurrency] = useState("$");
    // cart : [{"product_name" : sth, "price" : sth, "currency": sth},...,{}]

    useEffect(() => {
        setCurrency("$");
    },[])

    const addCart = (id) => {
        const item = product.get("id");
        if (item!== undefined){
            setCart(cart.push(item));
        }
        else{
            console.error("item not found.");
        }

    }

    const removeCart = (id) => {
        setCart(setCart(cart.filter(item=> item.id !== id)));
    }

    const clearCart = () => {
        setCart([]);
        
    }

    const listCart = () => {
        return(cart)
    }
    return (
        <CartContext.Provider value={{cart, currency, addCart, removeCart, clearCart, listCart}}>
            {children}
        </CartContext.Provider>
    );
}




export default CartContext;