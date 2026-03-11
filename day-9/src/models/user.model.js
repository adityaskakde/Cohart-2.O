const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: {
     type:String,
     unique:[true,"User already exists of this eamil"]
    }
})

const userModel = mongoose.model("user",userSchema)


module.exports = userModel