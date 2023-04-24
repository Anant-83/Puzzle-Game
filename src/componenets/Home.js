// import React, { useEffect, useState } from 'react'
// import Puzzle1 from '../Puzzle1'
// import { useLocation } from 'react-router-dom'
// import Navv from './Navv';
// import PassContext from "./PassContext";
// function Home() {
//   const [pass,setPass] = useState("");
//   const location = useLocation();
//   useEffect(() => {
//     if (location.state !== null && location.state !== undefined) {
//       setPass(location.state.id);
//     }
//   }, [location]);
//   return (
// <PassContext.Provider value={{ pass, setPass }}>
//       <div>
//         <h1>{pass}</h1>
//         <Navv pass={pass}></Navv>
//         <Puzzle1 pass={pass}></Puzzle1>
//       </div>
//     </PassContext.Provider>
//   )
// }

// export default Home


import React, { useEffect, useState } from 'react';
import Puzzle1 from '../Puzzle1';
import { useLocation } from 'react-router-dom';
import Navv from './Navv';
import PassContext from './PassContext';

function Home() {
  const [pass, setPass] = useState(() => {
    // Get the pass value from local storage, or set a default value if it doesn't exist
    const storedPass = localStorage.getItem('pass');
    return storedPass !== null ? storedPass : '';
  });

  const location = useLocation();

  useEffect(() => {
    if (location.state !== null && location.state !== undefined) {
      // Update the pass state and save it to local storage
      const newPass = location.state.id;
      setPass(newPass);
      localStorage.setItem('pass', newPass);
    }
  }, [location]);

  return (
    <div>
        <Navv pass={pass} />
        <Puzzle1 pass={pass} />
    </div>
  );
}

export default Home;