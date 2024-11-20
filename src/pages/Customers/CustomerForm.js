import React, { useEffect, useState } from 'react';
import { addCustomer, updateCustomer, getCustomers } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const CustomerForm = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchCustomer(id);
        }
    }, [id]);

    const fetchCustomer = async (id) => {
        try {
            const response = await getCustomers(id);
            setName(response.data.name);
            setEmail(response.data.email);
        } catch (error) {
            console.error("Failed to fetch customer", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, email };

        try {
            if (id) {
                await updateCustomer(id, data);
            } else {
                await addCustomer(data);
            }
            navigate('/');
        } catch (error) {
            console.error("Failed to save customer", error);
        }
    };

    return (
        <div>
            <h1>{id ? 'Edit' : 'Add'} Customer</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default CustomerForm;
