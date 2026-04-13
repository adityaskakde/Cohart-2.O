import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import http from "http";
import { Server } from "socket.io";

const startServer = async () => {
  try {
    await connectDB();

    // 🔥 create http server
    const server = http.createServer(app);

    // 🔥 attach socket.io
    const io = new Server(server, {
      cors: {
        origin: "http://localhost:5173",
        credentials: true,
      },
    });

    // 🔥 socket connection
    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });

    // 🔥 start server
    server.listen(3000, () => {
      console.log("server is running on port 3000");
    });

  } catch (err) {
    console.log("SERVER ERROR:", err);
  }
};

startServer();