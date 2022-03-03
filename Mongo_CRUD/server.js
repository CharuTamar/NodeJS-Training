const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

// connecting to db
mongoose.connect("mongodb://127.0.0.1:27017/UserDb");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully With user Database");
});

const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);


app.listen(3000, () => {
    console.log("Server listening at port 3000..");
})


// module.exports= app;