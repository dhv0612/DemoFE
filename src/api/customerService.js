import axiosInstance from './axiosInstance';

const customerService = {
    getAllCustomers: async () => {
        const response = await axiosInstance.get('/customers');
        return response.data;
    },

    addCustomer: async (customer) => {
        const response = await axiosInstance.post('/customers', customer);
        return response.data;
    },

    updateCustomer: async (id, customer) => {
        const response = await axiosInstance.put(`/customers/${id}`, customer);
        return response.data;
    },

    deleteCustomer: async (id) => {
        const response = await axiosInstance.delete(`/customers/${id}`);
        return response.data;
    },
};

export default customerService;
