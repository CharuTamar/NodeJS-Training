const express = require('express');
const app = express();

const port = process.env.PORT  || 3000;

app.get('/',(req,res) => {
    res.send('Hello Express');
});

app.get('/demo', (req,res) => {
    res.send(JSON.stringify([1,2,3,4]));
})

app.listen(port, () => {
    console.log('Listening on port',port );
});