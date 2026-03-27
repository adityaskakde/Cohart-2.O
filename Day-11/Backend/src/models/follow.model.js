const mongoose = require("mongoose")

const FollowSchema = new mongoose.Schema({
    follower: {
        type: String,
        required: true
    },
    following: {   // 🔥 FIXED NAME
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "accepted", // 🔥 direct follow (optional)
        enum: ["pending", "accepted", "rejected"]
    }
}, {
    timestamps: true
})

// 🔥 UNIQUE INDEX FIX
FollowSchema.index({ follower: 1, following: 1 }, { unique: true })

const followModel = mongoose.model("follows", FollowSchema)

module.exports = followModel