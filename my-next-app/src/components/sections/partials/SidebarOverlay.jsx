// components/layout/SidebarLayer.jsx
"use client";
import React from "react";
import { useSidebar } from "../../../global_quantity/SidebarContext";

const SidebarLayer = () => {
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
          {sidebarContent || (
            <>
              <h2>Your Cart</h2>
              <p>Here are the items in your cart.</p>
            </>
          )}
          <button onClick={closeSidebar}>Close</button>
        </div>
      </div>
      
    </>
  );
};



export default SidebarLayer;
