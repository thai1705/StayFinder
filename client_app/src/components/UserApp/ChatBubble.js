import React, { useState, useEffect } from 'react';  
import { useChat } from './ChatContext';  
import axios from 'axios';  
import '../../css/Messinger.css';  

const ChatBubble = () => {  
    const { setIsOpen } = useChat();  
    const [showInput, setShowInput] = useState(false);  
    const [isVisible, setIsVisible] = useState(false);  
    const [messages, setMessages] = useState([]);  
    const [loading, setLoading] = useState(true);   
    const chatId = "1";   
    const token = localStorage.getItem('token');   
    const userId = localStorage.getItem('userId');   
    console.log("Current User ID:", userId);  

    // Hàm gọi API để lấy dữ liệu tin nhắn  
    const fetchMessages = async () => {  
        try {  
            const response = await axios.get(`http://localhost:8000/api/messages?chat_id=${chatId}`, {  
                headers: { Authorization: `Bearer ${token}` }  
            });  
            console.log("Messages fetched:", response.data);  // Kiểm tra dữ liệu nhận được  
            const filteredMessages = response.data.filter(message =>   
                message.id_sender === userId || message.id_receiver === userId  
            );  
            setMessages(filteredMessages); // Lưu dữ liệu đã lọc vào state  
        } catch (error) {  
            console.error("Error fetching messages:", error);  
        } finally {  
            setLoading(false); // Kết thúc quá trình loading  
        }  
    };
    

    useEffect(() => {  
        if (showInput) {  
            fetchMessages(); // Gọi hàm để lấy dữ liệu khi showInput là true  
        }  
    }, [showInput]);  

    const handleBubbleClick = () => {  
        setShowInput(true);  
        setIsOpen(true);  
        setTimeout(() => setIsVisible(true), 10);  
    };  

    const handleCloseChat = () => {  
        setIsVisible(false);  
        setTimeout(() => {  
            setShowInput(false);  
            setIsOpen(false);  
        }, 300);  
    };  

    return (  
        <div>  
            {!showInput && (  
                <div className="chat-bubble" onClick={handleBubbleClick}>  
                    <div className="chat-icon">💬</div>  
                </div>  
            )}  
            {showInput && (  
                <div className="chat-container"   
                     style={{  
                         opacity: isVisible ? 1 : 0,  
                         transform: isVisible ? 'translateY(0)' : 'translateY(20px)',  
                         transition: 'opacity 0.3s ease, transform 0.3s ease',  
                     }}>  
                    <div className="header-chat">  
                        <div className='chat-avt-name'>  
                            <img className="avatar" src="/images/anhbd.webp" alt="Avatar" />  
                            <div className="username">Duy Thái</div>  
                        </div>  
                        <button onClick={handleCloseChat} className="close-button">  
                            <i className="fas fa-minus"></i>  
                        </button>  
                    </div>  
                    <div className="messages">  
                        {loading ? (  
                            <div>Loading messages...</div>  
                        ) : (  
                            messages.map((message) => (  
                                <div key={message._id} className={`message ${message.id_sender === userId ? 'sent' : 'received'}`}>   
                                    {message.id_sender !== userId && message.id_receiver && (  
                                        <>  

                                            <img src={message.id_receiver.avatar} alt="Receiver Avatar" className="message-avatar" />  
                                            <span className="receiver-name">{message.id_receiver.username}</span>  
                                        </>  
                                    )}  
                                    <div className="text">{message.message_content}</div>  
                                </div>   
                            ))  
                        )}  
                    </div>  
                    <div className="input-container">  
                        <input type="text" placeholder="Nhập tin nhắn..." className="message-input" />  
                        <button className='btn-button'>Gửi</button>  
                    </div>  
                </div>  
            )}  
        </div>  
    );  
};  

export default ChatBubble;