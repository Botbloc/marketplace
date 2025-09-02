
import React from "react";
//import {useContext} from "react";
import Button from "../../../components/elements/Button"
import Product from "../../../components/sections/Product"
import Search_bar from '../../../components/sections/Search_bar';


export const dynamicParams = false;

export async function generateStaticParams() {
  // MUST be a build-time list. If your products come from runtime context, this won’t work.
  
  const products = [
    "AB-1234", "AB-1000", "AB-1001", "AB-1002", "AB-1003", "AB-1004", "AB-1005", "AB-1006", "AB-1007", "AB-1008", "AB-1009", "AB-1010",
    "AB-1011", "AB-1012", "AB-1013", "AB-1014", "AB-1015", "AB-1016", "AB-1017", "AB-1018"
  ]
  return products.map(id => ({ id }));
}

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