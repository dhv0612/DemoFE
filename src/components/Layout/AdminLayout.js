import React, { useState, useEffect } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Outlet } from 'react-router-dom'; // Thêm Outlet

const drawerWidth = 240;

const AdminLayout = ({ setToken }) => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUsername(decodedToken.name);
        }
    }, []);

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
        window.location.href = '/login';
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
                    <ListItem button component="a" href="/">
                        <ListItemText primary="Trang chủ" />
                    </ListItem>
                    <ListItem button component="a" href="/customer">
                        <ListItemText primary="Quản lý khách hàng" />
                    </ListItem>
                </List>
            </Drawer>

            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                <Outlet /> {/* Render các route con */}
            </Box>
        </Box>
    );
};

export default AdminLayout;
