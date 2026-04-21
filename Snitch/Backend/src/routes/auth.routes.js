import { Router } from "express";
import { validsateRegisterUser } from "../validator/auth.validator.js";
import { register } from "../controllers/auth.controllers.js"

const router = Router();

// Register route
router.post ('/register', validsateRegisterUser, register)

export default router;