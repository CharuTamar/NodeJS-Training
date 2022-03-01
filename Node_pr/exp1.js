const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  // res.send('Hello World!')  
  res.sendFile(path.join(__dirname,'index.html'));
})

app.get('/demo1', (req,res) => {
    res.send("<h1>Just fun</h1>")
    
    
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})