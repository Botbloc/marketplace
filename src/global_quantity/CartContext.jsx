"use client";
import React, { useContext } from "react";
import {createContext, useState, useEffect} from "react";
import placeholder from "../assets/images/placeholder.jpg" ;
import ProductContext from "./ProductContext";
import { useCart } from "../components/hooks/useCart";

// context storing the cart details that can be used later on
const CartContext = createContext();

export const CartProvider = ({children}) => {
    const {idIndex} = useContext(ProductContext); // map object for fast retrival
    const [cart, setCart] = useState([]);
    const [cartLoaded, setCartLoaded] = useState(false);
    const [currency, setCurrency] = useState("$");
    const { setCart: updateCloudCart } = useCart({local_cart : cart});
    // cart : [{"product_name" : sth, "price" : sth, "currency": sth},...,{}]

    useEffect(() => {
        setCurrency("$");
        const storedCart = localStorage.getItem("cart");
        console.log("cart from context: ", storedCart);
        if (storedCart !== undefined && storedCart !== null){
            
            setCart(JSON.parse(storedCart));
        }
        setCartLoaded(true);
    },[])

    useEffect(() => {
        if (!cartLoaded) return;

        if (cart !== undefined && cart !== null ){
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCloudCart(cart);
        }
       
        
    },[cart, cartLoaded, updateCloudCart])

    const addCart = (id, amount, option = null) => {
        console.log(idIndex);
        const item = idIndex.get(id);
        console.log(item);
        
        if (item!== undefined && amount >0){
            const find_exist = cart.find(item => item.id === id);
            if (find_exist === undefined){
                const item_with_quan = 
                {   "id" : id, 
                    "quantity" : amount,
                    "currency" : item.currency,
                    "price" : item.price,
                    "product_name" : item.product_name
                }
            
                const new_context = [...cart, item_with_quan];
                //let new_context = cart;
                //new_context.push(item_with_quan);
                console.log("new context: ", new_context);
                setCart(new_context);
                

                return "Item added to cart!"
            }
            else{
                const updated_context = cart.map(
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

    const removeCart = (ids) => {
        // normalize ids to an array
        const idArray = Array.isArray(ids) ? ids : [ids];

        console.log("Removing ids: ", idArray);
        console.log("Current cart: ", cart);

        // filter out all items whose id is in idArray
        const newCart = cart.filter(
            item => !idArray.includes(item.id)
        );

        // persist to localStorag
        localStorage.setItem("cart", JSON.stringify(newCart));

        // update state
        setCart(newCart);
    };

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
