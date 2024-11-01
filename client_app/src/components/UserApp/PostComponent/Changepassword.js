
import { Link } from "react-router-dom";
import "../../../css/Changepassword.css";

export default function Changepassword() {
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

      <div className="password-change-container">
        <h2>ĐỔI MẬT KHẨU</h2>
        <div className="form-group">
          <label>Mật khẩu hiện tại</label>
          <input type="password" placeholder="Mật khẩu hiện tại" />
        </div>
        <div className="form-group">
          <label>Mật khẩu mới</label>
          <input type="password" placeholder="Mật khẩu mới" />
        </div>
        <div className="form-group">
          <label>Nhập lại mật khẩu mới</label>
          <input type="password" placeholder="Nhập lại mật khẩu mới" />
        </div>
        <div className="form-text">
          Mật khẩu tối thiểu 8 ký tự <br />
          Chứa ít nhất 1 ký tự viết hoa <br />
          Chứa ít nhất 1 ký tự đặc biệt
        </div>
        <button className="submit-button">Thay đổi</button>
        <div className="forgot-password">Quên mật khẩu?</div>
      </div>
    </div>
  );
}
