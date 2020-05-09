const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");
const cors = require("cors");

const {
  addUser,
  removeUser,
  getUser,
  getUsers,
  getAnswers,
  emptyAnswers,
  addAnswer,
} = require("./utils");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  socket.on("join", ({ name }, callback) => {
    const { error, user } = addUser({ id: socket.id, name });

    if (error) return callback({ error });

    const users = getUsers();

    const response = {
      name: user.name,
      id: user.id,
      users,
    };

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the game.`,
    });
    socket.broadcast.emit("message", {
      user: "admin",
      text: `${user.name} has joined!`,
    });
    socket.broadcast.emit("friendsOnline", users);

    callback(response);
  });

  socket.on("startGame", () => {
    socket.broadcast.emit("startGame");
  });

  socket.on("restart", () => {
    emptyAnswers();
  });

  socket.on("everyoneAnswered", () => {
    socket.broadcast.emit("startPicking");
  });

  socket.on("joined", (response) => {
    const users = getUsers();
    socket.broadcast.emit("getUsers", users);
  });

  socket.on("sendAnswer", (answer, callback) => {
    addAnswer(answer);
    const answers = getAnswers();
    const users = getUsers();

    const responsePack = {
      users,
      answers,
    };
    callback(responsePack);
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.emit("message", { user: user.name, text: message });
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.emit("message", { user: "Admin", text: `${user.name} has left.` });
    }
  });
});

app.use(router);
app.use(cors());

server.listen(PORT, () => console.log("Listening on: ", PORT));
