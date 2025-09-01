"use client";
import React from 'react';
import {useState} from 'react';
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Register() {

  const [username, setUsername] = useState();
  const [pw, setPw] = useState();
  const router = useRouter();

  return (
  <div className='register'>
    <div className='row register-pane'>
      
      <div className='col-md-8 left-pane'>
        <h1>Account Register</h1>
        <input type="text" placeholder="Enter your username" name="username" onChange={e => setUsername(e)} ></input>
        <input type="text" placeholder="Enter your password" name="password" onChange={e => setPw(e)} ></input>
        <input type="text" placeholder="Confirm password" name="confirm pw" onChange={e => (e)} ></input>
        <button type="submit">Register</button>

      </div>
      <div className='col-md-4 right-pane'>
        <div>
          <h4>Already had an account?</h4>  
        </div>
         
         <button onClick={(e)=>{router.push("/login")}}>Tap to login!</button>
      </div>
    </div>
  </div>);
}