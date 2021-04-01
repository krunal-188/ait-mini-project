const express=require('express'); 
const path=require('path')
const bodyparser=require('body-parser');
const api = require('./backend/routers/userApi'); 
const port=3000; 
const app=express(); 
const cors = require("cors");
var corsOptions = {
    origin: "http://localhost:4200"
  };
  
  app.use(cors(corsOptions));
  
  app.use(bodyparser.urlencoded({extended:false}))
  app.use(bodyparser.json())
  
// app.use((req, res, next)=>{  
//     res.setHeader("Access-Control-Allow-Origin", "*");  
//     res.setHeader(  
//         "Access-Control-Allow-Headers",  
//         "Origin, X-Requested-With, Content-Type, Accept");  
//     res.setHeader("Access-Control-Allow-Methods",  
//         "GET, POST, PATCH, DELETE, OPTIONS");      
//     next();  
// });  
app.use('/api', api);

app.listen(port, function() { 
    console.log("Server is listening at port:" + port); 
});  