const express = require("express");
const http = require("http");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const twilio = require("twilio");
require("dotenv").config();

const PORT = process.env.PORT || 5002;

const app = express();

const server = http.createServer(app);

app.use(cors());

let connectedUsers = [];
let rooms = [];

//Room exists
app.get("/api/room-exists/:roomId", (req, res) => {
  const { roomId } = req.params;
  const room = rooms.find((room) => room.id === roomId);

  if (room) {
    //send response that room exists
    if (room.connectedUsers.length > 3) {
      return res.send({ roomExists: true, full: true });
    } else {
      return res.send({ roomExists: true, full: false });
    }
  } else {
    //send response that room does not exist
    return res.send({ roomExists: false });
  }
});

app.get("/api/get-turn-credentials", (req, res) => {
  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;

  const client = twilio(accountSid, authToken);
  // console.log(client);
  let responseToken = null;
  try {
    client.tokens.create().then((token) => {
      responseToken = token;
      console.log(responseToken);
      res.send({ token });
    });
  } catch (err) {
    console.log("error occured whiling fecting turn server ");
    console.log(err);
    res.send({ token: null });
  }
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("create-new-room", (data) => {
    createNewRoomHandler(data, socket);
  });

  socket.on("join-room", (data) => {
    joinRoomHandler(data, socket);
  });

  socket.on("disconnect", () => {
    disconnectHandler(socket);
  });

  socket.on("conn-signal", (data) => {
    signalingHandler(data, socket);
  });

  socket.on("conn-init", (data) => {
    initializeConnectoinHandler(data, socket);
  });
  socket.on("direct-message", (data) => {
    directMessageHandler(data, socket);
  });
});

//socket io handler
const createNewRoomHandler = (data, socket) => {
  console.log("Room created");
  console.log(data);
  const { identity, onlyAudio } = data;
  const roomId = uuidv4();

  // create new user
  const newUser = {
    identity,
    id: uuidv4(),
    socketId: socket.id,
    roomId,
    onlyAudio,
  };

  //push that user to connectedUser
  connectedUsers = [...connectedUsers, newUser];

  //create new room
  const newRoom = {
    id: roomId,
    connectedUsers: [newUser],
  };

  //join socket.io room
  socket.join(roomId);

  rooms = [...rooms, newRoom];

  //emit to that client which created that room roomId
  socket.emit("room-id", { roomId });

  //emit an event to all users connected to that room
  //about new users which are right there
  socket.emit("room-update", { connectedUsers: newRoom.connectedUsers });

  socket.emit("toast-message", {
    msg: `${newUser.identity} has started the meeting.`,
    type: 0,
  });
};

const joinRoomHandler = (data, socket) => {
  const { identity, roomId, onlyAudio } = data;

  const newUser = {
    identity,
    id: uuidv4(),
    socketId: socket.id,
    roomId,
    onlyAudio,
  };
  //join room as user which just is trying to join room by passing roomId
  const room = rooms.find((room) => room.id === roomId);

  room.connectedUsers = [...room.connectedUsers, newUser];
  // console.log(room.connectedUsers);
  //join socket.io room
  socket.join(roomId);

  //add newuser to connectd user array
  connectedUsers = [...connectedUsers, newUser];
  // console.log(connectedUsers);

  // EMIT to all users which are already in this room to prepare  peer connection
  room.connectedUsers.forEach((user) => {
    if (user.socketId !== socket.id) {
      const data = {
        connUserSocketId: socket.id,
      };
      io.to(user.socketId).emit("conn-prepare", data);
    }
  });

  io.to(roomId).emit("room-update", { connectedUsers: room.connectedUsers });
  io.to(roomId).emit("toast-message", {
    msg: `${newUser.identity} has joined the meeting.`,
    type: 1,
  });
};

const disconnectHandler = (socket) => {
  // find if user has been registered - if
  // yes remove him from room and connectedUser
  const user = connectedUsers.find((user) => user.socketId === socket.id);
  if (user) {
    const room = rooms.find((room) => room.id === user.roomId);
    room.connectedUsers = room.connectedUsers.filter(
      (user) => user.socketId !== socket.id
    );

    // leave socket io room
    socket.leave(user.roomId);

    // emit an event to rest of the users which left in the room
    // newUser in room
    io.to(room.id).emit("room-update", { connectedUsers: room.connectedUsers });
    // TODO
    // close the room if amount of the user which will
    // stay in room will be 0
    if (room.connectedUsers.length > 0) {
      //emit to all users which are still in the room that user disconnected
      io.to(room.id).emit("user-disconnected", { socketId: socket.id });

      io.to(room.id).emit("room-update", {
        connectedUsers: room.connectedUsers,
      });
      io.to(room.id).emit("toast-message", {
        msg: `${user.identity} has left the meeting.`,
        type: 2,
      });
    } else {
      rooms = rooms.filter((r) => r.id !== room.id);
      // socket.emit("toast-message", {
      //   msg: `Meeting Ended`,
      //   type: 2,
      // });
    }
  }
};

const signalingHandler = (data, socket) => {
  const { connUserSocketId, signal } = data;

  const signalingData = { signal, connUserSocketId: socket.id };
  io.to(connUserSocketId).emit("conn-signal", signalingData);
};

// info from client which are already in room . they have
// prepared for incoming connection
const initializeConnectoinHandler = (data, socket) => {
  const { connUserSocketId } = data;
  const initData = { connUserSocketId: socket.id };
  io.to(connUserSocketId).emit("conn-init", initData);
};

const directMessageHandler = (data, socket) => {
  if (
    connectedUsers.find(
      (connUser) => connUser.socketId === data.receiverSocketId
    )
  ) {
    const receiverData = {
      authorSocketId: socket.id,
      messageContent: data.messageContent,
      isAuthor: false,
      identity: data.identity,
    };
    socket.to(data.receiverSocketId).emit("direct-message", receiverData);

    const authorData = {
      receiverSocketId: data.receiverSocketId,
      messageContent: data.messageContent,
      isAuthor: true,
      identity: data.identity,
    };

    socket.emit("direct-message", authorData);
  }
};

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
