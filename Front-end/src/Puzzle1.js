import React, { useState } from 'react'
import Score from './Score.json'
import axios from 'axios'
import './Puzzle1.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function Puzzle1(props) {

  const [show, setShow] = useState(false);

  const [code,setCode] = useState("");
  const [hint,setHint] = useState();
  const [tryy,setTryy] = useState();
  const mailid = props.pass;
  console.log("->"  + mailid)
  let obj = {
    "name": "Not Found",
    "email": "N/A",
    "points": "N/A",
    "Hints": "N/A",
    "Tried": "N/A"
  };
  const arr = Score.orz;
  let tp = mailid.toLowerCase();

  for(let i=0; i<arr.length; i++)
  {
    console.log(arr[i]);
    let result = (arr[i].email).toLowerCase();
    if(result == tp)
    {
      obj = arr[i];
      break;
    }
  }
  console.log(props.pass)
  console.log(obj)
  // console.log(obj);
  function hints()
  {
    if(hint == 0)
    {
      alert("Sorry You don't have any hint left!!!");
      return;
    }
    window.confirm("10 Point will be deducted from you score if you will use this hint, do you want to continue??")
    console.log("Niche");
    const tmp = {
        "name": obj.name,
        "email": obj.email,
        "points": obj.points,
        "Hints": obj.Hints,
        "Tried": obj.Tried,
        "what" : "hint"
    }
    console.log(tmp);
    axios.post("http://localhost:8000/Puzzle1",tmp)
    .then(res => {
      // console.log(res);
    })
    const xobj = obj;
    // remove(xobj);
    // obj.Hints--;
    // add_obj(obj);
    if(hint == 1)
    {
      console.log("Herere");
      window.confirm("Anant has two lucky numbers that is used in password, you only have to find other two digits!")
    }
    else if(hint == 2)
    {
      window.confirm("He lives in current, today ,present!!")
    }
    else if(hint == 3)
    {
      window.confirm("What is the current date ??")
    }
    else if(hint == 4)
    {
      window.confirm("First and last digit is one of his lucky number and middle two number can be current date!!")
    }
    else if(hint == 5)
    {
      window.confirm("Try to encode the resultant digits to alphabates, 0 -> a, 1->b, 2->c... ")
    }
    setHint(hint-1);
  }

  function convertChar(char) {
    // Convert the character to its ASCII code
    var code = char.charCodeAt(0);
  
    // Subtract 48 from the code to shift the range from 48-57 to 0-9
    code -= 48;
  
    // Add 97 to the code to shift the range from 0-9 to 97-106 (a-j)
    code += 97;
  
    // Convert the new ASCII code back to a character and return it
    return String.fromCharCode(code);
  }
  function check()
  {
    if(code.length != 4)
    {
      alert("Length of the code should be 4!!");
      return;
    }

    for(let i = 0; i  <code.length; i++)
    {
      if(code[i] >= 'a' && code[i] <= 'z')
      continue;

      alert("Code only contains English alphabates!!!");
      return;
    }

    if(obj.points > 0)
    {
      alert("You already solved this puzzle!");
      return;
    }
    if(tryy == 0)
    {
      alert("Game is over!!!");
      return;
    }
    const date = new Date();
    const cur_day = date.getDate();
    let curr = cur_day.toString();
    if(curr.length == 2)
    {
      let codee = 'i';
      codee += convertChar(curr[0]);
      codee += convertChar(curr[1]);
      codee += 'd';
      
      console.log("Codedede  - " + codee);
      if(code == codee)
      {
        const tmp = {
          "name": obj.name,
        "email": obj.email,
        "points": obj.points,
        "Hints": obj.Hints,
        "Tried": obj.Tried,
          "what" : "increase"
      }
      axios.post("http://localhost:8000/Puzzle1",tmp)
      .then(res => {
        console.log(res);
      })

        alert('Horreyy , you have solved this puzzle!!!');
      }
      else
      {
        const tmp = {
          "name": obj.name,
        "email": obj.email,
        "points": obj.points,
        "Hints": obj.Hints,
        "Tried": obj.Tried,
          "what" : "reduce"
      }
      axios.post("http://localhost:8000/Puzzle1",tmp)
      .then(res => {
        console.log(res);
      })
        setTryy(tryy-1);
        alert("Try Something different");
      }
    }
    else
    {
      let codee = 'i';
      codee += 'a';
      codee += convertChar(curr[0]);
      codee += 'd';

      console.log(code);
      if(code == codee)
      {
        const tmp = {
          "name": obj.name,
        "email": obj.email,
        "points": obj.points,
        "Hints": obj.Hints,
        "Tried": obj.Tried,
          "what" : "increase"
      }
      axios.post("http://localhost:8000/Puzzle1",tmp)
      .then(res => {
        console.log(res);
      })

        alert('Horreyy , you have solved this puzzle!!');
      }
      else
      {
        const tmp = {
          "name": obj.name,
          "email": obj.email,
          "points": obj.points,
          "Hints": obj.Hints,
          "Tried": obj.Tried,
          "what" : "reduce"
      }
      axios.post("http://localhost:8000/Puzzle1",tmp)
      .then(res => {
        console.log(res);
      })
        setTryy(tryy-1);
        alert("Try Something different");
      }
    }
  }


  React.useEffect(() => {
    setHint(obj.Hints);
    setTryy(obj.Tried);
  }, [obj.Hints, obj.Tried]);

 
  return (

    <div>

{ obj.name != "Not Found" ? (
  <div>
       <Button variant="primary" onClick={hints}>
        Hint??
      </Button>
      <h1>Welcome , {obj.name}</h1>
        <h3>In this puzzle you have to Open a door Which is locked by Anant , you are given a sentence about Anant and you have to crack the code to open that door and the code for open the door with only alphabates letters.</h3>

        <br></br>
        <div>
        <p className='paragraph-container'>
          This door is locked by Anant. Anant has two lucky numbers one is 8 and second is 3 and he believes to live in present, today. 
          He always choose passwords with starting with one of the lucky number and end with the other one which is not used in first.And he also worked in cyber security in past so he use the encoding for digits. And he prefers to choose lower case alphabates for writing something!!
          </p>

          </div>
          <input type='text'
          id = "cod"
          placeholder='Enter the secret code..'
          onChange={(event) => {
            setCode(event.target.value);
          }}
          />

          <br></br>
          <button onClick={check}>Submit Code</button>
        {/* <img width="600" height="400" id = "right" src = "https://assetsio.reedpopcdn.com/the-medium-guide-screenshot-door-code-panel.jpg?width=1920&height=1920&fit=bounds&quality=80&format=jpg&auto=webp"></img> */}
        </div>
        ) : (
          <div>
            <h1>User Not found!!!!!</h1>
          </div>
        )}
    </div>
  )
}
/*
Anant 
8
3
2003
*/ 

export default Puzzle1;