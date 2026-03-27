const mongoose =require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:[true,"User must be unique"]
    },
    email:{
        type:String,
        required:[true,"email is require"],
        unique:[true,"Email must be unique"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        

    }
})
//   TASK
// userSchema.pre("save",function (next){})
// userSchema.post("save",function (next){})

const userModel = mongoose.model("users",userSchema)


module.exports = userModel