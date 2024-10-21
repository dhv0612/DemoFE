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
        <header>
        </header>
    );
};

export default Header;
