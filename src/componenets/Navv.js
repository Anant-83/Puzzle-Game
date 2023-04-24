import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate,Link} from "react-router-dom"
import './Navv.css'
import PassContext from './PassContext';
function Navv(props) {
  const pass = props.pass;
  console.log("Nav " + pass)
  return (
    <div>
      <nav className="navbar-container">
      <ul className="navbar-list">
        {/* <li className="navbar-item" style={{backgroundColor: "white"}}> Puzzle Game </li> */}
        <li className="navbar-item"><Link to='/Home'>Home</Link></li>
        <li className="navbar-item"><Link to='/Leaderboard'>Leaderboard</Link></li>
        <li className="navbar-item"><Link to='/Instructions'>Instructions</Link></li>
        <li className="navbar-item"><Link to = '/Dashboard'>Dashboard</Link></li>
        <li className="navbar-item1"><Link to = '/Login'>Logout</Link></li>
      </ul>
    </nav>
    </div>
  )
}

export default Navv