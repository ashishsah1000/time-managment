var mongoose=require("mongoose");
var Schema = mongoose.Schema;

var data= new Schema({
    email:String,
    password:String
});
 
module.exports=mongoose.model("Data",data);