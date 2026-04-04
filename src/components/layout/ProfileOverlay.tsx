// components/layout/SidebarLayer.jsx
"use client";
import React from "react";
import { useProfile } from "../../global_quantity/ProfileContext";

const ProfileOverlay = ({value, onChange ,children, header}) => {
  const {isOpen, openProfile, closeProfile, profileContent} = useProfile();

  //if (!isOpen) return null;

  return (
    <> 
      <div
        className={`profile-sidebar-overlay ${isOpen ? "open" : ""}`}
        onClick={closeProfile}
      />

      <div className={`profile-sidebar-panel ${isOpen ? "open" : ""}`}>
        <div className="profile_header">
            <h5>{header}</h5>
            <button onClick={closeProfile}>X</button>
        </div>
        <div className="profile-sidebar-content">
          {typeof children === "function"
          ? children(value, onChange)
          : children}
          
        </div>
      </div>
      
    </>
  );
};



export default ProfileOverlay;
