import React from "react";
import {useEffect, useState} from "react";
import image1 from "../../assets/images/placeholder.jpg";
import Button from "../elements/Button"
import Product from "../../../components/sections/Product"

const Product_id = async ({params})=>{
    const {id} = params;
    return(
       <Product productID={id} /> 
    )
}

export default Product_id;