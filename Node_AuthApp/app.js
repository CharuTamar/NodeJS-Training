const express = require('express');
const mongoose = require('mongoose');
const app = express();



mongoose.connect('mongodb://127.0.0.1/LoginDB');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully With Login DB");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const empRoutes = require('./routes/emp');
app.use(empRoutes);

app.listen(3000, () => {
    console.log("Server listening at port 3000..");
})

