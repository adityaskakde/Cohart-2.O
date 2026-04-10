import {Router} from 'express';
import { registerValidation } from '../validation/auth.validator.js';
import { registerUser } from "../controllers/auth.controller.js";




const authRouter = Router();






authRouter.post("/register",registerValidation,registerUser)







export default authRouter;