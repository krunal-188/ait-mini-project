var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var CourseModel = require('../models/courseschema');
// Connecting to database 
// var query = 'mongodb://localhost/AIT'

// const db = (query);
// mongoose.Promise = global.Promise;

// mongoose.connect(db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, function (error) {
//     if (error) {
//         console.log("Error!" + error);
//     }
// });
router.post('/display', async function(req,res){
    var degree_type = req.body.degree_type;
    console.log(degree_type+" Kkkk");
    try {
        const data = await CourseModel.find( { degree_type: degree_type})
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