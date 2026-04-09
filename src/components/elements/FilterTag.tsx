"use client";
import React from "react";

const FilterTag = ({filters, filterLabels, updateUrl}) => {
        return Object.entries(filters)
        .filter(([key, value]) =>
        key !== "page" &&
        value !== undefined &&
        value !== "" &&
        value !== null
        )
        .map(([key, value]) => {
            const label = filterLabels[key] || key; 
            return(
                <>
                    <div key={label} className="tag">
                        <div className="tag_detail">
                            {label}: {value}
                        </div>
                        <div
                            className="remove_tag"
                            onClick={()=>{
                                updateUrl({[key] : undefined})
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24">
                                <rect x="0" fill="none" width="24" height="24"/>
                                <g>
                                <path d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z"/>
                                </g>
                            </svg>
                        </div>
                    </div>  
                    
                </>
            )
             
        })
    }
export default FilterTag;