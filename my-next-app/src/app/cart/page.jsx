"use client";
//import React from "react";
import {useState, useEffect, useContext} from "react";
import cart_logic from "../../global_quantity/CartContext";
import product_logic from "../../global_quantity/ProductContext";
import Link from "next/link";

const template_product = [
    {
        "id" : 0,
        "product_name" : "Product 1",
        "price" : 100,
        "currency" : "$",
        "quantity" : 3
    },
    {
        "id" : 1,
        "product_name" : "Product 2",
        "price" : 300,
        "currency" : "$",
        "quantity" : 2
    },
    {
        "id" : 2,
        "product_name" : "Product 3",
        "price" : 600,
        "currency" : "$",
        "quantity" : 4
    },
    {
        "id" : 3,
        "product_name" : "Product 4",
        "price" : 600,
        "currency" : "$",
        "quantity" : 4
    },
    {
        "id" : 4,
        "product_name" : "Product 5",
        "price" : 600,
        "currency" : "$",
        "quantity" : 4
    },
    {
        "id" : 5,
        "product_name" : "Product 6",
        "price" : 6000,
        "currency" : "$",
        "quantity" : 1
    },
    {
        "id" : 6,
        "product_name" : "Product 7",
        "price" : 60,
        "currency" : "$",
        "quantity" : 1
    },
    {
        "id" : 7,
        "product_name" : "Product 8",
        "price" : 200,
        "currency" : "$",
        "quantity" : 8
    }
]


const cart = () =>{

    
    const [product_in_cart, setProduct] = useState([]);
    const {product} = useContext(product_logic);
    //const {product_in_cart, addCart} = useContext(cart_logic);
    const [currency, setCurrency] = useState("$");
    const [total, setTotal] = useState("0");


    // get data from context
    useEffect(() => {
        setProduct(template_product);
        
    },[])

    const generateProductEntity = (e) => {
        const href = "product/"
        return(
            <div className="product_container">
                {console.log("product from context: ", product)}
                {product_in_cart.map((item) => {
                    return(
                        <Link href={href+item.id}>
                            <div className="product_in_cart" key={item.id}>
                                <div className="item_name_module">
                                    <h4>{item.product_name}</h4>
                                </div>
                                <div className="item_price_module">
                                    <div className="cell">{item.currency + " " + item.price}</div>
                                    <div className="cell">{item.quantity}</div>
                                    <div className="cell">{item.currency + " " + item.price * item.quantity}</div>
                                </div>
                            </div>
                        </Link>
                        
                    )                 
                })}
            </div>
        )
        
        
    }

    const displayCalculation = () => {
        return(
            <div className="calculation_display">
                {product_in_cart.map((item)=>{
                    if (item.id === product_in_cart.at(-1)?.id){
                        return (
                            <div className="display_item" key={item.id}>
                                <span>+</span>
                                <span>{item.product_in_cart}</span>
                                <span>{item.currency + " " + item.price}</span>
                            </div>
                        )
                    }
                    else{
                        return(            
                        <div className="display_item" key={item.id}>
                            <span>{item.product_in_cart}</span>
                            <span>{item.currency + " " + item.price}</span>
                        </div>
                    )
                    }
                })}
                <div className="borderline">
                </div>
                <div className="display_item">
                    <span>total: </span>
                    <span>{currency+" "+total}</span>
                </div>
                
            </div>
        )
    }
    const dummy = 120;
    return(
        product_in_cart != undefined
        && <div className="cart_window">
            <div className="cart_heading">

                    <h4>Your Shopping Cart</h4>
                
                <div className="heading_purchase">
                    <h4>Total: ${dummy.toFixed(2)}</h4>
                    <button>Proceed to checkout</button>
                </div>
                
            </div>
            
            <div className="left_pane">
                <div className="product_header">
                    <div>
                        <div className="cell">
                            product
                        </div>
                    </div>
                        
                    <div className="item_price_module_header">
                        <div className="cell">
                            Unit Price
                        </div>
                        <div className="cell">
                            Qty
                        </div>
                        <div className="cell">
                            Subtotal
                        </div>
                    </div>
                </div>
                {generateProductEntity(product_in_cart)}
            </div>
                

            
        </div>        
    )
} 

export default cart;
