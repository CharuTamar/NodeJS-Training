const express = require("express");

const router = express.Router();

const mongoose = require('mongoose');
var User = require('../model/UserModel');


router.get('/info', (req, res, next) => {
    User.find(function (err, users) {
        if (err) {
            res.send(err.message);
        }
        else {
            res.send(users);
            // console.log(users);
        }
    });
})

router.post('/add', (req, res, next) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    }, (err, User) => {
        if (err) {
            console.log(err);
            res.send({ error: err });
        }
        else {
            res.json("user added successfully");
        }
    });

});

router.put('/update/:id', (req, res, next) => {
    var id = req.params.id;

    var user = {

        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    };

    User.findByIdAndUpdate({_id:id}, user, (err, result) => {
        if(err) {
            res.send('User '+ id + " can't be updated. Error : "+err);
        }
        else {
            console.log(result);
            res.json("user updated successfully");
        }
    })

})

router.delete('/delete/:id', (req,res,next) => {
    var id=req.params.id;

    User.findByIdAndDelete({_id:id}, function(err, result) {
        if(err) {
            res.status(403).send('User ',id,' not found');
        }
        else {
            console.log(result);
            res.json("user deleted successfully");
        }
    })
})

module.exports = router;



