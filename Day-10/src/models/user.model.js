const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:
    {
        type:String,
        unique:[true,"Username already exists"],
        required:[true,"Usernamee Required"]
    },
    email:
    {
        type:String,
        unique:[true,"This email already exists"],
        required:[true,"Email Required"]
    },
    password:
    {
        type:String,
        required:[true,"Password is Required"]
    },
    bio:String,
    profileImage:
    {
        type:String,
        default:"https://ik.imagekit.io/bxevvcjon/user%20default.webp"

    }

})

const userModel  = mongoose.model("users",userSchema)


module.exports = userModel

