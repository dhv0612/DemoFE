import React, { useState } from 'react';
import './Header.css';
import { ROUTES } from '../../routes';

const Header = ({ user, setToken }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
        window.location.href = ROUTES.LOGIN;
    };

    return (
        <header className="header">
            <h1 className="username">{user.name} - {user.email}{}</h1>
            <div className="dropdown">
                <button onClick={() => setMenuOpen(!isMenuOpen)} className="dropdown-button">
                    Menu
                </button>
                {isMenuOpen && (
                    <div className="dropdown-menu">
                        <button onClick={handleLogout} className="logout-button">Đăng Xuất</button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
