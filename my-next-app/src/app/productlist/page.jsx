"use client";
import React from "react";
import Sidebar from '../../components/layout/Sidebar';
import Search_bar from '../../components/sections/Search_bar';

let array1 = [
    {},{},{},{},{},{},{},{},{},{},{},{}
]

const productlist = () => {
    return(
        <div>
            <Search_bar />
            
            <div className="product_list">
                <Sidebar />
                <ul className="product_grid" >
                    {array1.map((item)=>(
                        <li className="product_in_grid">
                            
                        </li>
                    ))}
                </ul>
            </div>
            <div className="hero">

            </div>
            

        </div>
    )
}

export default productlist;