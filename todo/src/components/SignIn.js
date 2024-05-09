import React, { useEffect, useState } from 'react';
import "./SignIn.css";
import { ContextProvider } from './Context';
import {useNavigate} from "react-router-dom";

const SignIn = () => {

    const [userDetails,setUserDetails] = useState({
        email:"",
        password:""
    });

    const {userName,setUserName} = ContextProvider();
   
    const navigate = useNavigate();

    const handleChange = (e,key) => {
        const val = e.target.value
        return (
            setUserDetails((userDetails) => {
                return {
                    ...userDetails,
                    [key]: val
                }
            })
        )
    }

    const userSignIn = async(data) => {
        const response = await fetch("http://localhost:8080/users/signIn",{
            method:"POST",
            headers:{
                accept : "application/json",
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })
        const userData = await response.json();
        localStorage.setItem("token",userData.token);
    }  

  return (
    <div className='signIn-page'>
      <form method='POST' action='/users/signIn' onSubmit={async(e) => {
        e.preventDefault();
        await userSignIn(userDetails);
        setUserName(userDetails.email.split("@")[0])
        console.log(userName)
        navigate(`/todo-home/${userName}`);
      }}>
        <span className='card-title'>Sign In</span>
        <input type='email' value={userDetails.email} name='email' placeholder="Email"
            onChange={(e) => handleChange(e,"email")}/>
        <input type='password' value={userDetails.password} name='password' placeholder="Password"
            onChange={(e) => handleChange(e,"password")}/>
        <button type='submit'>SignIn</button>
      </form>
    </div>
  )
}

export default SignIn
