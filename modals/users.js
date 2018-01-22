var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user = new Schema({
    id: Schema.Types.ObjectId,
    email: { type: String, unique: true, required: true },
    password: String,
    username: String
});

module.exports = mongoose.model("Users", user);