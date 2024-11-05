var express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;
const uri = "mongodb://127.0.0.1:27017/StudyFinder";

// Import routes
const postRoutes = require("./router/postRoutes");
const AuthRoute = require("./router/AuthRoute");

// Middleware
app.use(cors());  // Kích hoạt CORS cho toàn bộ ứng dụng
app.use(express.json());  // Parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static("public"));
app.use("/img", express.static(__dirname + "/public/img"));
app.use("/video", express.static(__dirname + "/public/video"));

// Routes
app.use("/api/auth", AuthRoute);
app.use(postRoutes);

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Start the server
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
