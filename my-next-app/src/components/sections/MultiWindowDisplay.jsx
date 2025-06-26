"use client";
import React from 'react';
import {useContext, useEffect,useState} from "react";
import placeholder from '../../assets/images/placeholder.jpg';
import { usePathname } from 'next/navigation';


const MultiWindowDisplay = () => {
  const [image, setImage] = useState('');
  const pathname = usePathname();

  const getBackground = (numbering) => {
    switch (numbering) {
      case 0:
        return '/images/home.jpg';
      case 1:
        return '/images/about.jpg';
      case 2:
        return '/images/about.jpg';
      case 3:
        return '/images/about.jpg';
      default:
        return '/images/default.jpg';
    }
  };

  useEffect(() =>{
    setImage(placeholder);
  },[])


  return (
    <div className="grid">
      <div className = "grid_display_big row gx-0 gy-0">
          {/*<img src={image} alt="" className="profile" />*/}
          
          <div className="col-md-6">
            <div className="box box-1">
              → Learn more
            </div>
          </div>
          <div className="  col-md-6"> 
            
            <div className="grid_display_mid row gx-0 gy-0">
              <div className="col-sm-6">
                <div className=" box box-2">
                  → Learn more
                </div>
              </div>
              <div className="col-sm-6">
                <div className=" box box-3">
                  → Learn more
                </div>
              </div>
            </div>
            
            <div className="grid_display_mid row ">
              <div className="col-sm-12">
                <div className="box box-4 ">
                    → Learn more
                </div>
                </div>
            </div>
            
          </div>
          
      
      </div>
    </div>
  );
  
}

export default MultiWindowDisplay;