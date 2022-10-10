const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes.js");
const messageRoute = require("./routes/messageRoute");
const app = express();
const socket = require("socket.io");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoute);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    req.sendFile(path).resolve(__dirname, "build", "index.html");
  });
}
mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connetction successful"))
  .catch((err) => {
    console.log(err.message);
  });
// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log(`DB connect`);
//   })
//   .catch((err) => {
//     console.log(err.message);
//     console.log("what");
//   });

const server = app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});
const io = socket(server, {
  // if server have connection to the client
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

// console.log(global); //global objects are global in nature and they are available in all modules
global.onlineUsers = new Map(); //store all online user in the map
io.on("connection", (socket) => {
  //store the chat socket inside the global chat socket
  // console.log(socket);
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    //whenever the user log in we set it inside the map
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    //whenever send msg
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      //if user is online emit msg to the user
      socket.to(sendUserSocket).emit("msg-receive", data.msg); //send the msg
    }
    //not online the message will only be stored in db
  });
});
