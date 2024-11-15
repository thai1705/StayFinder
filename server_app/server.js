var express = require("express");
require("dotenv").config();
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;
const uri = "mongodb://127.0.0.1:27017/StudyFinder";
const Message = require("./model/Message");

// Import routes
const postRoutes = require("./router/postRoutes");
const AuthRoute = require("./router/AuthRoute");
const messageRoutes = require("./router/messageRoutes");

// Middleware
app.use(
  cors({
    origin: "http://localhost:3500",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static("public"));
app.use("/img", express.static(__dirname + "/public/img"));
app.use("/video", express.static(__dirname + "/public/video"));

// Routes
app.use("/api/auth", AuthRoute);
app.use("/api", messageRoutes);
app.use(postRoutes);

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Tạo server HTTP
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3500",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("sendMessage", async (messageData) => {
    if (!messageData.id_chat || !messageData.message_content) {
      console.error("Invalid message data", messageData);
      return; // Hoặc gửi phản hồi lỗi
    }

    try {
      const message = new Message({
        ...messageData, // Giữ lại tất cả các thuộc tính hiện có
        sender: messageData.userId, // Thêm ID người gửi
      });

      // Lưu tin nhắn vào cơ sở dữ liệu
      await message.save();

      // Gửi thông báo cho phòng chat
      socket.to(messageData.id_chat).emit("messageReceived", message); // Gửi đến tất cả mọi người trong phòng

      // Thông báo cho người gửi
      io.emit("messageSent", message);
    } catch (error) {
      console.error("Error saving message:", error);
      socket.emit("error", { message: "Lỗi khi gửi tin nhắn" }); // Gửi phản hồi lỗi cho client
    }
  });

  socket.on("joinChat", (id_chat) => {
    socket.join(id_chat);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the server
server.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`)
);
