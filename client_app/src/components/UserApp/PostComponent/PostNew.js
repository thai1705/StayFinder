import React, { useState } from "react";
import "../../../css/PostNew.css";
import { Link } from "react-router-dom";
import { Button } from "antd";
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';

export default function PostNew() {
  const [text, setText] = useState("#PS33630"); // Set giá trị mặc định


  const copy = () => {
    navigator.clipboard.writeText(text);
    alert("Đã sao chép mã tài khoản: " + text);
  };

  return (
    <div className="listnewform">
      <aside className="sidebar-tuyen">
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
            <div className="account-code">
                <div className="account-code-title">
                  <span>Mã tài khoản</span>
                </div>
                <div className="account-code-code">
                <span>#PS33630</span>
                <button className="copy-button" onClick={copy}>
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
              <i className="fa-solid fa-list"></i>
              <Link to="/quan-li-up-tin-tu-dong">Quản lý up tin tự động</Link>
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
            <hr />
            <li>
              <i className="fa-solid fa-right-from-bracket"></i>
              <Link to="/logout">Đăng xuất</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="post-form">
        <h3>THÔNG TIN</h3>
        <div className="form-filter">
          <div className="form-group">
            <label htmlFor="city">Tỉnh/thành phố *</label>
            <input
              className="input-bgr"
              type="text"
              id="city"
              name="city"
              placeholder="Chọn tỉnh/thành phố..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="district">Quận/huyện *</label>
            <input
              className="input-bgr"
              type="text"
              id="district"
              name="district"
              placeholder="Chọn quận/huyện..."
            />
          </div>

       

          <div className="form-group">
            <label htmlFor="address">Địa chỉ chính xác</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Nhập địa chỉ chính xác..."
            />
          </div>
        </div>

        <div className="form-filter">
          <div className="form-group">
            <label htmlFor="category">Chuyên mục cho thuê *</label>
            <select id="category" name="category">
              <option value="">Chọn chuyên mục</option>
              <option value="phong-tro">Cho thuê phòng trọ ghép</option>
              <option value="can-ho">Cho thuê căn hộ</option>
              <option value="nha-o">Cho thuê nhà ở</option>
              <option value="ghep">Tìm người ở ghép</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Giá *</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Nhập giá (triệu/tháng)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="areaSize">Diện tích</label>
            <input
              type="number"
              id="areaSize"
              name="areaSize"
              placeholder="Nhập diện tích (m²)"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="title">Tiêu đề *</label>
          <input
            type="text"
            id="title"
            name="title"
            maxLength="150"
            placeholder="Nhập tiêu đề tin..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Mô tả *</label>
          <ReactQuill   
            className="reactquill-description"
            id="description"
            name="description"
            maxLength="5000" 
            modules={{  
              toolbar: [  
                [{ header: [1, 2, false] }],  
                ['bold', 'italic', 'underline'],  
                [{ list: 'ordered'}, { list: 'bullet' }],   
                ['blockquote', 'code-block'],
                [{ font: [] }],
                [{ color: [] }, { background: [] }],
                ['link', 'unlink'],
                [{ align: [] }],
                [{ list: 'check' }],
                ['image','video'],  
                ['clean']   
              ],  
            }}   
          />  
        </div>

        <div className="form-group">
          <label htmlFor="images">Hình ảnh</label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
          />
          <p>Tối đa 6 ảnh với tin thường và 16 ảnh với tin VIP.</p>
        </div>

        <div className="form-group">
          <label htmlFor="youtube">Youtube</label>
          <input
            type="text"
            id="youtube"
            name="youtube"
            placeholder="Nhập link Youtube"
          />
        </div>

        <h3>Liên hệ</h3>
        <div className="form-group">
          <label htmlFor="contactName">Tên *</label>
          <input
            type="text"
            id="contactName"
            name="contactName"
            defaultValue="Tuyến Nguyễn"
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactPhone">Số điện thoại *</label>
          <input
            type="text"
            id="contactPhone"
            name="contactPhone"
            placeholder="Nhập số điện thoại..."
          />
        </div>

        <h3>Chọn gói đăng tin</h3>
        <div className="form-group">
          <label htmlFor="adType">Loại tin *</label>
          <select id="adType" name="adType">
            <option value="vip1">Tin Vip 1 (30.000/ngày)</option>
            <option value="vip2">Tin Vip 2 (20.000/ngày)</option>
            <option value="thuong">Tin thường (10.000/ngày)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="duration">Số ngày *</label>
          <input
            type="number"
            id="duration"
            name="duration"
            placeholder="Nhập số ngày đăng..."
          />
        </div>
        <div className="payment-form">
          <h3>Thông tin thanh toán</h3>
          <div className="payment-details">
            <div className="payment-row">
              <span className="payment-row-padding-right">Loại tin:</span>
              <span>Vip</span>
            </div>
            <div className="payment-row">
              <span className="payment-row-padding-right">Đơn giá:</span>
              <span>100.000đ</span>
            </div>
            <div className="payment-row">
              <span className="payment-row-padding-right">Ngày đăng:</span>
              <span>22-12-2024</span>
            </div>
            <div className="payment-row">
              <span className="payment-row-padding-right">Ngày hết hạn:</span>
              <span>24-12-2024</span>
            </div>
            <div className="payment-row payment-row-none">
              <span className="payment-row-padding-right">Thành tiền:</span>
              <span>100.000đ</span>
            </div>
          </div>
          <button className="payment-button">Đăng tin và thanh toán</button>
        </div>
      </div>
    </div>
  );
}