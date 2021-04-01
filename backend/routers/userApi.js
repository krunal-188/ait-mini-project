var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var UserModel = require('../models/userschema');
const bcrypt = require("bcrypt");   
const jwt = require("jsonwebtoken");  
// const password = bcrypt.hash(req.body.password, 3);
// Connecting to database 
var query = 'mongodb://localhost/ait'

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
router.post('/signup', async function (req, res) {
    var newUser = new UserModel();
    const hash = await bcrypt.hash(req.body.password, 10);
    newUser.name = req.body.name;
    newUser.username=req.body.email;
    newUser.age = req.body.age;
    newUser.address = req.body.address;
    newUser.password = hash;
    try{
        const data = await newUser.save().then(result =>{  
            res.status(201).json({  
              message: "User Created",  
              result: result  
            });  
          });  
    }catch(error){
        res.status(500).send(error.message);
    }
});

router.post('/authenticate', async function(req,res){
    console.log(req.body.password)
    UserModel.findOne({username: req.body.username},
        function (err, data) {
            if (err) {
                console.log(err);
                res.status(500).send("Auth Failed");
            } else {
                console.log(data);
        bcrypt.compare(req.body.password, data.password, function(err, response) {
            if(err){
                console.log(err);
                res.status(402).send("Auth Failed");
            }
            if (response) {
             // Passwords match
             console.log(response);
             const token = jwt.sign({username: data.username, userId: data._id},  
                'Ait_Rocks',   
                { expiresIn: "1h"}
                );
                res.status(201).json({  
                    message: "User Authenicated",  
                    token: token  
                  });
            } else {
             // Passwords don't match
             console.log(res);
                res.status(401).send('Auth Failed');  
            }
          });
      
        }
    });
});


router.get('/fetchAllUsers', async function(req,res){
    try {
        const data = await UserModel.find({})
        res.send(data);
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
})
router.get('/findfirst/:id', function (req, res) {
    UserModel.findOne({
            id: req.params.id
        },
        function (err, data) {
            if (err) {
                console.log(err);
                res.status(500).send("Something went wrong");
            } else {
                res.send(data);
            }
        });
});

router.post('/deleteUserPhoto', async function (req, res) {

    try {
        const data = await UserModel.findOneAndDelete({
            name: req.body.name
        })
        res.send("Successfully Deleted: "+data)
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
});


router.post('/update', async function (req, res) {

    try {
        const data = await UserModel.findOneAndUpdate({
            id: req.body.id
        }, {
            Name: req.body.Name
        }, {
            new: true
        })
        res.send(data)
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
});
module.exports = router;