const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    message:{type:String, required:true},
}, {timestamps:true})
const model = mongoose.model("User", userSchema)
module.exports = model
