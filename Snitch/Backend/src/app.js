import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express .urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the API" }

    );
});

// Auth routes

app.use("/auth", authRoutes);


export default app;
