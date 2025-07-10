"use client"
import React from "react";
import {useEffect, useState} from "react";
import Button from "../../../components/elements/Button"
import Product from "../../../components/sections/Product"
import Search_bar from '../../../components/sections/Search_bar';

const Product_id = async ({params})=>{

    const param = await params;
    const id  = param.id;
    return(
        <>
            <Search_bar />
            <Product productID={id} /> 
        </>
    )
}

export default Product_id;