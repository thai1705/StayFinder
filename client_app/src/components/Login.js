import '../css/Login.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful:', data);
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                navigate('/'); 
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Đã xảy ra lỗi trong quá trình đăng nhập.');
        }
    };

    return (
        <div className="login-container">
            <form className="login" onSubmit={handleSubmit}>
                <div className="column column--bg">
                    <div className="headerpro">
                        <div className="logo-pro">
                            <Link to={'/'}>
                                <img className="img-header" src="/images/logo-removebg-preview.png" alt="" />
                            </Link>
                        </div>
                    </div>
                    <img className="bg-img" src="https://codetheworld.io/wp-content/uploads/2024/03/tokyo.jpg" alt="" />
                </div>
                <div className="column">
                    <div className="logo-container">
                        <Link to={'/'}>
                            <img src="/images/logo-removebg-preview.png" alt="Logo" className="logopro" />
                        </Link>
                    </div>

                    <div className="form-btnn">
                        <div className="form-login">Đăng nhập</div>
                        <div className="form-loginpro">Nếu bạn đã có một tài khoản hãy đăng nhập ngay bây giờ</div>
                        <div className="form-page">
                            <div className="segmented">
                                <Link className='segmented-btn background-btn' aria-selected="true">Đăng nhập</Link>
                                <Link to={'/dang-ky'} className="segmented-btn">Đăng ký</Link>
                            </div>

                            <div className="field padding-field">
                                <input
                                    placeholder="Email"
                                    className="input-textbox"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="field top-field">
                                <input
                                    placeholder="Mật khẩu"
                                    className="input-textbox"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {errorMessage && <div className="error-message">{errorMessage}</div>}
                            <div className="or-pass">Quên mật khẩu?</div>

                            <button className="btn" type="submit">Đăng nhập</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
