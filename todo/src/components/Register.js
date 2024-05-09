import React,{useState} from 'react';
import "./Register.css";

const Register = () => {
    const [registerUser,setRegisterUser] = useState({
        email:"",
        password:"",
        confirmPassword:""
    });

    // const {userName,setUserName} = ContextProvider();
   
    // const navigate = useNavigate();

    const handleChange = (e,key) => {
        const val = e.target.value
        return (
            setRegisterUser((registerUser) => {
                return {
                    ...registerUser,
                    [key]: val
                }
            })
        )
    }

    const userRegister = async(data) => {
        const response = await fetch("http://localhost:8080/users/register",{
            method:"POST",
            headers:{
                accept : "application/json",
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })
        const userData = await response.json();
        localStorage.setItem("token",userData.token);
        // setUserName(userDetails.email.split("@")[0])
    }

    

  return (
    <div className='register-page'>
      <form method='POST' action='/users/register' onSubmit={async(e) => {
        e.preventDefault();
        await userRegister(registerUser);
        // console.log(userName)
        // navigate(`/todo-home/${userName}`);
      }}>
        <span className='registerCard-title'>Register</span>
        <input type='email' value={registerUser.email} name='email' placeholder="Email"
            onChange={(e) => handleChange(e,"email")}/>
        <input type='password' value={registerUser.password} name='password' placeholder="Password"
            onChange={(e) => handleChange(e,"password")}/>
        <input type='password' value={registerUser.confirmPassword} name='password' placeholder="Confirm password"
            onChange={(e) => handleChange(e,"confirmPassword")}/>
        <button id="signIn-btn" type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register
