// components/layout/SidebarLayer.jsx
"use client";
import React from "react";
import { useSidebar } from "../../../global_quantity/SidebarContext";

const SidebarLayer = ({value, onChange ,children}) => {
  const { isOpen, closeSidebar, sidebarContent } = useSidebar();

  //if (!isOpen) return null;

  return (
    <> 
      <div
        className={`sidebar-overlay ${isOpen ? "open" : ""}`}
        onClick={closeSidebar}
      />

      <div className={`sidebar-panel ${isOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          {typeof children === "function"
          ? children(value, onChange)
          : children}
          <button onClick={closeSidebar}>Close</button>
        </div>
      </div>
      
    </>
  );
};



export default SidebarLayer;
