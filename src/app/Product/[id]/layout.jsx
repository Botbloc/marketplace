"use client";
import {useState, useContext} from "react";
import  SidebarContext  from '../../../global_quantity/SidebarContext';
// app/layout.tsx
//import '../../globals.css';
//import Sidebar from '../../components/layout/Sidebar';


export default function layout({ children }) {
    const { isOpen, closeSidebar, sidebarContent } = useContext(SidebarContext);
    //const [sidebarOpen, setSidebarOpen] = useState(false);

    const SidebarOverlay = () => {
            return(
                <div
                    className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
                    onClick={() => closeSidebar()}
                ></div>
            )
        }

        const SidebarForOptions = () => {
            //console.log("hi");
            return(
                <div className={`sidebar-panel ${isOpen ? 'open' : ''}`}>
                    <div className="sidebar-content">
                    <h2>Your Cart</h2>
                    <p>Here are the items in your cart.</p>
                    <button onClick={() => closeSidebar()}>Close</button>
                    </div>
                </div>
            )
        }
  return (
    <div>
         {children}
    </div>
  );
}
