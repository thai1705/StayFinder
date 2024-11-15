import React from 'react';  
import ReactDOM from 'react-dom/client';  
import './index.css';  
import { BrowserRouter, Route, Routes } from 'react-router-dom';  
import AppAdmin from './AppAdmin';  
// import 'bootstrap/dist/css/bootstrap.min.css';  
// import 'bootstrap/dist/js/bootstrap.bundle.min';  
// import 'bootstrap-icons/font/bootstrap-icons.css';  
import Home from './components/UserApp/Home'; 
import Login from './components/Login'; 
import Resigter from './components/Register';  
import News from './components/UserApp/News';  
import Contact from './components/UserApp/Contact';
import Introduce from './components/UserApp/Introduce';
import Messinger from './components/UserApp/Messinger';
import SavedPosts from './components/UserApp/SavedPosts'; 
import NotFound from './components/NotFound';
import Index from './components/UserApp';
import PostNew from './components/UserApp/PostComponent/PostNew';
import Changepassword from './components/UserApp/PostComponent/Changepassword';
import Account from './components/UserApp/PostComponent/Account';
import ManagerPost from './components/UserApp/PostComponent/ManagerPost';
import PostHouse from './components/UserApp/Post_list_component/PostHouse';  
import PostRoomSale from './components/UserApp/Post_list_component/PostRoomSale';
import PostApartment from './components/UserApp/Post_list_component/PostApartment';  
import PostRommate from './components/UserApp/Post_list_component/PostRommate';  
import PostDetail from './components/UserApp/Post_list_component/PostDetail';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
//===========================ADMIN==============================

import HomeAdmin from './components/AdminApp/HomeAdmin';
import ManagePost from './components/AdminApp/ManagePosts';
import CategoryManagement from './components/AdminApp/CategoryManagement';
import AccountAdmin from './components/AdminApp/AccountAdmin';
import OrderManagement from './components/AdminApp/OrderManagement';
import Payment from './components/UserApp/Payment';
import TransactionHistory from './components/UserApp/PostComponent/TransactionHistory';
import PostProvince from './components/UserApp/Post_list_component/PostProvince';
import UpdatePost from './components/UserApp/PostComponent/UpdatePost';




const root = ReactDOM.createRoot(document.getElementById('root'));  
const stripePromise = loadStripe('pk_test_51QIXc5Gui79K0O8g32wUjEQt6TXJTUp8jxVyKk1HupexrNJaqrfCDbJiWrH7sSfA1iaL9b6EDXVXr2YgAYNc3DgV00sReAVhS');
root.render(  
  <React.StrictMode>  
    <BrowserRouter>  
    <Elements stripe={stripePromise}>
      <Routes>  
      <Route path="/" element={<Index />} >  
        <Route path="/" element={<Home />} />  
          <Route path="/dang-nhap" element={<Login />} />  
          <Route path="/dang-ky" element={<Resigter />} />  
          <Route path="/tin-tuc" element={<News />} />
          <Route path="/lien-he" element={<Contact />} /> 
          <Route path="/gioi-thieu" element={<Introduce />} /> 
          <Route path="/nhan-tin" element={<Messinger />} /> 
          <Route path="/cho-thue-nha-o" element={<PostHouse />} />  
          <Route path="chi-tiet-bai-dang/:id" element={<PostDetail />} />  
          <Route path="/cho-thue-phong-tro" element={<PostRoomSale />} />  
          <Route path="/lay-danh-sach-bai-dang-theo-tinh" element={<PostProvince />} />
          <Route path="/cho-thue-can-ho" element={<PostApartment />} />  
          <Route path="/tim-nguoi-o-ghep" element={<PostRommate />} />  
          <Route path="/dang-tin" element={<PostNew/>} />  
          <Route path="/transaction-history" element={<TransactionHistory/>} />
          <Route path="/quan-li-tin-dang" element={<ManagerPost/>} />
          <Route path="/chinh-sua-tin-dang/:id" element={<UpdatePost/>} />    
          <Route path='/doi-mat-khau' element={<Changepassword />} />
          <Route path='/tai-khoan' element={<Account />} />
          <Route path="/tin-da-luu" element={<SavedPosts />} />  
          <Route path="/payment" element={<Payment />} />
          <Route path='*' element={<NotFound />} />
        </Route>  
        
       {/*====================== ADMIN ======================= */}
       <Route path="/admin/*" element={<AppAdmin />} >  
            <Route index element={<HomeAdmin />} /> 
            <Route path="quan-ly-bai-dang" element={<ManagePost />} />     
            <Route path="quan-ly-danh-muc" element={<CategoryManagement />} />   
            <Route path="quan-ly-tai-khoan" element={<AccountAdmin />} />   
            <Route path="don-hang" element={<OrderManagement />} /> 
          </Route>   
      </Routes>   
      </Elements>
    </BrowserRouter>  
  </React.StrictMode>  
);