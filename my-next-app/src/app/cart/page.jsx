"use client";
//import React from "react";
import {useState, useEffect, useContext} from "react";
import cart_logic from "../../global_quantity/CartContext";

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

    // get data from context
    useEffect(() => {
        setProduct(template_product);
    },[])

    const [product, setProduct] = useState([]);

    const generateProductEntity = (e) => {
        return(
            <div className="product_container">
                {console.log("product: ",product)}
                {product.map((item) => {
                    return(
                        <div className="product_in_cart" key={item.id}>
                            <h4>{item.product_name}</h4>
                        </div>
                    )
                    
                    
                })}
                

            </div>
        )
        
        
    }

    return(
        product != undefined
        && <div className="cart_window">
            <div className="row">
                <div className="col-md-6 left_pane">
                    <h4>Shopping Cart</h4>
                    {generateProductEntity(product)}
                </div>
                <div className="col-md-6 right_pane">

                </div>

            </div>
        </div>        
    )
} 

export default cart;
