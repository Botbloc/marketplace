import React from "react";

const email_list = [
    {
        "label" : "New Customers",
        "email" : "sales@botbloc.com"
    },
    {
        "label" : "Technical Support",
        "email" : "support@botbloc.com"
    },
    {
        "label" : "General Enquiries",
        "email" : "info@botbloc.com"
    }
]
const Contact_us = () =>{
    return(
        <div className="Contacts">
            <div className="hero">
                <h1>Contacts</h1>
            </div>
            <div className="introduction">
                <p>Questions, partnership ideas, or late-night epiphanies - drop us a line. We reply within 5 business days.</p>
            </div>
            <ul className="email_list">
                {email_list.map((item) =>(
                    <li className="email">
                        <span>{item.label}</span>
                        <a href={"mailto:"+ item.email}>{item.email}</a>
                    </li>
                ))}
            </ul>
            
            
        </div>
    )
}

export default Contact_us;