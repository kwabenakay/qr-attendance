const express= require('express');
const  fs = require('fs');
const app = express();
const port = 5000;
const host="localhost:";
const path = require('path');
const qrcode =require('./qrcode.js');
const encrypt =require("./encrypt.js");
let date = new Date();
let cDate =date.getDate()+"-"+ (date.getMonth()+1);
let section="pm";
        if(date.getHours<17){
            section="am"
        }
let oriLink=host+port+"/input";
let sectdate=encrypt(section+cDate);
let link= oriLink+sectdate;



fs.writeFile(path.join(__dirname,"/pub/link.txt"),link, err => {
    if (err) {
      console.error(err);
    }
  });



// console.log(cDate);
    app.use(express.static(__dirname+'/pub'));
//generating qr code for staff
    app.get('/',(res)=>{
        
        qrcode(link);
        res.sendFile(path.join(__dirname,"/pub/index.html"));
    });
//page for personnel to input credentials
    app.get("/input"+sectdate,(req,res)=>{
        res.sendFile(path.join(__dirname,"/pub/"+section+".html"))
    });

    app.get("/result",(req,res)=>{
      res.send("Submission succesful")

      let info={
      name: req.body.name,
      department: req.body.department,
      rtime: date.getTime(),
      rdate: cDate,
      sect: section
     }
     let json= JSON.parse(info);
     fs.appendFile("./data.json",JSON.stringify(json)); 
    });
// login page for setting up personnels
    app.get("/setuplogin"+sectdate,(req,res)=>{
      res.send("setup login")
      if(req.body.name=="root"&req.body.password=="root"){
        res.redirect("/setup");
      }

      
    });
// page for setting up personnels on system
    app.get("/setup",(res,req)=>{
      let info={
        name: req.body.name,
        department: req.body.department,
        rtime: date.getTime(),
        rdate: cDate,
        sect: section
       }
       let json= JSON.parse(info);
       fs.appendFile("./data.json",JSON.stringify(json)); 
    });

    app.get("*", function(req, res){
        res.status(404).send("Session expired");
  });
app.listen(port)