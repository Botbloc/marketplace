import React from "react";

const SlideButton = ({dir, onClick}) =>{
    if(dir==="left"){
        return(
            <div className="left_button" onClick={onClick}>
                <span>&lt;</span>
            </div>
        )
    }
    else if (dir==="right"){
        return(
            <div className="right_button" onClick={onClick}>
                <span>&gt;</span>
            </div>
        )
    }
}
export default SlideButton;