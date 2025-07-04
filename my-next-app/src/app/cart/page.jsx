"use client";
//import React from "react";
import {useState, useEffect, useContext} from "react";
import cart_logic from "../../global_quantity/CartContext";
import Link from "next/link";

const template_product = [
    {
        "id" : 0,
        "product_name" : "product 1",
        "price" : 100,
        "currency" : "$"
    },
    {
        "id" : 1,
        "product_name" : "product 2",
        "price" : 300,
        "currency" : "$"
    },
    {
        "id" : 2,
        "product_name" : "product 3",
        "price" : 600,
        "currency" : "$"
    }
]


const cart = () =>{

    
    const [product, setProduct] = useState([]);
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
                {console.log("product: ",product)}
                {product.map((item) => {
                    return(
                        <Link href={href+item.id}>
                            <div className="product_in_cart" key={item.id}>
                                <h4>{item.product_name}</h4>
                                <h5>{item.currency + " " + item.price}</h5>
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
                {product.map((item)=>{
                    if (item.id === product.at(-1)?.id){
                        return (
                            <div className="display_item" key={item.id}>
                                <span>+</span>
                                <span>{item.product}</span>
                                <span>{item.currency + " " + item.price}</span>
                            </div>
                        )
                    }
                    else{
                        return(            
                        <div className="display_item" key={item.id}>
                            <span>{item.product}</span>
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

    return(
        product != undefined
        && <div className="cart_window">
            <div>
                <h4>Shopping Cart</h4>
            </div>
            <div className="row">
                <div className="col-md-6 left_pane">
                    
                    {generateProductEntity(product)}
                </div>
                <div className="col-md-6 right_pane">
                    <div>
                        {displayCalculation()}
                    </div>
                    <button>Proceed to checkout</button>
                </div>

            </div>
        </div>        
    )
} 

export default cart;
