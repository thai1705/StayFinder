import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
function Header() {
  return (
    <header >
    <div className="Header">
      <Link to={'/'}>  <img width="145px" height="auto" style={{marginRight: "20px"}} src="/images/logo-removebg-preview.png" alt="" /> </Link>
        <div className="Header-link">
            <Link to={"/cho-thue-phong-tro"}>Cho thuê phòng trọ</Link>
            <Link to={"/cho-thue-can-ho"}>Cho thuê căn hộ</Link>
            <Link to={"/cho-thue-nha-o"}>Cho thuê nhà ở</Link>
            <Link to={"/tim-nguoi-o-ghep"}>Tìm người ở ghép</Link>
            <Link to={"/tin-tuc"}>Tin Tức</Link>
            <Link to={"/gioi-thieu"}>Về chúng tôi</Link>
        </div>

        <div className='Header-jtf'>
          <div className="Header-heart">
          <FontAwesomeIcon icon={faHeart} />
          </div>
          <Link className='header-login' to={"/dang-nhap"}>
          <div className="Header-link-login">
              <div>Đăng nhập</div>
          </div>
          </Link>
          <p style={{marginLeft: "5px", marginRight: "5px", marginTop:'6px '}}>|</p>

          <Link className='header-login' to={"/dang-ky"}>
          <div className="Header-link-login">
              <div>Đăng ký</div>
          </div>
          </Link>
          <Link className='header-login' to="/dang-tin">
          <div className="Header-link-dangtin">
              <div className='Header-dangtin'>Đăng tin</div>
          </div>
          </Link>

      </div>
      </div>

</header>
  )
}

export default Header