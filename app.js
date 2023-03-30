const express = require("express");
const http = require("http");
const io = require("socket.io");


const app = express();
const server = http.createServer(app);
const socketServer = io(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  },
});
const ar=[]
const pr=[]



socketServer.on("connection", (socket) => {
  console.log("A client connected");


const myTest=()=>{
    socket.emit("message", `auto emit`);
}
setInterval(myTest,5000)
  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });

  socket.on("getTime", () => {
    console.log(`Received message: `);
    socket.emit("serverTime", `server time is ${new Date().toTimeString()}`);
  });

  socket.on("message", (data) => {
    console.log(`Received message: ${data}`);
    socket.emit("message", `Server received message: ${data}`);
  });


  socket.on("test", (data) => {
    console.log(`Received message: ${data}`);
    socket.emit("test", `Server alive: ${data}`);
  });
  socket.on("add", (data) => {
    ar.push(data)
    console.log(`Received message: ${data}`);
    socket.emit("test", `Server alive and data length: ${data} ar length:${ar.length}`);
  });

  socket.on("addPr", (data) => {
    pr.push(data)
    console.log(`Received message: ${data}`);
    socket.emit("test", `Server alive and data length: ${data} ar length:${pr.length}`);
  });


  socket.on("getData", () => {
    socket.emit("dataHandling", `${pr}`);
  });
  socket.on("blabla", (data) => {
    console.log(`Received message: ${data}`);
    socket.emit("message", `Server blabla message: ${data}`);
  });
});




server.listen(443, () => {
  console.log("Server listening on port 443");
});
