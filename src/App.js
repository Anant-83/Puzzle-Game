import { Route, useLocation } from 'react-router-dom';
import './App.css';
import Hdr from './Hdr';
import Puzzle1 from './Puzzle1';
import Login from './componenets/Login';
import PassContext from './componenets/PassContext';
// import Register from './componenets/Register';
import Home from './componenets/Home';
import Register from './componenets/Register'
import { Router ,Routes} from 'react-router-dom';
import Instructions from './componenets/Instructions';
import Leaderboard from './componenets/Leaderboard';
import Dashboard from './componenets/Dashboard';
import { useScrollTrigger } from '@mui/material';
import { useState } from 'react';
// 127.0.0.1:27017
// import PassContext from './componenets/PassContext';
function App() {
 const [pass,setPass] = useState();
  return (
    <div className="App">
      <Routes>
      <Route exact path="/" element={<Login/>}/>
      <Route exact path="/Login" element={<Login/>}/>
      <Route exact path="/Home" element={<Home/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/Instructions" element={<Instructions/>}/>
      <Route path="/Leaderboard" element={<Leaderboard/>}/>
      <Route path="/Dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
