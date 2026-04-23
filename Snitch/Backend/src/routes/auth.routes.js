import { Router } from "express";
import { validsateRegisterUser, validateLoginUser } from "../validator/auth.validator.js";
import { register ,login ,googleOAuthCallback} from "../controllers/auth.controllers.js"
import passport from "passport";

const router = Router();

// Register route
router.post ('/register', validsateRegisterUser, register)
// Login route
router.post('/login', validateLoginUser, login)
// Google OAuth route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {session: false}), googleOAuthCallback)


export default router;