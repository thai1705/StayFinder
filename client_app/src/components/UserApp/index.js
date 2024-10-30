import './../../App.css'
import Header from "./Header";
import Footer from "./Footer"
import { Outlet, useLocation } from "react-router-dom";


function Index(){
    const location = useLocation();  
  
  const isAuthPage = location.pathname === '/dang-nhap' || location.pathname === '/dang-ky'; 

    return(
        <div>
        {!isAuthPage && <Header />}
       <main>
     <Outlet/>
       </main>
       {!isAuthPage && <Footer />}
     </div>
    )
}

export default Index