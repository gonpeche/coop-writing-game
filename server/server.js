const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  socket.on("join", ({ userName }, callback) => {
    const { error, user } = addUser({ id: socket.id, userName });

    if (error) throw new Error(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.userName}, welcome to the game.`,
    });
    socket.broadcast.emit("message", {
      user: "admin",
      text: `${user.userName} has joined!`,
    });
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    console.log("sendMessage", user, message);
    io.emit("message", { user: user.userName, text: message });
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.emit("message", { user: "Admin", text: `${user.userName} has left.` });
    }
  });
});

app.use(router);
app.use(cors());

server.listen(PORT, () => console.log("Listening on: ", PORT));
