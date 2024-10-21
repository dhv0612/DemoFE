import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Chú ý sửa lại import cho jwtDecode
import { Box, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Button } from '@mui/material';
import axios from 'axios';
import { ROUTES } from '../../routes';

const drawerWidth = 240;

const AdminLayout = ({ children, setToken }) => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUsername(decodedToken.name); // Lấy tên người dùng từ token
        }
    }, []);

    const handleLogout = async () => {
        const token = localStorage.getItem('token');

        try {
            // Gọi API logout
            await axios.post('http://localhost:8000/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}` // Truyền token trong header
                }
            });

            // Sau khi logout thành công, xóa token và chuyển hướng
            setToken(null);
            localStorage.removeItem('token');
            window.location.href = ROUTES.LOGIN;
        } catch (error) {
            console.error("Logout failed", error);
            // Xử lý lỗi nếu cần, ví dụ: thông báo lỗi cho người dùng
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        {username}
                    </Typography>
                    <Button color="inherit" onClick={handleLogout} sx={{ ml: 'auto' }}>
                        Đăng xuất
                    </Button>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
                }}
                variant="permanent"
                anchor="left"
            >
                <List>
                    {['Trang chủ', 'Quản lý giao dịch', 'Quản lý người dùng', 'Báo cáo'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginLeft: `${drawerWidth}px` }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default AdminLayout;
