import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

async function senTokenResponse(user, res) {
  const token = jwt.sign(
    {
      id: user._id,
    },
    config._id.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES_IN },
  );
}

export const register = async (req, res) => {};
