const express = require("express");
// const express = require("express");
const cors = require("cors"); 
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
const fs = require('fs');
const { json } = require('express');
const { Duplex } = require('stream');

mongoose.connect("mongodb://127.0.0.1:27017/Auth",{
});
let userr;

function add_obj(obj)
{
    function fil(check)
    {
      return (check.email === obj.email);
    }
    const ok = fs.readFileSync('../game/src/Score.json');
    const details = JSON.parse(ok);
    const dt = details.orz;
    let duplicate = dt.filter(fil);
    console.log(duplicate.length)
    
    if(duplicate.length > 0)
    return;
  
     details.orz.push(obj);
     fs.writeFileSync('../game/src/Score.json',JSON.stringify(details));
  }





  function remove(obj)
  {
    function fil(check)
    {
      return (check.email !== obj.email);
    }
    
    const ok = fs.readFileSync('../game/src/Score.json');
    const details = JSON.parse(ok);
    const dt = details.orz;
    let to_del = dt.filter(fil);
    console.log(to_del);
    details.orz = to_del;
    fs.writeFileSync('../game/src/Score.json',JSON.stringify(details));
  }
//user schema 
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true,
    },
    password:{
        type: String,
        required : true
    }
})

const dbb = mongoose.model("dbb", userSchema)
app.get("/Dashboard",async (req,res)=>{
  console.log(userr);
  res.send(userr);
} )
//routes routes
app.post("/Login",async (req,res)=>{
    const {email,password} =req.body;
    console.log(req.body);
    userr = req.body.email;
    console.log("user -> " + userr)

    try 
    {
       const check  = await dbb.findOne({email : req.body.email});
       if(check)
       {
        console.log(check);
           if(check.password == password)
           {
            res.send({message:"login sucess"})
           }
           else
           {
            res.send({message:"wrong credentials.."})
           }
       }
       else
       {
           res.send({message:"You are not registered in out DB!!"})
       }
   }
   catch(err){
    console.log(err)
   }
});

app.post("/Puzzle1", async (req,res) => {
  console.log("ANannnt")
  console.log(req.body);
  if(req.body.what == "hint")
  {
    const obj = {
      "name":  req.body.name,
      "email": req.body.email,
      "points":req.body.points,
      "Hints": req.body.Hints,
      "Tried": req.body.Tried
    }
    console.log("HIIIINNNT")
    console.log(obj);
    await remove(obj);
    obj.Hints--;
    obj.points -= 10;
    await add_obj(obj);
    res.send("doneee");
  }
  else if(req.body.what == "reduce")
  {
    const obj = {
      "name":  req.body.name,
      "email": req.body.email,
      "points":req.body.points,
      "Hints": req.body.Hints,
      "Tried": req.body.Tried
    }
    console.log(obj);
    remove(obj);
    obj.Tried--;
    add_obj(obj);
    res.send("doneee");
  }
  else
  {
    const obj = {
      "name":  req.body.name,
      "email": req.body.email,
      "points":req.body.points,
      "Hints": req.body.Hints,
      "Tried": req.body.Tried
    }
    console.log(obj);
    remove(obj);
    obj.points += 100;
    add_obj(obj);
    res.send("doneee");
  }
})
app.post("/Register",async (req,res)=>{
	
    const {name,email,password} =req.body;
    console.log(email,name,password)
    try
    {  
      const user = dbb({name,email,password})
      console.log(user);
      add_obj({name : name,email : email,points : 0,Hints : 5,Tried : 3});
      const has = await dbb.findOne({email : email});
      if(has)
      {
        res.send({message : "There is already an account exists with this email-id!!"});
      }
      else
      {
        await user.save()
        res.status(200).send({message:"Updated!!!"})
      }
   }
   catch(err){
    console.log(err)
    res.status(404).send({message:"error!!!"})
   }
})
// app.post("/Register",async (req,res)=>{
//     const {name,email,password} =req.body;
//     try
//     {
//        console.log(req.body.email);
//        const check  = await okk.findOne({email : req.body.email});
//     //    if(check)
//     //    {
//     //        res.send({message:"Already exist"});
//     //    }
//     //    else
//     //    {
//            const user = new okk({name,email,password})
//            await user.save()
//            res.status(200).send({message:"Updated!!!"})
//     //    }
//    }
//    catch(err){
//     console.log(err)
//    }
// }) 

app.listen(8000,()=>{
    console.log("Server running at port 8000....")
})