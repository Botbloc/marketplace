"use client";
import React from "react";
import {createContext, useState, useContext, useEffect,useMemo} from "react";
const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileContent, setProfileContent] = useState(null); // 🆕

  const openProfile = (content = null) => {
    if (content) setProfileContent(content);
    setIsOpen(true);
  };
  const closeProfile = () => {
    setIsOpen(false);
    setProfileContent(null);
  };

  return (
    
    <ProfileContext.Provider value={{ isOpen, openProfile, closeProfile, profileContent }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;

export const useProfile = () => useContext(ProfileContext);
