const mongoose = require('mongoose');  

const MessageSchema = new mongoose.Schema({  
  id_chat: { type: Number, required: true },  
  id_sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
  id_receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
  message_content: { type: String, required: true },  
  time_send: { type: Date, default: Date.now },  
  create_at: { type: Date, default: Date.now },  
});  

module.exports = mongoose.model('Message', MessageSchema);