const  mongoose = require("mongoose")

const FollowSchema = new mongoose.Schema({
    follower:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true,"Followers is required"]
    },
    followes:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:[ true, "Followes is required"]
    }
},{
    timestamps:true
})

const followModel = mongoose.model("follows",FollowSchema)


module.exports = followModel