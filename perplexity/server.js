import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/config/database.js";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });

  } catch (err) {
    console.log("SERVER ERROR:", err);
  }
};

startServer();