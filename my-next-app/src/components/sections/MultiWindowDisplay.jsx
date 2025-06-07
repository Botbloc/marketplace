"use client";
import React from 'react';
import {useContext, useEffect,useState} from "react";
import placeholder from '../../assets/images/placeholder.jpg';


const MultiWindowDisplay = () => {
  const [image, setImage] = useState('');

  useEffect(() =>{
    setImage(placeholder);
  },[])


  return (
    <div className="grid">
      <div className = "grid_display_big row gx-0 gy-0">
          {/*<img src={image} alt="" className="profile" />*/}
          
          <div className="col-md-6">
            <div className="box box-1">
              → learn more
            </div>
          </div>
          <div className="  col-md-6"> 
            
            <div className="grid_display_mid row gx-0 gy-0">
              <div className="col-sm-6">
                <div className=" box box-2">
                  → learn more
                </div>
              </div>
              <div className="col-sm-6">
                <div className=" box box-3">
                  → learn more
                </div>
              </div>
            </div>
            
            <div className="grid_display_mid row">
              <div className="col-sm-12">
                <div className="box box-4">
                    → learn more
                </div>
                </div>
            </div>
            
          </div>
          
      
      </div>
    </div>
  );
  
}

export default MultiWindowDisplay;