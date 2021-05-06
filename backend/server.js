const express=require('express'); 
const path=require('path')
const bodyparser=require('body-parser');
const api = require('./routers/userApi'); 
const course = require('./routers/courseapi'); 
const port=process.env.PORT || 8080; 
const app=express(); 
var mongoose = require('mongoose');
const cors = require("cors");

var corsOptions = {
    origin: "http://localhost:4200"
  };
  
  app.use(cors(corsOptions));
  
  app.use(bodyparser.urlencoded({extended:false}))
  app.use(bodyparser.json())
  app.use(express.static(path.join(__dirname,'public')));
  app.get('*',(req,res)=>{
      res.sendFile(path.join(__dirname,'public/index.html'));
  });
// app.use((req, res, next)=>{  
//     res.setHeader("Access-Control-Allow-Origin", "*");  
//     res.setHeader(  
//         "Access-Control-Allow-Headers",  
//         "Origin, X-Requested-With, Content-Type, Accept");  
//     res.setHeader("Access-Control-Allow-Methods",  
//         "GET, POST, PATCH, DELETE, OPTIONS");      
//     next();  
// });  
const result=require('dotenv').config({path:__dirname+'/.env'})

var query = 'mongodb+srv://krunal:'+ process.env.MONGO_PASS + '@cluster0.v92iw.mongodb.net/AIT?retryWrites=true&w=majority'

const db = (query);
mongoose.Promise = global.Promise;
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (error) {
    if (error) {
        console.log("Error!" + error);
    }
});
app.use('/api', api);
app.use('/course', course);

app.listen(port, function() { 
    console.log("Server is listening at port:" + port); 
});  