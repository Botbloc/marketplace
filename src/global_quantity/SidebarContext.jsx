"use client";
import React from "react";
import {createContext, useState, useContext, useEffect,useMemo} from "react";
const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarContent, setSidebarContent] = useState(null); // 🆕

  const openSidebar = (content = null) => {
    if (content) setSidebarContent(content);
    setIsOpen(true);
  };
  const closeSidebar = () => {
    setIsOpen(false);
    setSidebarContent(null);
  };

  return (
    
    <SidebarContext.Provider value={{ isOpen, openSidebar, closeSidebar, sidebarContent }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;

export const useSidebar = () => useContext(SidebarContext);
