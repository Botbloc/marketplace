"use client";
import React from "react";
import {createContext, useState, useEffect} from "react";
import placeholder from "../assets/images/placeholder.jpg" 

// context storing the cart details that can be used later on
const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const [currency, setCurrency] = useState("$");
    // cart : [{"product_name" : sth, "price" : sth, "currency": sth},...,{}]

    const addCart = (id) => {


    }

    const removeCart = (id) => {
        for (let i = 0; i <= cart.length; i++){
            
        }
    }

    const clearCart = () => {
        setCart([]);
    }

    const listCart = () => {
        
    }
    return (
        <CartContext.Provider value={cart}>
            {children}
        </CartContext.Provider>
    );
}




export default CartContext;