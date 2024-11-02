import { Link } from 'react-router-dom';
import '../css/Resigter.css';
import React from 'react';


function Resigter() {
  return (
        <div class="login-container">
            <form class="login">
                <div class="column column--bg">
                    <div className="headerpro">
                        <div className="logo-pro">
                            <Link to={'/'}><img className="img-header" src="/images/logo-removebg-preview.png" alt=""/></Link>
                        </div>
                    </div>
                    <img class="bg-img" src="https://codetheworld.io/wp-content/uploads/2024/03/tokyo.jpg" alt=""/>
                </div>
                <div class="column">
                    
                    <div style={{ paddingTop: "159px"  }} class="logo-container">  
                    <Link to={'/'}><img className="logopro" src="/images/logo-removebg-preview.png" alt=""/></Link>
                    </div> 
                    <div class="form">
                        <div class="form_login">Đăng ký</div>
                        <div class="form-loginpro">Tạo một tài khoản để khám phá những ngôi nhà tuyệt vời của chúng tôi</div>
                        <div class="form-page">
                            <div class="segmented">
                                <Link to={'/dang-nhap'} class="segmented-btn"aria-selected="true">Đăng nhập</Link>
                                <Link to={'/dang-ky'} class="segmented-btn background-btn">Đăng ký</Link>
   
                            </div>
                            <div class="field padding-field">
                                <input placeholder="Tên người dùng" class="input-textbox" type="text" name="name"/>
                            </div>
                            <div class="field top-field">
                                <input placeholder="Email" class="input-textbox" type="email" name="email"/>
                            </div>
                            <div class="field top-field">
                                <input placeholder="Mật khẩu" class="input-textbox" type="password" name="password"/>
                            </div>
                            <div class="field top-field">
                                <input placeholder="Số điện thoại" class="input-textbox" type="text" name="phone"/>
                            </div>
                            <div class="or-pass">Bằng cách tạo tài khoản, bạn đồng ý với Điều kiện sử dụng và Chính sách quyền riêng tư của chúng tôi.</div>

                            <button class="btn" type="submit">Đăng ký</button>
                        </div>
                    </div>
                    
                </div>
                
            </form>
        </div>
  )
}

export default Resigter