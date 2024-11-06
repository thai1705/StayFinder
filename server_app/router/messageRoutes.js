const express = require('express');  
const { sendMessage, getMessagesByChatId } = require('../controllers/messageController');  
const authenticateToken = require('../middleware/auth'); // Import middleware  
const router = express.Router();  

// Sử dụng middleware authenticateToken để bảo vệ các route  
router.post('/messages', authenticateToken, sendMessage);  
router.get('/messages', authenticateToken, getMessagesByChatId);  

module.exports = router;