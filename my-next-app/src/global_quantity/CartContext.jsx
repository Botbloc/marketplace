"use client";
import React, { useContext } from "react";
import {createContext, useState, useEffect} from "react";
import placeholder from "../assets/images/placeholder.jpg" ;
import ProductContext from "./ProductContext";
import cart from "@/app/cart/page";

// context storing the cart details that can be used later on
const CartContext = createContext();

export const CartProvider = ({children}) => {
    const {idIndex} = useContext(ProductContext); // map object for fast retrival
    const [product_in_cart_Context, setCart] = useState([]);
    const [currency, setCurrency] = useState("$");
    // cart : [{"product_name" : sth, "price" : sth, "currency": sth},...,{}]

    useEffect(() => {
        setCurrency("$");
        const storedCart = localStorage.getItem("cart");
        console.log("cart from context: ", storedCart);
        if (storedCart !== undefined && storedCart !== null){
            
            setCart(JSON.parse(storedCart));
        }
    },[])

    useEffect(() => {
        if (product_in_cart_Context !== undefined && product_in_cart_Context !== null ){
             if(product_in_cart_Context.length > 0){
                localStorage.setItem("cart", JSON.stringify(product_in_cart_Context));
            }
        }
       
        
    },[product_in_cart_Context])

    const addCart = (id, amount, option = null) => {
        console.log(idIndex);
        const item = idIndex.get(id);
        console.log(item);
        
        if (item!== undefined && amount >0){
            const find_exist = product_in_cart_Context.find(item => item.id === id);
            if (find_exist === undefined){
                const item_with_quan = 
                {   "id" : id, 
                    "quantity" : amount,
                    "currency" : item.currency,
                    "price" : item.price,
                    "product_name" : item.product_name
                }
            
                const new_context = [...product_in_cart_Context, item_with_quan];
                //let new_context = product_in_cart_Context;
                //new_context.push(item_with_quan);
                console.log("new context: ", new_context);
                setCart(new_context);
                

                return "Item added to cart!"
            }
            else{
                const updated_context = product_in_cart_Context.map(
                    item => item.id === id? {...item, quantity : item.quantity + amount} : item
                );
                console.log("new context: ", updated_context);
                setCart(updated_context)
                return "Item added to cart!"
            }
            
        }
        else if(amount === 0){
            console.error("quantity is zero.");
            return "Quantity cannot be zero.";
        }
        else{
            console.error("item not found.");
            return "item not found.";
        }

    }

    const removeCart = (id) => {
        console.log("id: ",id);
        console.log("product_in_cart_Context: \n", product_in_cart_Context);
        const newCart = product_in_cart_Context.filter(item=> item.id !== id);
        localStorage.setItem("cart",JSON.stringify(newCart) );
        setCart(newCart);

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