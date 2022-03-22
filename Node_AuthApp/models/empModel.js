const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var empSchema = new Schema({
    username: String,
    email: { type: String, unique: true},
    password: String
});


// password encryption
empSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});


module.exports = mongoose.model("Emp",empSchema);