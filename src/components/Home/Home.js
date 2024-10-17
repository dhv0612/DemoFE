import React from 'react';
import Header from '../Header/Header';
import { jwtDecode } from 'jwt-decode';

const Home = ({ token, setToken }) => {
    const decodedToken = jwtDecode(token);

    return (
        <div>
            <Header user={decodedToken} setToken={setToken} />
            <h1>Chào mừng đến với trang chính!</h1>
        </div>
    );
};

export default Home;
