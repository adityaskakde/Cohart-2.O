const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");


async function followUserController(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const follower = req.user.username;
    const following = req.params.userId;

    console.log("FOLLOW:", follower, "→", following);

    if (!following) {
      return res.status(400).json({ message: "Invalid user" });
    }

    if (follower === following) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    const user = await userModel.findOne({ username: following });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const existing = await followModel.findOne({
      follower,
      following,
    });

    if (existing) {
      return res.status(400).json({
        message: `Already ${existing.status}`,
      });
    }

    await followModel.create({
      follower,
      following,
      status: "accepted",
    });

    await userModel.updateOne(
      { username: following },
      { $addToSet: { followers: follower } }
    );

    await userModel.updateOne(
      { username: follower },
      { $addToSet: { following: following } }
    );

    return res.status(200).json({
      message: "Followed successfully",
    });

  } catch (err) {
    console.log("FOLLOW ERROR:", err); // 🔥 IMPORTANT
    return res.status(500).json({ message: err.message });
  }
}
async function unfollowUserController(req, res) {
  try {
    const follower = req.user.username;
    const following = req.params.userId;

    const record = await followModel.findOne({
      follower,
      following,
    });

    if (!record) {
      return res.status(400).json({
        message: "Not following",
      });
    }

    await followModel.deleteOne({ _id: record._id });

    await userModel.updateOne(
      { username: following },
      { $pull: { followers: follower } }
    );

    await userModel.updateOne(
      { username: follower },
      { $pull: { following: following } }
    );

    res.status(200).json({
      message: "Unfollowed successfully",
    });

  } catch (err) {
    console.log("UNFOLLOW ERROR:", err);
    res.status(500).json({ message: err.message });
  }
}


// 🔥 ACCEPT FOLLOW REQUEST
async function acceptFollowController(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const requestId = req.params.id;

    const request = await followModel.findById(requestId);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    if (request.following !== req.user.username) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    request.status = "accepted";
    await request.save();

    // 🔥 update userModel
    await userModel.updateOne(
      { username: request.following },
      { $addToSet: { followers: request.follower } }
    );

    await userModel.updateOne(
      { username: request.follower },
      { $addToSet: { following: request.following } }
    );

    res.status(200).json({
      message: "Follow request accepted",
    });

  } catch (err) {
    console.log("ACCEPT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
}


// 🔥 GET PENDING REQUESTS
async function getPendingRequests(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const username = req.user.username;

    const requests = await followModel.find({
      following: username,
      status: "pending",
    });

    res.status(200).json({
      count: requests.length,
      requests,
    });

  } catch (err) {
    console.log("PENDING ERROR:", err);
    res.status(500).json({
      message: err.message,
    });
  }
}


// 🔥 REJECT REQUEST
async function rejectFollowController(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const requestId = req.params.id;

    const request = await followModel.findById(requestId);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    if (request.following !== req.user.username) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    request.status = "rejected";
    await request.save();

    res.status(200).json({
      message: "Request rejected",
    });

  } catch (err) {
    console.log("REJECT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
}


module.exports = {
  followUserController,
  unfollowUserController,
  acceptFollowController,
  getPendingRequests,
  rejectFollowController
};