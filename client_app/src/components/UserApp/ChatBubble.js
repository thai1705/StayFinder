import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "../../css/Messinger.css";

const ChatBubble = () => {
  const [showInput, setShowInput] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showTime, setShowTime] = useState({});
  const [recipient, setRecipient] = useState(null);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const socket = useRef(null);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage trước khi kết nối
    socket.current = io("http://localhost:8000", {
      query: { token: token }, // Gửi token trong query string khi kết nối
    });

    // Clean up khi component unmounted
    return () => {
      socket.current.disconnect(); // Ngắt kết nối khi component rời khỏi
    };
  }, []);
  useEffect(() => {
    socket.current.on("messageReceived", (message) => {
      console.log("Received message: ", message);
      // Chỉ tăng unreadCount nếu tin nhắn không phải là của người gửi
      if (message.id_sender._id !== userId) {
        setMessages((prevMessages) => {
          const exists = prevMessages.some((msg) => msg._id === message._id);
          if (!exists) {
            return [...prevMessages, message];
          }
          return prevMessages;
        });
        // Tăng unreadCount chỉ khi tin nhắn mới được thêm
        setUnreadCount((prevCount) => prevCount + 1);
      }
    });
  }, [userId]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      id_chat: selectedConversation.id_chat,
      id_sender: userId,
      id_receiver: recipient._id,
      message_content: newMessage,
      time_send: new Date(),
    };

    // Cập nhật tin nhắn gửi ngay lập tức
    const sentMessage = {
      ...messageData,
      _id: new Date().getTime(), // Hoặc ID thực tế từ server
      sendingStatus: "Đang gửi", // Trạng thái gửi
      id_sender: { _id: userId }, // Thêm id_sender để xét xem tin nhắn là của ai
    };

    // Thêm tin nhắn gửi vào danh sách
    setMessages((prevMessages) => [...prevMessages, sentMessage]);

    // Gửi tin nhắn qua socket
    socket.current.emit("sendMessage", messageData);

    setNewMessage(""); // Reset ô nhập
    scrollToBottom(); // Cuộn xuống dưới
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Ngăn chặn hành động mặc định của phím Enter
      handleSendMessage(); // Gửi tin nhắn
    }
  };

  useEffect(() => {
    if (selectedConversation && selectedConversation.id_chat) {
      setIsLoading(true);
      fetchMessages(selectedConversation.id_chat);
      setUnreadCount(0);
    } else {
      console.error("Selected conversation does not have a valid chat_id.");
    }
  }, [selectedConversation]); // Re-fetch messages when selectedConversation changes

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!showInput) {
      fetchConversations();
    }
  }, [showInput]);

  const fetchMessages = async (chatId) => {
    if (!chatId) {
      console.error("No valid chat_id provided");
      return; // Nếu không có chatId hợp lệ thì không làm gì thêm
    }

    setLoading(true);
    setIsLoadingAvatar(true);

    try {
      console.log("Fetching messages for chat_id:", chatId);
      const response = await axios.get(
        `http://localhost:8000/api/messages?chat_id=${chatId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const filteredMessages = response.data.filter(
        (message) =>
          message.id_sender._id === userId || message.id_receiver._id === userId
      );

      let recipientInfo = null;

      if (filteredMessages.length > 0) {
        const lastMessage = filteredMessages[filteredMessages.length - 1];
        recipientInfo =
          lastMessage.id_sender._id === userId
            ? lastMessage.id_receiver
            : lastMessage.id_sender;
      }

      setMessages(filteredMessages);
      setRecipient(recipientInfo);
      setIsLoadingAvatar(false);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  const fetchConversations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/conversations",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setConversations(response.data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };
  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
    setShowInput(true);
    setIsVisible(true);
    setIsLoading(true);

    setUnreadCount(0); // Reset khi chọn cuộc hội thoại
    socket.current.emit("joinChat", conversation.id_chat);
    fetchMessages(conversation.id_chat);
  };

  const handleMessageClick = (messageId) => {
    setShowTime((prevShowTime) => ({
      ...prevShowTime,
      [messageId]: !prevShowTime[messageId],
    }));
  };

  const handleCloseChat = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShowInput(false); // Đóng input

      setSelectedConversation(null); // Reset selectedConversation về null khi đóng chat
    }, 300);
  };

  const handleBackToConversations = () => {
    setSelectedConversation(null); // Đặt lại cuộc hội thoại đã chọn
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleBackToConversations(); //Esc
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function để xóa lắng nghe khi component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      {!showInput ? (
        <div className="chat-bubble" onClick={() => setShowInput(true)}>
          {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          <div className="chat-icon">💬</div>
        </div>
      ) : selectedConversation ? (
        <div
          className="chat-container"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          <div className="header-chat">
            <div className="chat-avt-name">
              {isLoadingAvatar ? (
                <div className="spinner"></div>
              ) : recipient && recipient.avatar ? (
                <img
                  className="avatar"
                  src={`http://localhost:8000/img/${recipient.avatar.replace(
                    /^public\\img\\/,
                    ""
                  )}`}
                  alt="Avatar"
                />
              ) : (
                <img
                  className="avatar"
                  src="/images/placeholder-avatar.png"
                  alt="Avatar"
                />
              )}
              <div className="username">
                {isLoadingAvatar
                  ? "..."
                  : recipient
                  ? recipient.username
                  : "Loading..."}
              </div>
            </div>
            <button onClick={handleCloseChat} className="close-button">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="message-container">
            {isLoading ? (
              <div className="spinner"></div>
            ) : loading ? (
              <div>Loading...</div>
            ) : messages.length > 0 ? (
              messages.map((message) => {
                const isSentByUser = message.id_sender._id === userId;
                return (
                  <div
                    key={message._id}
                    className={`message ${isSentByUser ? "sent" : "received"}`}
                    onClick={() => handleMessageClick(message._id)}
                  >
                    <div
                      className={
                        isSentByUser ? "sent-message" : "received-message"
                      }
                    >
                      <div className="post-title-message">
                        {message.post_title}
                      </div>
                      <div className="text">{message.message_content}</div>

                      {showTime[message._id] && (
                        <span className="time">
                          {new Date(message.time_send).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div>No messages to display.</div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              className="message-input"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="btn-button" onClick={handleSendMessage}>
              <i class="fa-regular fa-paper-plane"></i>
            </button>
          </div>
        </div>
      ) : (
        <div className="conversations-list show">
          <div className="conversations-list-message">
            <div>Đoạn chat của bạn</div>
            <button
              onClick={handleCloseChat}
              className="close-button close-clone"
            >
              <i style={{ width: "12px" }} className="fas fa-times"></i>
            </button>
          </div>
          {conversations.length === 0 ? (
            <div>Không có tin nhắn nào!</div>
          ) : (
            conversations.map((conversation) => (
              <div
                key={conversation.id_chat}
                className="conversation-item"
                onClick={() => handleConversationSelect(conversation)}
              >
                <div>
                  <img
                    className="conversation-avatar"
                    src={`http://localhost:8000/img/${
                      conversation.avatar
                        ? conversation.avatar.replace(/^public\\img\\/, "")
                        : "/images/placeholder-avatar.png"
                    }`}
                    alt="Avatar"
                  />
                </div>
                <div className="conversation-user">{conversation.username}</div>
                {conversation.unreadCount > 0 && (
                  <span className="badge">{conversation.unreadCount}</span>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
