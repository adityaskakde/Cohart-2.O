const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followesUsername = req.params.username;

  const isFollowesExists = await userModel.findOne({
    username: followesUsername,
  });
  if (!isFollowesExists) {
    return res.status(404).json({
      message: "User you trying to follow is does not exist",
    });
  }

  if (followesUsername == followerUsername) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }
  const isAlreadyFollowing = await followModel.findOne({
    followes: followesUsername,
    follower: followerUsername,
  });

  if (isAlreadyFollowing) {
    return res.status(200).json({
      message: `Request already exists with status: ${isAlreadyFollowing.status}`,
      follow: isAlreadyFollowing,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followes: followesUsername,
      status: "pending",
  });

  res.status(201).json({
    message: `Follow request sent to ${followesUsername}`,
    follow: followRecord,
  });
}

async function unfollowUserController(req, res) {
  const followerUsername = req.user.username;
  const followesUsername = req.params.username;

  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    followes: followesUsername,
     status: "accepted",
  });
  if (!isUserFollowing) {
    return res.status(200).json({
      message: `You are not following ${followesUsername}`,
    });
  }
  await followModel.findByIdAndDelete(isUserFollowing._id);

  res.status(200).json({
    message: `You have unfollowed ${followesUsername}`,
  });
}

async function acceptFollowController (req, res){
  const requestId = req.params.id
  

  const request = await followModel.findById(requestId)


  if (!request) {
  return res.status(404).json({
    message: "Request not found"
  })
}
if (request.followes !== req.user.username) {
  return res.status(403).json({
    message: "Unauthorized"
  })
}
  request.status = "accepted"
  await request.save()

  res.status(200).json({
    message:"Follow request accepted"
  })
}

async function getPendingRequests(req, res) {
  try {
    const username = req.user.username;

    const requests = await followModel.find({
      followes: username,
      status: "pending"
    });

    res.status(200).json({
      count: requests.length,
      requests
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
}
async function rejectFollowController(req, res) {
  const requestId = req.params.id;

  const request = await followModel.findById(requestId);

  if (!request) {
    return res.status(404).json({
      message: "Request not found"
    });
  }

  // 🔥 security check
  if (request.followes !== req.user.username) {
    return res.status(403).json({
      message: "Unauthorized"
    });
  }

  request.status = "rejected";
  await request.save();

  res.status(200).json({
    message: "Follow request rejected"
  });
}

module.exports = {
  followUserController,
  unfollowUserController,
  acceptFollowController,
  getPendingRequests,
  rejectFollowController
};
