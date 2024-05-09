import React, { useEffect } from 'react';
import {Link,useNavigate} from "react-router-dom";
const Auth = () => {

const navigate = useNavigate();

    useEffect(() => {
        if(token){
            navigate("/")
        }
    })

  return (
    <div>
      
    </div>
  )
}

export default Auth
