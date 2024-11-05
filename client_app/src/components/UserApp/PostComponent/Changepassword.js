
import { Link } from "react-router-dom";
import "../../../css/Changepassword.css";
import Menu from "./Menu";
export default function Changepassword() {
  return (
    <div className="listnewform">
      <aside>
        <Menu />
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
