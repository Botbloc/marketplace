"use client";
import React, { useState,useRef, useEffect } from "react";
import StatsSection from "../sections/StatsSection";
const DashboardLayout =  ({multi_display}) => {
    return(
        <div className="dashbaord">
        <StatsSection multi_display={multi_display}/>
        {
            // need to build another component for the below
        }
        
        <div className="main_display">
            {
                // chart, table, etc.
                // table for recent orders, chart for sales over time, etc.
                // alerts
                // quick actions (e.g., add product, view orders, etc.)
                
            }
            
        </div>
        
    </div>
    )
    
}
export default DashboardLayout;