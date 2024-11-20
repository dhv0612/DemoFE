import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login/Login';
import Home from '../pages/Home/Home';
import AdminLayout from '../components/Layout/AdminLayout';
import CustomerList from '../pages/Customers/CustomerList'; // Import CustomerList

const AppRoutes = ({ setToken, username }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <Routes>
            {/* Route trang đăng nhập */}
            <Route path="/login" element={<Login setToken={setToken} />} />

            {/* Admin layout và các routes con */}
            <Route
                path="/"
                element={<AdminLayout setToken={setToken} />}
            >
                {/* Route Trang Chủ */}
                <Route
                    index
                    element={<Home token={token} setToken={setToken} username={username} />}
                />
                {/* Route Customer */}
                <Route path="customer" element={<CustomerList />} />
            </Route>

            {/* Redirect nếu route không tồn tại */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;
