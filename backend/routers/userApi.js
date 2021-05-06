var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var UserModel = require('../models/userschema');
const bcrypt = require("bcrypt");   
const jwt = require("jsonwebtoken");  
var multer = require("multer");
var upload=multer();
fs = require("fs-extra");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/assets/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now()+'.'+file.mimetype.split('/')[1]);
    },
  });
  var upload = multer({ storage: storage });
router.post('/signup', async function (req, res) {
    var newUser = new UserModel();
    const hash = await bcrypt.hash(req.body.password, 10);
    newUser.name = req.body.name;
    newUser.username=req.body.email;
    newUser.age = req.body.age;
    newUser.address = req.body.address;
    newUser.password = hash;
    newUser.imagepath=null; 
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
        bcrypt.compare(req.body.password, data.password, function(err, response) {
            if(err){
                console.log(err);
                res.status(402).send("Auth Failed");
            }
            if (response) {
             // Passwords match
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
router.post('/findfirst/:id', function (req, res) {
    UserModel.findOne({
            _id: req.params.id
        },
        function (err, data) {
            console.log(data);
            if (err) {
                console.log(err);
                res.status(500).send("Something went wrong");
            } else {
                res.status(201).json({  
                    message: "User Fetched",  
                    data: data  
                  });
            }
        });
});

router.post('/deleteUserPhoto/:id', async function (req, res) {

    try {
        const data = await UserModel.findOneAndUpdate({
            _id: req.params.id
        }, {
            imagepath: null
        }, {
            new: true
        })
        res.status(201).json({  
            message: "Successfully Deleted",  
            data: data  
          });
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
});


router.post('/update', async function (req, res) {

    try {
        const data = await UserModel.findOneAndUpdate({
            _id: req.body.id
        }, {
            name: req.body.fullname,
            age:req.body.age,
            address:req.body.address
        }, {
            new: true
        })
        res.status(201).json({  
            message: "User Updated",  
            data: data  
          });
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
});

router.post("/uploadphoto",upload.single('image'),async function (req, res) {
    try{
    const file = req.file;
    console.log(file);
    console.log("ITS FINE "+req.body.id);
    // Define a JSONobject for the image attributes for saving to database
    const data = await UserModel.findOneAndUpdate({
        _id: req.body.id
    }, {
        imagepath: 'assets/uploads/' + req.file.filename
    }, {
        new: true
    })
    res.status(201).json({  
        message: "User Photo Updated",  
        data: data  
      });
    
    }
    catch(error){
        res.send("Something went wrong");
    }
  });
module.exports = router;