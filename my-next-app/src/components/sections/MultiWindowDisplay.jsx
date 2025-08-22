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
      
        {/*<img src={image} alt="" className="profile" />*/}
        
        <div className="card_container">
          <div className="box tall">
              <span className="span_header">Use cases for SMEs</span>
              <span className='learn_more'>→ Learn more</span>
          </div>
          
          <div className=" box">  
              <span className="span_header">Investment Opportunity</span>
              <span>→ Learn more</span>
          </div>
            
          <div className=" box">
              <span className="span_header">About us</span>
              <span>→ Learn more</span>
          </div>
            
          <div className="box wide ">
              <span className="span_header">Develop and sell with us</span>
              <span>→ Learn more</span>
          </div>
  
        </div>
          
      
      
    </div>
  );
  
}

export default MultiWindowDisplay;