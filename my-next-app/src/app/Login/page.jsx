"use client";
import React from 'react';
import {useState} from 'react';
import LoginForm from '../../components/sections/LoginForm';

export default function Login() {

  const [username, setUsername] = useState();
  const [pw, setPw] = useState();

  return (
  <div className='login'>
    <div className='row login-pane'>
      <div className='col-md-4 left-pane'>
        <div>
          <h4>Haven't join our community?</h4>  
        </div>
         
         <button>Tap to join us!</button>
      </div>
      <div className='col-md-8 right-pane'>
        <h1>Sign in to your account.</h1>
        <input type="text" placeholder="Enter your username" name="username" onChange={e => setUsername(e)} ></input>
        <input type="text" placeholder="Enter your password" name="password" onChange={e => setPw(e)} ></input>
        <button type="submit">Sign In</button>

      </div>
    </div>
  </div>);
}