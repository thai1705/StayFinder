
const Message = require("../model/Message");  

// Gửi tin nhắn  
exports.sendMessage = async (req, res) => {  
  const { id_chat, id_receiver, message_content } = req.body;  
  const id_sender = req.user.userId; // Lấy id_sender từ thông tin người dùng đã xác thực  
  try {  
    const message = new Message({ id_chat, id_sender, id_receiver, message_content });  
    await message.save();  
    res.status(201).json(message);  
  } catch (error) {  
    res.status(400).json({ message: error.message });  
  }  
};  

// Lấy tin nhắn theo id_chat  
exports.getMessagesByChatId = async (req, res) => {  
  const { chat_id } = req.query;  
  try {  
    const messages = await Message.find({ id_chat: chat_id });  
    res.status(200).json(messages);  
  } catch (error) {  
    res.status(400).json({ message: error.message });  
  }  
};