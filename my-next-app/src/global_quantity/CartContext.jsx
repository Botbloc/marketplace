"use Client";
import React from "react";
import React, {createContext, useState, useEffect} from "react";
import placeholder from "../assets/images/placeholder.jpg" 

// context storing the cart details that can be used later on
const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    const addCart = () => {

    }

    const removeCart = () => {

    }

    const clearCart = () => {

    }

    const listCart = () => {
        
    }
}




export default CartContext;