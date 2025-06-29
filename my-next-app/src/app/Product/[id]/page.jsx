"use client"
import React from "react";
import {useEffect, useState} from "react";
import Button from "../../../components/elements/Button"
import Product from "../../../components/sections/Product"

const Product_id = async ({params})=>{

    const param = await params;
    const id  = param.id;
    return(
       <Product productID={id} /> 
    )
}

export default Product_id;