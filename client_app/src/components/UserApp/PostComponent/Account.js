import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../css/Account.css";
import "../../../css/Account.css";
import Menu from "./Menu";

export default function Account() {
  const PersonalInfoForm = () => {
    const [formData, setFormData] = useState({
      username: "",
      username: "",
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
        profileImage: e.target.files[0], 
        
        profileImage: e.target.files[0], 
        
      });
    };

    
    const handleSubmit = async (e) => {
      e.preventDefault();

      const formDataToSend = new FormData(); 

      formDataToSend.append("username", formData.username);
      formDataToSend.append("accountCode", formData.accountCode);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("email", formData.email);

      if (formData.profileImage) {
        formDataToSend.append("avatar", formData.profileImage); 
      }

      try {
        const response = await fetch('http://localhost:8000/api/auth/update', {
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
          },
          body: formDataToSend,
        });

        const result = await response.json();

        if (response.ok) {
          alert("Cập nhật thông tin thành công!");
          window.location.reload();
          console.log(result.user); 

        } else {
          alert(`Lỗi: ${result.message}`);
        }
      } catch (error) {
        console.error("Có lỗi xảy ra khi cập nhật thông tin:", error);
      }
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
                    
                    src={URL.createObjectURL(formData.profileImage)}
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
                name="username"
                value={formData.username}
              
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
            <button className="save-btn" type="submit">
              Lưu thay đổi
            </button>
            <button className="save-btn" type="submit">
              Lưu thay đổi
            </button>
          </form>
        </div>
      </div>
    );
  };

  return <PersonalInfoForm />;
}
