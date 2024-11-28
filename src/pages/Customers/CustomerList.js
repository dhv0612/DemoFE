import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Box } from '@mui/material';
import customerService from "../../service/customerService";

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch customer data
    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            console.log(1);
            const response = await customerService.getAllCustomers();
            setCustomers(response);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch customers", error);
        }
    };

    const handleDelete = async (customerId) => {
        try {
            await customerService.deleteCustomer({customerId});
            setCustomers(customers.filter(customer => customer.id !== customerId));
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    return (
        <Box>
            <Button variant="contained" color="primary" href="/customer/add">
                Thêm Khách Hàng
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Tên</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Điện Thoại</TableCell>
                        <TableCell>Hành Động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers.map((customer) => (
                        <TableRow key={customer.id}>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.phone_number}</TableCell>
                            <TableCell>
                                <Button href={`/customer/edit/${customer.id}`} color="primary">Sửa</Button>
                                <Button onClick={() => handleDelete(customer.id)} color="secondary">Xóa</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default CustomerList;
