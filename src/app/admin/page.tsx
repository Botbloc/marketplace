"use client";
import React, { useState,useRef, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
export default function page() {
  const [multi_display, setMulti_display] = useState([
    {id: 0 , label: "Revenue", amount : "£12,430"},
    {id: 1 , label: "Orders", amount : "245"},
    {id: 2 , label: "Products", amount : "134"},
    {id: 3 , label: "Users", amount : "89"}
  ]);
  return (
    
     <DashboardLayout multi_display={multi_display}/>

  );
}