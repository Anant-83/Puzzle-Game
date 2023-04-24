import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom"
import Home from './Home';
import App from '../App';
import './Login.css';
function Login() {



  const navigate = useNavigate();
  const [user,setUser] = useState({
    email:"",
    password:""
  })


  const handleChange = e =>{
    const {name,value} = e.target
    setUser({
    ...user,
    [name]:value

    })
  }


  function lg()
  {
    if(!user.email || !user.password)
    return;
    console.log(user);
    axios.post("http://localhost:8000/Login",user)
    .then(res => {
        alert(res.data.message);
        if(res.data.message == "Not registered")
        {
          alert("Not registered!!");
          navigate('/Register');
        }
        else
        navigate('/Home',{state : {id : user.email}});
    })
    .catch((err) => {
      alert('Wrong details!')
      navigate('/Login');
      return;
    })
  }
  return (
    <div className="login-container">
        <h1>Login</h1>
        <br></br>
      <div className="form-group">
      <label htmlFor="email">Email:</label>
        <input type='text'
        id="email"
        placeholder='Enter Your registered mail-id...'
        name="email"
        value={user.email} 
        onChange={handleChange}
        ></input>

        </div>
        <label htmlFor="password">Password:</label>
        <div className="form-group">
        <input type='text'
        placeholder='Enter Your password...'
        name="password"
        id="password"
        value={user.password} 
        onChange={handleChange}
        ></input>

        </div>
        <button onClick={lg}>Login</button>
        <br></br>
        <h5>Don't have an account? {<Link to={'/Register'}>Register</Link>}</h5>
      
    </div>
  )
}

export default Login