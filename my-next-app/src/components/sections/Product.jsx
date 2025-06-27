import React from "react";
import {useEffect, useState} from "react";
import image1 from "../../assets/images/placeholder.jpg";
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

// switch between Detail, Statistics, and review
const [TextType, setTextType] = useState("Detail");

const adjustText = (type) => {
    if (type = "Detail"){
        setTextType("Detail")
    }
    else if (type = "Statistics"){
        setTextType("Statistics")
    }
    else if(type = "Review"){
        setTextType("Review")
    }

}

const setDetailTextDisplay = () => {
    if (TextType == "Detail"){
        return(
            <div>
                <p>{product_detail.description}</p>
            </div>
        )
    }
    else if (TextType == "Statistics"){
        return(
            <div>
                <ul>
                    {product_detail.Statistics.map((id, value)=> {
                        <li>{id} : {value}</li>
                    })}
                </ul>
            </div>
        )
    }
    else if (TextType == "Review"){
        return(
            <div>
                <ul>
                    {product_detail.review.map((id, {stars, remark})=> {
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

const [Display, setDisplay] = useState();

// storing iamges for rotation
let product_iamges = {
    "image_1" : image1,
    "image_2" : image1,
    "image_3" : image1,
    "image_4" : image1,
}

useEffect(()=>{
    loadImage; // call api to draw images from drive to local 
},[])


const Product = ({productID,...prop})=>{

    return(
        <div className="product">
           <div className="row">
                <div className="col-md-6">
                    <div className="Big_Img">  
                        <img src={Display} className="large_img_config"/>
                    </div>
                    <ul className="small_Imgs">
                        {product_iamges.map((id,img_src) => {
                            <li className="small_img_icon">
                                <img src={img_src} className="small_img_config"/>
                            </li>
                        })}
                    </ul>
                    
                </div>

                <div className="col-md-6">
                    <h2>{product_detail.product_name}</h2>
                    <h3>{product_detail.price + " " + product_detail.currency}</h3>
                    <Button color="Blue" tag="Add to shopping cart"/>
                </div>
           </div>
           <div>
                <div className="Product_detail">
                    <ul>
                        <li>
                            <button onClick={adjustText("Detail")} className={`px-4 py-2 rounded ${
                                TextType == "Detail" ? 'bg-yellow-400 text-black' : 'bg-gray-300 text-black'}`}>
                                    Detail
                            </button>
                        </li>
                        <li>
                            <button onClick={adjustText("Statistics")} className={`px-4 py-2 rounded ${
                                TextType == "Statistics" ? 'bg-yellow-400 text-black' : 'bg-gray-300 text-black'}`}>
                                    Statistics
                            </button>
                        </li>
                        <li>
                            <button onClick={adjustText("Review")} className={`px-4 py-2 rounded ${
                                TextType == "Review" ? 'bg-yellow-400 text-black' : 'bg-gray-300 text-black'}`}>
                                    Review
                            </button>
                        </li>
                    </ul>
                    <div className="Detail_Text">
                        {setDetailTextDisplay()}
                    </div>
                </div>
           </div>
        </div>
    )
}

export default Product;