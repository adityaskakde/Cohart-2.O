const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function identifyUser(req, res, next) {
  try {
    // 🔥 1. TOKEN GET
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Token not provided, unauthorized access",
      });
    }

    // 🔥 2. VERIFY TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 3. CHECK DECODED DATA
    if (!decoded || !decoded.id) {
      return res.status(401).json({
        message: "Invalid token payload",
      });
    }

    // 🔥 4. GET USER FROM DB (BEST PRACTICE)
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 🔥 5. ATTACH CLEAN USER OBJECT
    req.user = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    next();

  } catch (err) {
    console.log("AUTH ERROR:", err.message);

    return res.status(401).json({
      message: "User not authorized",
    });
  }
}

module.exports = identifyUser;