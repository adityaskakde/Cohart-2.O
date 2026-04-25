import { Router } from "express";
import { validsateRegisterUser, validateLoginUser } from "../validator/auth.validator.js";
import { register ,login ,googleOAuthCallback} from "../controllers/auth.controllers.js"
import passport from "passport";
import { config } from "../config/config.js";

const router = Router();

// Register route
router.post ('/register', validsateRegisterUser, register)
// Login route
router.post('/login', validateLoginUser, login)
// Google OAuth route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {session: false, failureRedirect: config.NODE_ENV == "development" ? 'http://localhost:5173/login' : "/login"}), googleOAuthCallback)


export default router;