var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user = new Schema({
    email: String,
    password: String,
    username: String
});

module.exports = mongoose.model("Users", user);