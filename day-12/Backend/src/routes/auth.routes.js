const {Router} = require("express")
const authMiiddleware = require("../middlewares/auth.middleware")
const authController = require("../controllers/auth.controller")

const router = Router()

router.post('/register',authController.registerUser)


router.post('/login',authController.loginUser)

router.get('/get-me',authMiiddleware.authUser,authController.getMe)

router.get ('/logout',authController.logoutUser)

module.exports =router