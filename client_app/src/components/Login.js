import '../css/Login.css';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Login() {
    const [isLoginForm, setIsLoginForm] = useState(true);

    const handleToggleForm = () => {  
        setIsLoginForm(!isLoginForm);
    };  

    return (
            <div className="login-container">
                <form className="login">
                    <div className="column column--bg">
                        <div className="headerpro">
                            <div className="logo-pro">
                                <Link to={'/'}><img className="img-header" src="/images/logo-removebg-preview.png" alt=""/></Link>
                            </div>
                        </div>
                        <img className="bg-img" src="https://codetheworld.io/wp-content/uploads/2024/03/tokyo.jpg" alt=""/>
                    </div>
                    <div className="column">
                        
                        <div className="logo-container">  
                            <Link to={'/'}><img src="/images/logo-removebg-preview.png" alt="Logo" className="logopro"/></Link>  
                        </div> 

                        <div className="form-btnn">
                            <div className="form-login">Đăng nhập</div>
                            <div className="form-loginpro">Nếu bạn đã có một tài khoản hãy đăng nhập ngay bây giờ</div>
                            <div className="form-page">
                                <div className="segmented">
                                        <Link className='segmented-btn background-btn'  aria-selected="true">Đăng nhập</Link>

                                        <Link to={'/dang-ky'} className="segmented-btn" >Đăng ký</Link>

                                    {/* <div className="segmented-focus"></div> */}
                                </div>

                                <div className="field padding-field">
                                    <input placeholder="Email" className="input-textbox" type="email" name="email"/>
                                </div>
                                <div className="field top-field">
                                    <input placeholder="Mật khẩu" className="input-textbox" type="password" name="password"/>
                                </div>
                                <div className="or-pass">Quên mật khẩu?</div>

                                <button className="btn" type="submit">Đăng nhập</button>
                            </div>
                        </div>
                        
                    </div>
                    
                </form>
            </div>
    )
}

export default Login