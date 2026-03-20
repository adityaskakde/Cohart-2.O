const express = require('express')
const  userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router()

/**
 * @route POST /api/users/follow/:userid
 * @description follow a user
 * @access Private
 */
userRouter.post("/follow/:username",identifyUser,userController.followUserController)

/**
 * @route POST /api/users/follow/:userid
 * @description unfollow a user
 * @access Private
 */
userRouter.post("/unfollow/:username",identifyUser,userController.unfollowUserController)

/**
 * @route POST /api/users/accept/:id
 * @description Accept a follow request using request ID
 * @access Private
 */
userRouter.post("/accept/:id", identifyUser,userController.acceptFollowController);


/**
 * @route GET /api/users/pending
 * @description Get all pending follow requests for logged-in user
 * @access Private
 */
userRouter.get("/pending", identifyUser, userController.getPendingRequests)


/**
 * @route POST /api/users/reject/:id
 */
userRouter.post("/reject/:id", identifyUser, userController.rejectFollowController)





module.exports = userRouter