"use client";
import React from 'react';
import {useState} from "react";
import InputField from '../../components/elements/InputField';
import ConfirmationButton from '../../components/elements/ConfirmationButton';

const email_verfication = () => {
    const [code, setCode] = useState<string>("");

    const verify_code = () =>{

    }
    return(
    <div className='email_verfication'>
        <div className='container'>
            <h4>Check your inbox</h4>
            <h6>Enter the verification code we just sent to your email</h6>
            <InputField
                placeholder = "Code"
                onChange={(e)=>setCode(e.target.value)}
            />
            <ConfirmationButton
                fnc={verify_code}
                text = "Continue"
                type = "submit"
            />
            <a href="/">Resend email</a>
        </div>
    </div>
    )
}

export default email_verfication;