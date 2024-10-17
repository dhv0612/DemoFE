import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login/Login';
import Home from '../components/Home/Home';

const AppRoutes = ({ setToken, username }) => {
    const token = localStorage.getItem('token');

    return (
        <Routes>
            <Route path="/login" element={<Login setToken={setToken} />} /> {}
            <Route
                path="/"
                element={token ? <Home token={token} setToken={setToken} username={username} /> : <Navigate to="/login" />}
            />
        </Routes>
    );
};

export default AppRoutes;
