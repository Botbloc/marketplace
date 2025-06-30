"use client";
import React from "react";
import {useEffect, useState} from "react";
import image1 from "../../assets/images/placeholder.jpg";
import image2 from "../../assets/images/landscape-placeholder.svg";
import Button from "../elements/Button"

// we need image, price, product detail

// api call, now load with preloaded iamges
const loadImage = async () =>{  

}

const product_detail = {
    "product_name": "Product 1",
    "price" : 0,
    "currency" : "$",
    "description": "Template Description",
    "Statistics" : {
        "spec 1" : 0,
        "spec 2" : 0,
        "spec 3" : 0,
        "spec 4" : 0,
    },
    "review" : {
        "user 1" : {
            "stars" : 5,
            "remark" : "Template Remark"
        },
        "user 2" : {
            "stars" : 5,
            "remark" : "Template Remark"
        }
    }
    
}


// storing iamges for rotation
let product_iamges = [
    image1,
    image1,
    image1,
    image1,
    image1,
    image1,
    image1,
    image1
    
]


const Product = ({productID,...prop})=>{

    const [Display, setDisplay] = useState();

    useEffect(()=>{
        setDisplay(image2);
        console.log("image1: ",image2);
        console.log("image1: ",Display);
        //loadImage; // call api to draw images from drive to local 
    },[])

    // switch between Detail, Statistics, and review
    const [TextType, setTextType] = useState("Detail");


    const setDetailTextDisplay = () => {
        if (TextType == "Detail"){
            return(
                <div>
                    <h1>Detail</h1>
                    <p>{product_detail.description}</p>
                </div>
            )
        }
        else if (TextType == "Statistics"){
            return(
                <div>
                    <h1>Statistics</h1>
                    <ul>
                        {Object.entries(product_detail.Statistics).map(([id, value])=> {
                            <li>{id} : {value}</li>
                        })}
                    </ul>
                </div>
            )
        }
        else if (TextType == "Review"){
            return(
                <div>
                    <h1>Review</h1>
                    <ul>
                        {Object.entries(product_detail.review).map((id, {stars, remark})=> {
                            <div>
                                <h3>id</h3>
                                <ul>
                                    <li>Stars: {stars}</li>
                                    <li>Remark: {remark}</li>
                                </ul>
                            </div>
                            
                        })}
                    </ul>
                </div>
            )
        }
        else{
            return(
                <div>
                    <h3>Error in display</h3>
                </div>
            )
        }

    }

    return(
        
        Display && 
        <div className="product">
           <div className="row">
                <div className="col-md-6 left-pane" >
                    <div className="Big_Img">
                        
                        {console.log("DIsplay: ",Display)}
                        <img src={Display.src} className="large_img_config"/>
                    </div>
                    <ul className="small_Imgs">
                        {(product_iamges).map((img_src) => (
                            <li className="small_img_icon" key={img_src}>
                                {console.log("image src: ", img_src)}
                                
                                <img src={img_src.src} className="small_img_config"/>
                            </li>
                        ))}
                    </ul>
                    
                </div>

                <div className="col-md-6 right-pane">
                    <h2>{product_detail.product_name}</h2>
                    <h3>{product_detail.currency + " " + product_detail.price}</h3>
                    <button>Add to shopping cart</button>
                </div>
           </div>
           <div className="borderline"></div>
            <div className="Product_detail">
                <ul className="detail_buttons">
                    <li>
                        <button onClick={() =>setTextType("Detail")} className={`px-4 py-2 rounded ${
                            TextType == "Detail" ? 'background-color: blue' : 'bg-gray-300'}`}>
                                Detail
                        </button>
                    </li>
                    <li>
                        <button onClick={() =>setTextType("Statistics")} className={`px-4 py-2 rounded ${
                            TextType == "Statistics" ? 'bg-yellow-400' : 'bg-gray-300'}`}>
                                Statistics
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setTextType("Review")} className={`px-4 py-2 rounded ${
                            TextType == "Review" ? 'bg-yellow-400' : 'bg-gray-300'}`}>
                                Review
                        </button>
                    </li>
                </ul>
                <div className="Detail_Text">
                    {setDetailTextDisplay()}
                </div>
            </div>
           
        </div>
    )
}

export default Product;