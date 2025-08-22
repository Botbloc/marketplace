"use client";
import {useContext, useEffect,useRef } from "react";

const Hero = () => {
    const sectionRef = useRef(null);
    const heading = "Join the BotBloc community here";
    const subHeading = "Customised solution of robots tailored to your needs";
    useEffect(() => {
      // trigger CSS animation after mount
        const el = sectionRef.current;
        // small timeout ensures initial styles apply before toggling
        const t = setTimeout(() => el?.classList.add('is-visible'), 30);
        return () => clearTimeout(t);
    }, []);
    return(
        <div ref={sectionRef} className="Hero_bar_section"> 
           <h2 className="heading">{heading}</h2>
           <h5 className="subHeading">{subHeading}</h5>
           
           
        </div>
    )
}


export default Hero 