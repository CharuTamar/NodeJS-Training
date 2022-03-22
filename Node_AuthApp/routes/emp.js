// require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var Emp = require('../models/empModel');



router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'register.html'));
})
    .post('/register', (req, res) => {
        var emp = new Emp({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        emp.save((err) => {
            if (err) {
                res.status(301).redirect('/register');
            }
            else {
                // console.log(data);
                res.status(301).redirect('/dashboard');

            }

        });

    });


router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'login.html'))
})
    // user authentication
    .post('/login', async(req, res) => {
       
            const email= req.body.email;
            const password= req.body.password;
            const empemail = await Emp.findOne({email:email});
            if(!empemail) {
                res.status(403).send('Invalid email');
            }

            else {
                const match = await bcrypt.compare(password,empemail.password);

            if(match) {
                jwt.sign({email: email},"mysecretkey",  (err,token) => {
                    res.json({token});
                });
                // res.status(301).redirect('/dashboard');

            }
            else {

                res.status(403).send("Invalid password");

            }
            }

    })
    

// router.post('/login', function(req,res) {
//     const email= req.body.email;
//     const password = req.body.password;
//     const emp = Emp.findOne({email: email});
//     const match = bcrypt.compare(password, emp.password);
//     if(match) {
//         jwt.sign({email: emp.email},process.env.ACCESS_TOKEN_SECRET,  (err,token) => {
//             res.json({token});
//         });
        
//     }
//     else {
        
//         res.status(403).send('Invalid login details');
//     }

// })


router.get('/dashboard', (req,res) => {
    res.sendFile(path.join(__dirname,'../views','dashboard.html'));
})
.post('/dashboard', verifyToken,(req,res)=> {
    jwt.verify(req.token,"mysecretkey", (err,data) => {
        if(err){
            res.sendStatus(403);
        }
        else {
            res.json({message:"SUCCESS"})
        }
    })
})
    


function verifyToken(req,res,next) {
    const bearerHeader = req.headers['authorization'];
    if(bearerHeader !=='undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1]; 
        req.token = bearerToken;
        next();
    }
    else {
        res.sendStatus(403);
    }
}


module.exports = router;




