import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { API_ROUTES } from '../../api';
import customerService from "../../service/customerService";

const CustomerForm = ({ isEditMode = false, customerData = {} }) => {
    const [formData, setFormData] = useState({
        name: customerData.name || '',
        email: customerData.email || '',
        phone_number: customerData.phone_number || '',
        balance: customerData.balance || '', // Thêm balance vào form data
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams(); // Lấy ID khách hàng nếu đang sửa

    // Load customer data for edit mode
    useEffect(() => {
        if (isEditMode && id) {
            fetchCustomer(id);
        }
    }, [isEditMode, id]);

    const fetchCustomer = async (id) => {
        setLoading(true);
        try {
            const response = await customerService.getCustomer(id);
            setFormData(response);
        } catch (error) {
            console.error('Failed to fetch customer data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEditMode) {
                await customerService.updateCustomer(id, formData);
            } else {
                await customerService.addCustomer(formData);
            }
            navigate(API_ROUTES.CUSTOMERS); // Redirect to customer list
        } catch (error) {
            console.error('Failed to submit form:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', justifyContent: 'center', padding: 3 }}>
            <Paper elevation={3} sx={{ width: '100%', maxWidth: 600, padding: 4 }}>
                <Typography variant="h4" gutterBottom align="center">
                    {isEditMode ? 'Cập Nhật Khách Hàng' : 'Thêm Khách Hàng'}
                </Typography>

                {loading ? (
                    <Typography variant="h6" align="center">Đang tải...</Typography>
                ) : (
                    <>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Tên"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email"
                                    fullWidth
                                    required
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Số điện thoại"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    type="number"
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Số dư"
                                    name="balance"
                                    value={formData.balance}
                                    onChange={handleChange}
                                    type="number" // Loại số cho balance
                                    fullWidth
                                    required
                                    variant="outlined"
                                    inputProps={{ min: 0 }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ padding: 1.5 }}
                                >
                                    {isEditMode ? 'Cập Nhật' : 'Thêm'}
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default CustomerForm;
