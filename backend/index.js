// backend/index.js
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app); // Create an HTTP server with Express app
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const port = 3000;

io.on("connection", socket => {
  console.log("a user connected :D");
  socket.on("chat message", msg => {
    console.log(msg);
    io.emit("chat message", msg); // ส่งข้อความกลับไปยังทุกคนในห้อง chat message
    io.emit("messageSent", msg); // ส่งเหตุการณ์ messageSent กลับไปยังไคลเอ็นต์
  });
});

server.listen(port, () => console.log("server running on port:" + port));