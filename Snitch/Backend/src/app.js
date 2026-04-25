import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/Product.routes.js";
import cors from "cors";
import passport from "passport";
import { config } from "./config/config.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";


const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express .urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    method:["GET","POST","PUT","DELETE"],
    credentials: true
}))
app.use(passport.initialize());

// Passport configuration for Google OAuth
passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET, 
callbackURL: "http://localhost:3000/api/auth/google/callback"},
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);

  }));

// Routes
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the API" }

    );
});

// Auth routes

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);


export default app;
