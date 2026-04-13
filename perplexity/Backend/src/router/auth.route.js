import { Router } from "express"
import { register, VerifyEmail,login ,getMe,resendVerification} from "../controllers/auth.Controller.js"
import { registerValidation , loginValidator,} from "../validations/authValidation.js"
import { authUser} from "../middleware/auth.js"


const authRouter = Router()



/**
 * @route POST  /auth/register
 * @des Register a new user 
 * @access Public
 * @body { username, email, password}
 */

authRouter.post("/register", registerValidation, register)

/**
 * @route GET /auth/verify-email
 * @des verif user's emsil address
 * @access public
 * @query {token}
 * */

authRouter.get("/verify-email",VerifyEmail)

/**
 * @route POST /auth/resend-verification
 * @desc Resend email verification link
 * @access Public
 * @body { email }
 */
authRouter.post("/resend-verification", resendVerification)


/**
 * @route GET /auth/get-me
 * @des Get current logged in users details
 * @access Private
 */

authRouter.get("/get-me",authUser,getMe)

/**
 * @route POST /api/auth/login
 * @des Login user and return JWT token
 * @access public
 * @body { email, password}
 */


authRouter.post("/login",loginValidator,login)

export default authRouter