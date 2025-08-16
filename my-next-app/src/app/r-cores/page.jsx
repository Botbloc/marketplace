"use client";
import React from "react";
import placeholder from "../../assets/images/landscape-placeholder.svg";

const Rcore = () => {
    return(
        <div className="row rcore">
            <div className="col-md-5 image-module">
                <img src={placeholder.src} className="r-core-image"/>
            </div>
            <div className="col-md-7 discription-module">
                <div className="discription">
                    <h1>R, for robot cores</h1>
                    <p>Our R-series core units are the brain & heart of every robotic creation.
                        Be inspired by hundreds of possibilities out of this compact but powerful brick.</p>
                    <p>Come back soon for details</p>
                </div>
            </div>
        </div>
    )
    
}
export default Rcore