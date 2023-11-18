const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const noir = require("./src/routes/noir.route");
const push = require("./src/routes/push.route");

const app = express();
const port = process.env.PORT || 4000;
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

app.use(jsonParser);
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server);

const sessions = {}; // To keep track of sessions and UIDs

io.on("connection", (socket) => {
  socket.on("register", (uid) => {
    console.log("Registered UID: " + uid + " Socket Id: " + socket.id);
    sessions[uid] = socket.id;
  });

  socket.on("message", ({ uid, message }) => {
    console.log(
      "Got Message! UID: " +
        uid +
        " Message: " +
        message +
        " Target Message: " +
        sessions[uid]
    );
    const targetSocketId = sessions[uid];
    if (targetSocketId) {
      io.to(targetSocketId).emit("message", message);
    }
  });
});

app.use("/noir", noir);
app.use("/push", push);

server.listen(port, () => console.log(`Server running on port ${port}`));
