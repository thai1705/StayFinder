import React, { createContext, useContext, useState } from 'react';  

const ChatContext = createContext();  

const ChatProvider = ({ children }) => {  
    const [isOpen, setIsOpen] = useState(false);  

    return (  
        <ChatContext.Provider value={{ isOpen, setIsOpen }}>  
            {children}  
        </ChatContext.Provider>  
    );  
};  

export const useChat = () => useContext(ChatContext);  
export default ChatProvider; 