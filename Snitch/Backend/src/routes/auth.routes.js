import { Router } from "express";
import { validsateRegisterUser } from "../validator/auth.validator.js";


const router = Router();

// Register route
router.post ('/register', validsateRegisterUser,)

export default router;