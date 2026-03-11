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

        </div>
        
    </div>
    )
    
}
export default DashboardLayout;