const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true }, 
  email: { type: String, require: true },
  password: { type: String, require: true },
  phone: { type: Number, require: true },
  role: {
    type: Number,
    enum: [0, 1, 2], 
    default: 2,
  },
  avatar: {  
    type: String, 
  },  
  postCount: { type: Number, default: 0 }, 
  status: {
    type: Number,
    enum: [0, 1, 2],
  },
});

module.exports = mongoose.model("User", userSchema);
