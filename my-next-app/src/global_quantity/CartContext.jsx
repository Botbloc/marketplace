"use client";
import React, { useContext } from "react";
import {createContext, useState, useEffect} from "react";
import placeholder from "../assets/images/placeholder.jpg" ;
import ProductContext from "./ProductContext";

// context storing the cart details that can be used later on
const CartContext = createContext();

export const CartProvider = ({children}) => {
    const {product} = useContext(ProductContext); // map object for fast retrival
    const [product_in_cart_Context, setCart] = useState([]);
    const [currency, setCurrency] = useState("$");
    // cart : [{"product_name" : sth, "price" : sth, "currency": sth},...,{}]

    useEffect(() => {
        setCurrency("$");
    },[])

    const addCart = (id, amount) => {
        console.log(product);
        const item = product.get(id);
        console.log(item);
        
        if (item!== undefined){
            const item_with_quan = 
                {   "id" : id, 
                    "quantity" : amount
                }
            setCart(product_in_cart_Context.push(item_with_quan));
            console.log("product in cart: \n",product_in_cart_Context);
            return "Item added to cart!"
        }
        else{
            console.error("item not found.");
            return "item not found.";
        }

    }

    const removeCart = (id) => {
        setCart(setCart(product_in_cart_Context.filter(item=> item.id !== id)));
    }

    const clearCart = () => {
        setCart([]);
        
    }

    const listCart = () => {
        return(product_in_cart_Context)
    }
    return (
        <CartContext.Provider value={{product_in_cart_Context, currency, addCart, removeCart, clearCart, listCart}}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;