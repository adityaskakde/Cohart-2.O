import { Router } from "express"
import { register } from "../controllers/auth.Controller.js"
import { registerValidation } from "../validations/authValidation.js"

const authRouter = Router()



/**
 * @route POST  /api/auth/register
 * @des Register a new user 
 * @access Public
 * @body { username, email, password}
 */

authRouter.post("/register", registerValidation, register)

export default authRouter