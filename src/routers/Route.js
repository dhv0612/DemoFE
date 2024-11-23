import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login/Login';
import Home from '../pages/Home/Home';
import AdminLayout from '../components/Layout/AdminLayout';
import CustomerList from '../pages/Customers/CustomerList';
import CustomerForm from '../pages/Customers/CustomerForm'; // Import CustomerForm

const AppRoutes = ({ setToken, username }) => {
    const token = localStorage.getItem('token');

    return (
        <Routes>
            <Route path="/login" element={<Login setToken={setToken} />} />
            {token && (
                <Route path="/" element={<AdminLayout setToken={setToken} />}>
                    <Route index element={<Home token={token} setToken={setToken} username={username} />} />
                    <Route path="customer" element={<CustomerList />} />
                    <Route path="customer/add" element={<CustomerForm />} /> {/* Thêm */}
                    <Route path="customer/edit/:id" element={<CustomerForm isEditMode={true} />} /> {/* Sửa */}
                </Route>
            )}
        </Routes>
    );
};

export default AppRoutes;
