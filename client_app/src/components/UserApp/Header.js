import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function Header() {
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

  return (
    <header>
      <div className="Header">
        <Link to={"/"}>
          <img
            width="145px"
            height="auto"
            style={{ marginRight: "20px" }}
            src="/images/logo-removebg-preview.png"
            alt="Logo"
          />
        </Link>
        <div className="Header-link">
          <Link to={"/cho-thue-phong-tro"}>Cho thuê phòng trọ</Link>
          <Link to={"/cho-thue-can-ho"}>Cho thuê căn hộ</Link>
          <Link to={"/cho-thue-nha-o"}>Cho thuê nhà ở</Link>
          <Link to={"/tim-nguoi-o-ghep"}>Tìm người ở ghép</Link>
          <Link to={"/tin-tuc"}>Tin Tức</Link>
          <Link to={"/gioi-thieu"}>Về chúng tôi</Link>
        </div>

        <div className="Header-jtf">
          <div className="Header-heart">
            <FontAwesomeIcon icon={faHeart} />
          </div>

          {username ? (
            <div className="header-username">
              <Link to={"/tai-khoan"}><span>Xin chào, {username}</span></Link>
              
            </div>
          ) : (

            <>
              <Link className="header-login" to={"/dang-nhap"}>
                <div className="Header-link-login">
                  <div>Đăng nhập</div>
                </div>
              </Link>
              <p
                style={{
                  marginLeft: "5px",
                  marginRight: "5px",
                  marginTop: "6px",
                }}
              >
                |
              </p>
              <Link className="header-login" to={"/dang-ky"}>
                <div className="Header-link-login">
                  <div>Đăng ký</div>
                </div>
              </Link>
            </>
          )}

          <Link className="header-login" to="/dang-tin">
            <div className="Header-link-dangtin">
              <div className="Header-dangtin">Đăng tin</div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
