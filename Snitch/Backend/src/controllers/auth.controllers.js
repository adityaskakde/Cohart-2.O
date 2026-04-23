import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";


// Helper function to send token response

async function sendTokenResponse(user, res, message) {

    const token = jwt.sign({
        id: user._id,
    }, config.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("token", token,{
             httpOnly: true,
             secure: false

    }    )



    res.status(200).json({
        message,
        success: true,
        user: {
            id: user._id,
            email: user.email,
            contactNumber: user.contactNumber,
            fullName: user.fullName,
            role: user.role
        }
    })}


    // Register controller

    export const register = async (req, res) => {
    const { email, contactNumber, password, fullName, isSeller } = req.body;

    try {
        const existingUser = await userModel.findOne({
            $or: [
                { email },
                { contactNumber }
            ]
        })

        if (existingUser) {
            return res.status(400).json({ message: "User with this email or contact already exists" });
        }

        const user = await userModel.create({
            email,
            contactNumber,
            password,
            fullName,
            role: isSeller ? "seller" : "buyer"
        })

        await sendTokenResponse(user, res, "User registered successfully")

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error" });
    }
}


  
// Login controller

export const login = async (req, res) => {
    const { email, password } = req.body;   
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    await sendTokenResponse(user, res, "Login successfull");

}


// Google OAuth callback controller

export const googleOAuthCallback = async (req, res) => {
console.log(req.user);

res.redirect("http://localhost:5173/")

}