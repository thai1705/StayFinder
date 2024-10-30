import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../../../css/Account.css'; // Xóa bớt đuôi .css lặp lại

export default function Account() {
  const PersonalInfoForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        accountCode: "",
        phone: "",
        email: "",
        profileImage: null,
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleImageChange = (e) => {
        setFormData({ ...formData, profileImage: URL.createObjectURL(e.target.files[0]) });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Xử lý lưu dữ liệu ở đây
      };

    return (
      <div className="listnewform">
             <aside className="sidebar">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar"></div>
            <div className="profile-name">Nguyen van A</div>
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
              <span>Mã tài khoản</span>
              <div className="account-code">
                <span>#PS33630</span>
                <button className="copy-button"> <i class="fa-regular fa-copy"></i></button>
              </div>
            </div>

            <button className="buy-button">Mua Tin</button>
          </div>
        </div>
        <nav className="sidebar-menu">
          <ul>
            <li>
              <i class="fa-solid fa-list"></i>
              <Link to="/quan-li-tin-dang">Quản lý tin đăng</Link>
            </li>
            <li>
              <i class="fa-solid fa-list"></i>
              <Link to="/quan-li-up-tin-tu-dong">Quản lý up tin tự động</Link>
            </li>
            <li>
              <i class="fa-solid fa-pen-to-square"></i>
              <Link to="/dang-tin">Đăng tin</Link>
            </li>
            <li>
              <i class="fa-solid fa-calendar-days"></i>
              <Link to="/transaction-history">Lịch sử giao dịch</Link>
            </li>
            <li>
              <i class="fa-solid fa-user"></i>
              <Link to="/tai-khoan">Thông tin cá nhân</Link>
            </li>
            <li>
              <i class="fa-solid fa-lock"></i>
              <Link to="/doi-mat-khau">Đổi mật khẩu</Link>
            </li>
            <li>
              <i class="fa-solid fa-bell"></i>
              <Link to="/notifications">Thông báo</Link>
            </li>
            <li>
              <i class="fa-solid fa-suitcase"></i>
              <Link to="/pricing">Bảng giá dịch vụ</Link>
            </li>
            <li>
              <i class="fa-solid fa-circle-question"></i>
              <Link to="/support">Liên hệ & trợ giúp</Link>
            </li>
            <hr />
            <li>
              <i class="fa-solid fa-right-from-bracket"></i>
              <Link to="/support">Đăng xuất</Link>
            </li>
          </ul>
        </nav>
      </aside>

        <div className="listnewform">
      <form className="personal-info-form" onSubmit={handleSubmit}>
        <h2>THÔNG TIN CÁ NHÂN</h2> <hr/>
        <div className="image-upload">
          <label htmlFor="file-input">
            {formData.profileImage ? (
              <img src={formData.profileImage} alt="Profile" className="uploaded-image" />
            ) : (
              <div className="upload-placeholder">
                <i className="fa fa-camera"></i>
                <span>Tải ảnh</span>
              </div>
            )}
          </label>
          <input id="file-input" type="file" onChange={handleImageChange} style={{ display: 'none' }} />
        </div>
        <div className="form-group">
          <label>Họ và tên</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Mã tài khoản</label>
          <input type="text" name="accountCode" value={formData.accountCode} onChange={handleChange} />
        </div>
        <h2>THÔNG TIN LIÊN HỆ</h2>
        <div className="form-group">
          <label>Số điện thoại</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <button type="submit">Lưu thay đổi</button>
      </form>
    </div>
      </div>
    );
  };

  return <PersonalInfoForm />;
}
