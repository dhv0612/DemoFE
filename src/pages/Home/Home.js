import React from 'react';
import { jwtDecode } from 'jwt-decode';
import Header from '../../components/Header/Header.js'

const Home = ({ token, setToken }) => {
    let username = '';
    if (token && typeof token === 'string') {
        try {
            const decodedToken = jwtDecode(token);
            username = decodedToken.name;
            console.log(username);
        } catch (error) {
            console.error('Token decoding failed', error);
        }
    }

    return (
        <div>  
            <Header user={username} setToken={setToken} />
            <h1>Chào mừng đến với trang chính! {username} </h1>
        </div>
    );
}
export default Home;
