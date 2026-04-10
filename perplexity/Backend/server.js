import "dotenv/config";
import app from "./src/app.js";
import http from "http"
import connectDB from "./src/config/database.js";
import {initSocket} from "./src/sockets/server.socket.js"

const startServer = async () => {
  try {
    await connectDB();

        const httpServer = http.createServer(app);

        initSocket(httpServer)


    httpServer.listen(3000, () => {
      console.log("server is running on port 3000");
    });

  } catch (err) {
    console.log("SERVER ERROR:", err);
  }
};

startServer();