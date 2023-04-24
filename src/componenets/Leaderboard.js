import React from 'react'
import { useState,useEffect } from 'react';
import Score from '../Score.json'
import Table from 'react-bootstrap/Table';
import Navv from './Navv';
function Leaderboard() {
  const [data, setData] = useState([]);
  

  let ap = Score.orz;
  ap.sort((a,b)=>{
    return b.points - a.points;
  })

  return (
    <div>
      <Navv></Navv>
        <h1>Leaderboard for this puzzle game</h1>
        <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>User Name</th>
          <th>Email-id</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
          {ap.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.points}</td>
            </tr>
          ))}
        </tbody>
    </Table>
    </div>
  )
}

export default Leaderboard