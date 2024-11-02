
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Tên người đăng nhập
  email:{type:String,require:true},
  phone:{type:String,repuire:true},
  role: { 
    type: Number, 
    enum: [0, 1, 2], // 0 = admin, 1 = subadmin, 2 = user
    default: 2 
  },
  avatar:{String},
  postCount: { type: Number, default: 0 }, // Counts user's posts
  status:{
    type:Number,
    enum:[0,1,2], //0 = hoạt động , 1 không hoạt động , 2 bị khóa
  }
});

module.exports = mongoose.model('User', userSchema);
