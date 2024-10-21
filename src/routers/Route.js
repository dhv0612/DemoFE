import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login/Login';
import Home from '../pages/Home/Home';
import AdminLayout from '../components/Layout/AdminLayout';

const AppRoutes = ({ setToken, username }) => {
    const token = localStorage.getItem('token');

    return (
        <Routes>
            <Route path="/login" element={<Login setToken={setToken} />} />
            
            <Route 
                path="/" 
                element={
                    token ? (
                        <AdminLayout setToken={setToken}>
                            <Home token={token} setToken={setToken} username={username} />
                        </AdminLayout>
                    ) : (
                        <Navigate to="/login" />
                    )
                } 
            />
        </Routes>
    );
};

export default AppRoutes;
