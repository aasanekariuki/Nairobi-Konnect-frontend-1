// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import './Login.css'; // Make sure the path is correct

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Here you would typically handle the login logic (e.g., API call)
        setMessage('Login successful!'); // Replace with actual success message
    };

    return (
        <div className="login-page">
            <div className="frame-container">
                <div className="login-form-container">
                    <h2 className="login-title">Login</h2>
                    <form onSubmit={handleLogin} className="login-form">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="login-button">Login</button>
                        {message && <p className="login-message">{message}</p>}
                    </form>
                    <div className="forgot-password">
                        <button className="forgot-password-button">Forgot Password?</button>
                    </div>
                </div>
                <div className="side-text">
                    <div>
                        <h3>Welcome Back</h3>
                        <p>Discover a seamless login experience with our modern and secure platform. Connect effortlessly and access your account with ease.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
