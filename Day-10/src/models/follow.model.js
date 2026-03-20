const  mongoose = require("mongoose")

const FollowSchema = new mongoose.Schema({
    follower:{
       type:String,
       required: true

    },
    followes:{
        type: String,
         required: true
    },
    status:{
        type: String,
        default:"pending",
        enum:   ["pending", "accepted", "rejected"]
    }
},{
    timestamps:true
})


FollowSchema.index({ follower: 1, followes: 1},{unique: true})



const followModel = mongoose.model("follows",FollowSchema)


module.exports = followModel