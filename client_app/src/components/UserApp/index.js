import './../../App.css'
import Header from "./Header";
import Footer from "./Footer"
import { Outlet, useLocation } from "react-router-dom";
import ChatProvider  from './ChatContext';  
import ChatBubble from './ChatBubble';  

function Index(){
    const location = useLocation();  
  
  const isAuthPage = location.pathname === '/dang-nhap' || location.pathname === '/dang-ky'; 

    return(
      <ChatProvider>  
        <div>
        {!isAuthPage && <Header />}
       <main>
     <Outlet/>
     <ChatBubble /> 
       </main>
       {!isAuthPage && <Footer />}
     </div>
     </ChatProvider> 
    )
}

export default Index