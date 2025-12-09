// Accordion.jsx
"use client";
import React, { useState,useRef, useEffect } from "react";
import useContainerWidth from "../hooks/useContainerWidth";

export default function Accordion({ 
  title, 
  mobileOnly = false, // if true: only collapsible on mobile
  defaultOpen = false,
  breakpoint = 350,
  children, 
  
  
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [isNarrow, setIsNarrow] = useState(false);  
  const { ref, width } = useContainerWidth();

  useEffect (()=> {
    if (width < breakpoint){
      setIsNarrow(true);
    }
    else{
      setIsNarrow(false);
    }
  },[width]);

  const handleToggle = () => {
    // If it's mobile-only, desktop clicks will be disabled via CSS,
    // but no harm keeping logic simple here.
    setOpen((prev) => !prev);
  };

   const sectionClass = [
    "accordion-section",
    mobileOnly ? "accordion--mobile-only" : "",
    isNarrow ? "is-narrow" : "is-wide"
  ]
    .filter(Boolean)
    .join(" ");

   return (
    <div 
      ref={ref}
      className={sectionClass} 
    >
      <button
        type="button"
        className={`accordion-header ${open ? "open" : ""}`}
        onClick={handleToggle}
      >
        <span>{title}</span>
        <span className="chevron" aria-hidden="true">
          ▾
        </span>
      </button>

      <div className={`accordion-body ${open ? "open" : ""}`}>{children}</div>
    </div>
  );
}
