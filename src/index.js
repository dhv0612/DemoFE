import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // Thêm import BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter> {/* Bọc App trong BrowserRouter */}
        <App />
    </BrowserRouter>
);

reportWebVitals();
