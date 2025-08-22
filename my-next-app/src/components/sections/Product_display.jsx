"use client";
import React from "react";
import Carousel from "../elements/Carousel";
import {useContext} from "react";
import ProductContext from "../../global_quantity/ProductContext";
import { useRouter } from "next/navigation";

const Product_display = ({theme})=>{
    const router = useRouter();
    let header = "";
    const {allProducts} = useContext(ProductContext); 
    let display_entity = [];
    const href = "/product/";
    switch (theme) {
        case "Trending":
            header = "Trending";
            display_entity = allProducts
                .filter(p => p.rating >= 5) // filter first
                .slice(0, 10);               // then take first 10
            
            break;
    
        case "Suggestion":
            display_entity = allProducts
                //.filter(p => p.rating >= 5) // filter first
                .slice(0, 10);               // then take first 10
            header = "Suggested for you";
            break;
    }
    const generateDisplayCard = (item) =>{
        console.log(item);
        return(
            <div className="card" onClick={() => router.push(href+item.id)}>
                <h3>{item.product_name}</h3>
                <p>From {item.currency + "" + item.price}</p>
                <h4>Learn more →</h4>
            </div>
        )
    }

    return(
        <div className="product_display">
            <h3>{header}</h3>
            <div className="product_display_inner">
                {display_entity.map((item)=>(
                    generateDisplayCard(item)
                ))}
            </div>
        </div>
        
    )
}

export default Product_display;