import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import "../../../css/PostNew.css";


export default function Menu() {
  const [username, setUsername] = useState(null);
  useEffect(() => {

    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:8000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {  
          if (!res.ok) {
            localStorage.removeItem("token");
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (data && data.username) {
            setUsername(data.username); 
          }
        })
        .catch((error) =>
          console.error("Lỗi khi fetch thông tin người dùng:", error)
        );
    }
  }, []);
    const navigate = useNavigate(); // Khai báo useNavigate

    const handleLogout = () => {
      localStorage.removeItem("token"); 
      setUsername(null); 
     
      navigate("/"); 
      window.location.reload();
    };
    
  return (
    <div className="listnewform">
      <aside className="sidebar-tuyen">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar"></div>
            <div className="profile-name">{username}</div>
          </div>
          <div className="profile-content">
            <div className="profile-stats">
              <div className="profile-stat">
                <span>Số lần được đăng:</span>
                <span>15 tin</span>
              </div>
              <div className="profile-stat">
                <span>Loại tin đăng:</span>
                <span>Tin nổi bật</span>
              </div>
              <div className="profile-stat">
                <span>Tin đã đăng:</span>
                <span>5 / 15 tin</span>
              </div>
            </div>

            <div className="account-info">
              <div className="account-code">
                <div className="account-code-title">
                  <span>Mã tài khoản</span>
                </div>
                <div className="account-code-code">
                  <span>#PS33630</span>
                  <button className="copy-button">
                    <i className="fa-regular fa-copy"></i>
                  </button>
                </div>
              </div>
            </div>

            <button className="buy-button">
              Mua Tin{" "}
              <i
                className="fa-solid fa-wallet"
                style={{ color: "#ffffff" }}
              ></i>
            </button>
          </div>
        </div>
        <nav className="sidebar-menu">
          <ul>
            <li>
              <i className="fa-solid fa-list"></i>
              <Link to="/quan-li-tin-dang">Quản lý tin đăng</Link>
            </li>
            <li>
            <i className="fa-solid fa-pen-to-square"></i>
              <Link to="/dang-tin">Đăng tin</Link>
            </li>
            <li>
              <i className="fa-solid fa-calendar-days"></i>
              <Link to="/transaction-history">Lịch sử giao dịch</Link>
            </li>
            <li>
              <i className="fa-solid fa-user"></i>
              <Link to="/tai-khoan">Thông tin cá nhân</Link>
            </li>
            <li>
              <i className="fa-solid fa-lock"></i>
              <Link to="/doi-mat-khau">Đổi mật khẩu</Link>
            </li>
            <li>
              <i className="fa-solid fa-bell"></i>
              <Link to="/notifications">Thông báo</Link>
            </li>
            <li>
              <i className="fa-solid fa-suitcase"></i>
              <Link to="/pricing">Bảng giá dịch vụ</Link>
            </li>
            <li>
              <i className="fa-solid fa-circle-question"></i>
              <Link to="/support">Liên hệ & trợ giúp</Link>
            </li>
            <li>
              <i className="fa-solid fa-right-from-bracket"></i>
              <button className="logout-btn" onClick={handleLogout} >Đăng xuất</button>
            </li>
          </ul>
        </nav>
      </aside>

    </div>
  )
}