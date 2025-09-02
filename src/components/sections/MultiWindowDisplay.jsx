"use client";
import React from 'react';
import {useContext, useEffect,useState, useRef} from "react";
import placeholder from '../../assets/images/placeholder.jpg';
import { usePathname } from 'next/navigation';


// later needa set it to support different plane style
const MultiWindowDisplay = () => {
  const [image, setImage] = useState('');
  const pathname = usePathname();
  const gridRef = useRef(null);

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

  const [atTop, setAtTop] = useState(true);

  // Watch for scroll to top
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY === 0) {
        setAtTop(true);
      } else if (atTop) {
        setAtTop(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [atTop]);

  useEffect(() =>{
    setImage(placeholder);
    const cards = gridRef.current.querySelectorAll(".box") ?? [];

    // 🧼 reset cards whenever we reach top
    if (atTop) {
      cards.forEach((card) => {
        card.classList.remove("visible");
        card.style.opacity = "0";
        card.style.removeProperty("animation");
        card.style.removeProperty("animationDelay");
        card.style.removeProperty("opacity");
        card.style.removeProperty("transform");
      });
    }


    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            // add stagger via delay
            el.style.animationDelay  = `${i * 400}ms`;
            el.classList.add("visible");

            // 🧼 release animation so :hover can win afterwards
            const onEnd = () => {
              el.style.animation = "none";
              el.style.opacity = "1";
              el.removeEventListener("animationend", onEnd);
            };
            el.addEventListener("animationend", onEnd, { once: true });


            obs.unobserve(el); // only animate once
          }
        });
      },
      { threshold: 0.35 } // trigger when 35% is visible
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  },[atTop])


  return (
    <div className="grid">
      
        {/*<img src={image} alt="" className="profile" />*/}
        
        <div className="card_container" ref={gridRef}>
          <div className="box tall">
              <span className="span_header">Use cases for SMEs</span>
              <span className='learn_more'>→ Learn more</span>
          </div>
          
          <div className=" box">  
              <span className="span_header">Investment Opportunity</span>
              <span className='learn_more'>→ Learn more</span>
          </div>
            
          <div className=" box">
              <span className="span_header">About us</span>
              <span className='learn_more'>→ Learn more</span>
          </div>
            
          <div className="box wide ">
              <span className="span_header">Develop and sell with us</span>
              <span className='learn_more'>→ Learn more</span>
          </div>
  
        </div>
          
      
      
    </div>
  );
  
}

export default MultiWindowDisplay;