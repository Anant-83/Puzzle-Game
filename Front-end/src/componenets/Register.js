import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import './Login.css'
import { Link } from 'react-router-dom';
function Register() {


  const navigate = useNavigate();
  const [user,setUser] = useState({
    name:"",
    email:"",
    password: ""
  })


  const handleChange = e =>{
    const {name,value} = e.target
    setUser({
    ...user,//spread operator 
    [name]:value

    })

    }

  function rg()
  {
    if(!user.name || !user.email || !user.password)
    return;
    axios.post("http://localhost:8000/Register",user)
    .then(res => {
        // alert(res.data.message);
        navigate('/Login')
    })
    .catch(err => {
      console.log(err)
      navigate('/Login')
    })
  }

  return (
    // <div>
    //   <h1>Register Page</h1>
    //     <input type='text'
    //     placeholder='Enter Your username...'
    //     name="name"
    //     value={user.name}
    //     onChange={handleChange}
    //     ></input>
    //     <input type='text'
    //     placeholder='Enter Your registered mail-id...'
    //     name="email"
    //     value={user.email}
    //     onChange={handleChange}
    //     ></input>
    //     <br></br>
    //     <input type='text'
    //     placeholder='Enter Your password...'
    //     name="password"
    //     value={user.password}
    //     onChange={handleChange}
    //     ></input>

    //     <br></br>

    //     <button onClick={rg}>Register</button>
    // </div>


    <div className="login-container">
        <h1>Register</h1>
        <br></br>
      <div className="form-group">
      <label htmlFor="email">Username:</label>
      <input type='text'
        placeholder='Enter Your username...'
        name="name"
        value={user.name}
        onChange={handleChange}
        ></input>
        </div>
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
        <button onClick={rg}>Register</button>
        <br></br>
        <h5>Already have an account? {<Link to={'/Login'}>Login</Link>}</h5>
     
    </div>
  )
}

export default Register