
const express = require("express")
const authController = require('../controllers/auth.controller')
const identifyUser = require("../middlewares/auth.middleware")
const authRouter = express.Router()

/***
 * POST /api/auth/register
 */

authRouter.post('/register',authController.registerController)


/***
 * POST /api/auth/login
 */


authRouter.post('/login',authController.loginController)

/**
 * @route GET /api/auth/get-me
 * @description get the currently logged user;s information
 * @access private
 * 
 */

authRouter.get("/get-me",identifyUser, authController.getMeController)

module.exports = authRouter