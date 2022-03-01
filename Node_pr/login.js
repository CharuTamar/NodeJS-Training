const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/api', (req, res) => {
    res.json({
        "message": "Welcome"  
    });
});

app.post('/api/login',(req,res) => {

    // console.log(req.body);
    if(!req.body.email || !req.body.password) {
        return res.sendStatus(403)

    }
    else {
        const payload = {
            "email": req.body.email,
            "password": req.body.password
        };
        jwt.sign(payload,'secretkey',  {expiresIn: "30m"},(err,token) => {
            res.json({token});
        });

    }
    
    // const user = {
    //     "name": "Charu",
    //     "email": "abc@gmail.com"
    // }

    
});

app.post('/api/post',verifyToken,(req,res) =>{
    jwt.verify(req.token,"secretkey", (err,data) => {
        if(err) {
            res.sendStatus(403);
        }
        else {
            res.json({
                message: "SUCCESS",
                data:data
            });
        }
    })
});


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


app.listen(3000, () => {
    console.log("Listening at port 3000");
});