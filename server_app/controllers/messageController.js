
const Message = require("../model/Message");  
const Chat = require('../model/Chat');
const { io } = require('../server'); 

// Gửi tin nhắn  
exports.sendMessage = async (req, res) => {
  const { id_chat, id_receiver, message_content, post_title} = req.body;
  const id_sender = req.user.userId; // Lấy id_sender từ thông tin người dùng đã xác thực

  // Kiểm tra nếu thiếu nội dung tin nhắn
  if (message_content === undefined) {
    return res.status(400).json({ message: "Message content is required." });
  }


  try {
    // Tạo mới một tin nhắn
    const message = new Message({
      id_chat,
      id_sender,
      id_receiver,
      message_content: message_content || "", // Nếu không có nội dung, gán mặc định là chuỗi trống
      post_title: post_title, // Lưu post_title vào message

    });

    // Lưu tin nhắn vào database
    await message.save();

    // Trả về tin nhắn đã lưu
    res.status(201).json(message);
  } catch (error) {
    // Nếu có lỗi, trả về thông báo lỗi
    res.status(400).json({ message: error.message });
  }
};



exports.getMessagesByChatId = async (req, res) => {  
  const { chat_id } = req.query;  
  try {  
    const messages = await Message.find({ id_chat: chat_id })  
      .populate('id_sender', 'username avatar')  // Lấy username của người gửi  
      .populate('id_receiver', 'username avatar'); // Lấy username và avatar của người nhận (giả sử id_receiver có cấu trúc là mảng các đối tượng)  
  
    res.status(200).json(messages);  
  } catch (error) {  
    res.status(400).json({ message: error.message });  
  }  
};

// Lấy danh sách các người đã nhắn tin với người dùng (chỉ lấy thông tin của người nhận và người gửi)
exports.getConversations = async (req, res) => {
  const userId = req.user.userId; // Lấy userId từ thông tin người dùng đã xác thực

  try {
    // Lấy tất cả các tin nhắn mà người dùng này đã tham gia
    const messages = await Message.find({
      $or: [{ id_sender: userId }, { id_receiver: userId }],
    })
      .populate('id_sender', 'username avatar')  // Lấy username và avatar của người gửi
      .populate('id_receiver', 'username avatar'); // Lấy username và avatar của người nhận

    // Lọc các cuộc trò chuyện (theo id_chat) để loại bỏ tin nhắn trùng lặp
    const conversations = [];

    messages.forEach((message) => {
      // Lọc thông tin người gửi và người nhận và thêm vào danh sách cuộc trò chuyện
      const conversation = {
        //_id: message.id_receiver._id,
        id_chat: message.id_chat,
        username: message.id_sender._id.toString() !== userId.toString() ? message.id_sender.username : message.id_receiver.username,
        avatar: message.id_sender._id.toString() !== userId.toString() ? message.id_sender.avatar : message.id_receiver.avatar,
      };

      // Kiểm tra xem cuộc trò chuyện này đã có trong danh sách chưa
      if (!conversations.some((conv) => conv.id_chat === conversation.id_chat)) {
        conversations.push(conversation);
      }
    });

    res.status(200).json(conversations); // Trả về danh sách các cuộc trò chuyện với `id_chat`
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createChat = async (req, res) => {  
  const { userId } = req.body; // Nhận ID người dùng muốn nhắn tin (người nhận)  
  const senderId = req.user.userId; // ID của người gửi từ req.user  

  try {  
      // Kiểm tra nếu đã tồn tại chat giữa hai người này  
      const existingChat = await Chat.findOne({  
          $or: [  
              { users: [senderId, userId] },  
              { users: [userId, senderId] }  
          ]  
      });  

      if (existingChat) {  
          return res.status(200).json({ chatId: existingChat.id_chat });  
      }  

      // Tạo chat mới nếu chưa tồn tại  
      const latestChat = await Chat.findOne().sort({ id_chat: -1 }).limit(1);  
      const newChatId = latestChat ? latestChat.id_chat + 1 : 1; // Tạo id_chat mới  

      const newChat = new Chat({   
          id_chat: newChatId, // Gán id_chat mới  
          users: [senderId, userId]   
      });  
      await newChat.save();  

      res.status(201).json({ chatId: newChat.id_chat });  
  } catch (error) {  
      res.status(400).json({ message: error.message });  
  }  
}; 
