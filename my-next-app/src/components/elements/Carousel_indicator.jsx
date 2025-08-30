import React from "react";

const Carousel_indicator = ({item_list}) =>{
    
    return(
        <div className="carousel_indicator">
            {item_list.map((item,i)=>(
                <span
                    key={i}
                    className={`dot ${item ? "active" : ""}`}
                />
            ))}
        </div>
    )
}
export default Carousel_indicator;  