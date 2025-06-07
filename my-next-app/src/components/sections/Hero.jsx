"use client";
import {useContext, useEffect} from "react";

const Hero = () => {
    
    useEffect(() => {
      
    }, []);
    const heading = "Join the BotBloc community here";
    const subHeading = "Customised solution of robots tailored to your needs";
    return(
        <div className="Hero_bar_section"> 
           <h2>{heading}</h2>
           <h5>{subHeading}</h5>
           
        </div>
    )
}


export default Hero 