// components/layout/SidebarLayer.jsx
"use client";
import React from "react";
import { useSidebar } from "../../global_quantity/SidebarContext";

type SidebarLayerProps = {
  children: React.ReactNode;
  header: string;
  
};

const SidebarLayer = ({children, header} : SidebarLayerProps) => {
  const { isOpen, closeSidebar, sidebarContent } = useSidebar();

  //if (!isOpen) return null;

  return (
    <> 
      <div
        className={`sidebar-overlay ${isOpen ? "open" : ""}`}
        onClick={closeSidebar}
      />

      <div className={`sidebar-panel ${isOpen ? "open" : ""}`}>
        <div className="sidebar_header">
            <h5>{header}</h5>
            <button onClick={closeSidebar}>X</button>
        </div>
        <div className="sidebar-content">
          {children}
          
        </div>
      </div>
      
    </>
  );
};



export default SidebarLayer;
