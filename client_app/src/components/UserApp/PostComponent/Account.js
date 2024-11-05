import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../css/Account.css"; 
import Menu from "./Menu";


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
      setFormData({
        ...formData,
        profileImage: URL.createObjectURL(e.target.files[0]),
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
      // Xử lý lưu dữ liệu ở đây
    };

    return (
      <div className="listnewform">
      <aside>
        <Menu />
      </aside> 

        <div className="listnewform-left">
          <form className="personal-info-form" onSubmit={handleSubmit}>
            <h2>THÔNG TIN CÁ NHÂN</h2> <hr />
            <div className="image-upload">
              <label htmlFor="file-input">
                {formData.profileImage ? (
                  <img
                    src={formData.profileImage}
                    alt="Profile"
                    className="uploaded-image"
                  />
                ) : (
                  <div className="upload-placeholder">
                    <i className="fa fa-camera"></i>
                    <span>Tải ảnh</span>
                  </div>
                )}
              </label>
              <input
                id="file-input"
                type="file"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
            <div className="form-group">
              <label>Họ và tên</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Mã tài khoản</label>
              <input
                type="text"
                name="accountCode"
                value={formData.accountCode}
                onChange={handleChange}
              />
            </div>
            <h2>THÔNG TIN LIÊN HỆ</h2>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <button className="save-btn" type="submit">Lưu thay đổi</button>
          </form>
        </div>
      </div>
    );
  };

  return <PersonalInfoForm />;
}