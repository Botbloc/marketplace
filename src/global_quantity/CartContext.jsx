"use client";
import React, { useContext } from "react";
import {createContext, useState, useEffect} from "react";
import placeholder from "../assets/images/placeholder.jpg" ;
import { useCart } from "../components/hooks/useCart";
import AuthContext from "./AuthContext";

// context storing the cart details that can be used later on
const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const [cartLoaded, setCartLoaded] = useState(false);
    const [currency, setCurrency] = useState("$");
    const {auth_in_context} = useContext(AuthContext);
    const login_status = auth_in_context.isLoggedIn;
    const {removeCartItems , mergeCart, addCart : addCloudCart } = useCart({local_cart : cart});
    const sessionLoading = auth_in_context.sessionLoading;

    useEffect( () => {
        if (sessionLoading) return;
        let cancelled = false; // flag to prevent state updates after the component is unmounted or the effect is re-run

        const loadCart = async () => {
            try{
                if (!login_status){ // use localstorage when not logged in
                    setCurrency("$");
                    const storedCart = localStorage.getItem("cart");
                    console.log("cart from context: ", storedCart);

                    if (!cancelled) {
                        if (storedCart) {
                            setCart(JSON.parse(storedCart));
                        } else {
                            setCart([]);
                        }
                    }  
                }
                else{
                    const storedCart = localStorage.getItem("cart");
                    const localCart = storedCart ? JSON.parse(storedCart) : [];
                    const data = await mergeCart(localCart)
                    console.log(data);
                    if (!cancelled) {
                        setCart(data);
                    }
                }
            } catch (error) {
                console.error("Failed to load/merge cart:", error);
            } finally {
                if (!cancelled) {
                    setCartLoaded(true);
                }
            }
            
        }
        loadCart();
        return () => {
            cancelled = true;
        };
    },[login_status, mergeCart, sessionLoading])
    

    const errorCheckFromServer = (result , message) => {
        if (!result) {
            console.error("Failed to add item to cart: No response from server");
            return "Failed to add item to cart: No response from server";
        }
        if (result.error) {
            console.error(message, result.error);
            return message + result.error;
        }
        return null;
    }
    
    const addCart = async (id, amount, product) => {

        if(amount === 0){
            console.error("quantity is zero.");
            return "Quantity cannot be zero.";
        }
        // verify if the id is valid 
        if(!product){
            console.error("item not found.");
            return "item not found.";
        }
        console.log(product);
        
        if (product!== undefined && amount >0){
            const find_exist = cart.find(item => item.id === id);
            if (find_exist === undefined){
                const item_with_quan = 
                {   "id" : id, 
                    "quantity" : amount,
                    "currency" : product.currency,
                    "price" : product.price,
                    "product_name" : product.product_name
                }
            
                const new_context = [...cart, item_with_quan];
                console.log("new context: ", new_context);
                if (!login_status) {
                    setCart(new_context);
                    localStorage.setItem("cart", JSON.stringify(new_context));
                } else {
                    const result = await addCloudCart(id, amount);
                    const error_message = errorCheckFromServer(result, "Failed to add item to cart: ");
                    if (error_message) {
                        return error_message;
                    }
                    if (result) {
                        setCart(result);
                    }
                }
                return "Item added to cart!"
            }
            else{
                const quantityToAdd = Number(amount);
                const existingItem = cart.find(item => item.id === id);
                const newQuantity = existingItem
                    ? existingItem.quantity + quantityToAdd
                    : quantityToAdd;

                const updated_context = cart.map(
                    item => item.id === id? {...item, quantity : newQuantity} : item
                );
                console.log("new context: ", updated_context);
                
                if (!login_status) {
                    setCart(updated_context);
                    localStorage.setItem("cart", JSON.stringify(updated_context));
                } else {
                    const result = await addCloudCart(id, quantityToAdd);
                    const error_message = errorCheckFromServer(result, "Failed to add item to cart: ");
                    if (error_message) {
                        return error_message;
                    }
                    else if (result) {
                        setCart(result);
                    }
                }
                return "Item added to cart!"
            }
        }
    }

    const removeCart = async (ids) => {
        // normalize ids to an array
        const idArray = Array.isArray(ids) ? ids : [ids];
        console.log("Removing ids: ", idArray);
        console.log("Current cart: ", cart);
        // filter out all items whose id is in idArray
        const newCart = cart.filter(
            item => !idArray.includes(item.id)
        );
        // persist to localStorage 
        if (!login_status) {
            setCart(newCart);
            localStorage.setItem("cart", JSON.stringify(newCart));
        }
        else{
            const result = await removeCartItems(idArray);
            const error_message = errorCheckFromServer(result, "Failed to remove item from cart: ");
            if (error_message) {
                return error_message;
            }
            else if (result) {
                setCart(result);
            }
        }
    };

    const clearCart = async () => {
        if (!login_status) {
            setCart([]);
            localStorage.removeItem("cart");
            return;
        }
        const result = await removeCartItems(cart.map(item => item.id));
        const error_message = errorCheckFromServer(result, "Failed to remove item from cart: ");
        if (error_message) {
            return error_message;
        }
        
        else if (result) {
            setCart(result);
        }
    };

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