import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
function Header() {
  return (
    <header >
    <div className="Header">
      <Link to={'/'}>  <img width="145px" height="120px" style={{marginRight: "20px"}} src="/images/logo-removebg-preview.png" alt="" /> </Link>
        <div className="Header-link">
            <Link to={"/cho-thue-phong-tro"}>Cho thuê phòng trọ</Link>
            <Link to={"/cho-thue-can-ho"}>Cho thuê căn hộ</Link>
            <Link to={"/cho-thue-nha-o"}>Cho thuê nhà ở</Link>
            <Link to={"/tim-nguoi-o-ghep"}>Tìm người ở ghép</Link>
            <Link to={"/tin-tuc"}>Tin Tức</Link>
        </div>

        <div className="Header-heart">
        <FontAwesomeIcon icon={faHeart} />
        </div>

        <div className="Header-link-login">
            <Link to={"/dang-nhap"}>Đăng nhập</Link>
        </div>
        <p style={{marginLeft: "5px", marginRight: "5px", marginTop:'15px '}}>|</p>

        <div className="Header-link-login">
        <Link to={"/dang-ky"}>Đăng ký</Link>

        </div>

        <div className="Header-link-dangtin">
            <Link to="/dang-tin">Đăng tin</Link>
        </div>

    </div>

</header>
  )
}

export default Header