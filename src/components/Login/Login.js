import React, { useState } from 'react';
import './Login.css';
import { loginUser } from './LoginService';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await loginUser(email, password);
            setToken(token);
            localStorage.setItem('token', token);
            navigate(ROUTES.HOME);
        } catch (error) {
            console.error("Login failed", error);
            setError("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.");
        }
    };

    return (
        <div className="login-container">
            <h1>Đăng Nhập</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="login-input"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu"
                    required
                    className="login-input"
                />
                <button type="submit" className="login-button">Đăng Nhập</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default Login;
