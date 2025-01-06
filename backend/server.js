const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const database = require("./config/database");
const path = require("path");

const userRoutes = require("./routes/user");
const projectRoutes = require("./routes/Project");
const aiRoutes = require("./routes/AIchat");
const fileRoute = require("./routes/Files")

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4000;
//const __dirname = path.resolve();

// Connect to the database
database.connect();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/project", projectRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/file", fileRoute);

// Default route
// app.use("/", (req, res) => {
//   res.send("<h1>Server is Running</h1>");
// });

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));

	// react app
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "..", "frontend", "dist", "index.html"));
	});
}


// Start the server
const server = app.listen(PORT, () => {
  console.log(`Your server is running at http://localhost:${PORT}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const socketId_to_userMap = {}; // Global user map
const roomID_to_Code_Map = {}; // Code map for each project
const roomID_to_currFile_Map = {};



// Get the list of users in a room
async function getUserInRoom(projectId, io) {
  const socketList = await io.in(projectId).allSockets();
  const userList = [];

  socketList.forEach((socketId) => {
    if (socketId_to_userMap[socketId]) {
      userList.push(socketId_to_userMap[socketId].user);
    }
  });

  return userList;
}

// Update the user list and notify all users in the room
async function updateUserslist(io, projectId) {
  const userslist = await getUserInRoom(projectId, io);
  io.to(projectId).emit("updating client list", { userslist, currFile: roomID_to_currFile_Map[projectId] });
}

// Handle socket connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle user joining a room
  socket.on("when user join the room", async (projectId, user) => {
    // Map the socket ID to the user
    socketId_to_userMap[socket.id] = { user };

    // Join the room
    socket.join(projectId);

    // Send the latest code to the new user when they join an existing room
    if (roomID_to_Code_Map[projectId]) {
      io.to(socket.id).emit("on code change", { code: roomID_to_Code_Map[projectId]});
    }

    // Notify all users in the room about the new user
    io.to(projectId).emit("when user join the room", { user });

    // Update and emit the user list
    await updateUserslist(io, projectId);
  });

  // Handle code updates
  socket.on("update code", ({ projectId, code, userId }) => {
   // console.log("Updating code for project:", projectId);
    //console.log("New code:", code);

    // Update the room's code map
    roomID_to_Code_Map[projectId] = code;

    // Broadcast the updated code to all clients in the room
    io.to(projectId).emit("on code change", { code: roomID_to_Code_Map[projectId], userId });

   // console.log("Updated roomID_to_Code_Map:", roomID_to_Code_Map);
  });

  // Handle syncing the code
  socket.on("syncing the code", ({ projectId }) => {
    //console.log("Syncing code for project:", projectId);
    if (roomID_to_Code_Map[projectId]) {
      //console.log("Code to sync:", roomID_to_Code_Map[projectId]);
      io.to(projectId).emit("on code change", { code: roomID_to_Code_Map[projectId]});
    }
  });

  //handle file swap or change
  socket.on("file swap", ({projectId, fileId, files}) => {
    roomID_to_currFile_Map[projectId] = fileId;

    //console.log("currFile", roomID_to_currFile_Map[projectId]);

    //console.log("file swap to fileId", fileId);
    io.to(projectId).emit("file swap", {fileId, files});
  })

  // Handle user leaving a room explicitly
  socket.on("leave room", async ({ projectId }) => {
    const user = socketId_to_userMap[socket.id]?.user;
    if (user) {
      io.to(projectId).emit("member left", { user });
    }

    // Leave the room and remove the user from the map
    socket.leave(projectId);
    delete socketId_to_userMap[socket.id];

    // Update and emit the user list
    await updateUserslist(io, projectId);
  });

  // Handle user disconnecting
  socket.on("disconnecting", async () => {
    console.log(`Socket disconnecting: ${socket.id}`);

    // Notify all rooms the socket is a part of
    for (const roomId of socket.rooms) {
      if (roomId !== socket.id) {
        const user = socketId_to_userMap[socket.id]?.user;
        if (user) {
          io.to(roomId).emit("member left", { user });
        }

        // Remove the user and update the room's user list
        delete socketId_to_userMap[socket.id];
        await updateUserslist(io, roomId);
      }
    }
  });
});
