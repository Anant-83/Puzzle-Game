import React from 'react'
import Navv from './Navv'
import {useNavigate,Link} from "react-router-dom"
import { useLocation } from 'react-router-dom';
import { Location } from 'react-router-dom';
import PassContext from './PassContext';
import { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Score from '../Score.json'
import { useState,useEffect } from 'react';
function Dashboard(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/Dashboard')
    .then(response => setData(response.data))
    .catch(error => console.log(error));
  }, []);
  console.log("Dash " + data);
  let obj = {
    "name": "Not Found",
    "email": "N/A",
    "points": "N/A",
    "Hints": "N/A",
    "Tried": "N/A"
  };
  const arr = Score.orz;
  let ml = String(data);
  ml = ml.toLowerCase();
  for(let i=0; i<arr.length; i++)
  {
    if((arr[i].email).toLowerCase() == ml)
    {
      obj = arr[i];
      break;
    }
  }
  console.log(obj);

  let isAdmin = false;
  if(data == "abp832003@gmail.com")
  {
    isAdmin = true;
  }
  return (
    <div>
      {!isAdmin ? (
        <div>
        <Navv></Navv>
        <h1>Dashboard</h1>
        <h4>Info :- </h4>
        <h5>Name :- {obj.name}</h5>
        <h5>Email :- {obj.email}</h5>
        <h5>Points in Game :- {obj.points}</h5>
        <h5>Total Hints left :- {obj.Hints}</h5>
        <h5>Total Triel left :- {obj.Tried}</h5>
        </div>
      ) : (
        <div>
          <Navv></Navv>
        <h1>Welcom to Admin Dashboard</h1>
        <h5>List of all registered users : </h5>
        <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email-id</th>
            <th>Score</th>
            <th>Hints-left</th>
            <th>Trial-left</th>
          </tr>
        </thead>
        <tbody>
            {arr.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.points}</td>
                <td>{item.Hints}</td>
                <td>{item.Tried}</td>
              </tr>
            ))}
          </tbody>
      </Table>
      </div>
      )}
    </div>
  )
}

export default Dashboard