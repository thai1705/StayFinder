import React from "react";
import { Link } from "react-router-dom";
import "../../../css/ManagerPost.css";

export default function ManagerPost() {
  const data = [
    { id: 1, loaiTin: 'Thường', tieuDe: 'Cho thuê phòng trọ 436B/76 đường 3/2...', anh: 'Ảnh', ngayDang: '28/09/2024', ngayHetHan: '28/10/2024', trangThai: 'Đang hiển' },
    { id: 2, loaiTin: 'Mới', tieuDe: 'Cho thuê phòng trọ 436B/76 đường 3/2...', anh: 'Ảnh', ngayDang: '28/09/2024', ngayHetHan: '28/10/2024', trangThai: 'Đang ẩn' },
    { id: 3, loaiTin: 'Nổi bật', tieuDe: 'Cho thuê phòng trọ 436B/76 đường 3/2...', anh: 'Ảnh', ngayDang: '28/09/2024', ngayHetHan: '28/10/2024', trangThai: 'Đang hiển' },
    { id: 4, loaiTin: 'Thường', tieuDe: 'Cho thuê phòng trọ 436B/76 đường 3/2...', anh: 'Ảnh', ngayDang: '28/09/2024', ngayHetHan: '28/10/2024', trangThai: 'Đang hiển' },
  ];

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
                <button className="copy-button">
                  <i className="fa-regular fa-copy"></i>
                </button>
                </div>
              </div>
            </div>

            <button className="buy-button">Mua Tin</button>
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
      
      <div className="data-table">
      <div className="filter-section">
        <input type="text" placeholder="Tìm theo ngày đăng" />
        <input type="text" placeholder="Tìm theo danh mục" />
        <input type="text" placeholder="Tìm theo loại tin" />
      </div>
      <div className="tab-section">
        <span className="active-tab">Tất cả (4)</span>
        <span>Đã cho thuê (0)</span>
        <span>Đang hiển thị (4)</span>
        <span>Sắp hết hạn (0)</span>
        <span>Hết hạn (0)</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Loại tin</th>
            <th>Tiêu đề</th>
            <th>Ảnh</th>
            <th>Ngày đăng</th>
            <th>Ngày hết hạn</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.loaiTin}</td>
                <td>{item.tieuDe}</td>
                <td>{item.anh}</td>
                <td>{item.ngayDang}</td>
                <td>{item.ngayHetHan}</td>
                <td>{item.trangThai}</td>
                <td>⋮</td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
    </div>
  );
}
