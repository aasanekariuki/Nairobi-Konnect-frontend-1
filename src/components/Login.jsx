import React, { useState } from 'react';
import axios from 'axios';
import { z, ZodError } from 'zod';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

// Define the validation schema
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Validate input
            loginSchema.parse({ email, password });

            // Make API call
            const response = await axios.post('/api/login', { email, password });

            // Handle successful login
            setMessage('Login successful!');
            setError('');
        } catch (err) {
            if (err instanceof ZodError) {
                // Handle validation errors
                setError(err.errors.map(error => error.message).join(', '));
                setMessage('');
            } else if (err.response) {
                // Handle API errors
                setError(`Login failed: ${err.response.data.message}`);
                setMessage('');
            } else {
                // Handle unknown errors
                setError('An unknown error occurred');
                setMessage('');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-custom-blue">
            <div className="relative flex w-full max-w-6xl h-4/5 bg-black bg-opacity-50 rounded-lg shadow-lg overflow-hidden">
                <div className="w-1/2 p-8 flex flex-col items-center justify-center bg-gray-800 bg-opacity-90 rounded-l-lg">
                    <h2 className="text-3xl font-bold text-white mb-6 relative group">
                        Login
                        <span className="block w-16 h-1 bg-blue-600 mt-2 mx-auto transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </h2>
                    <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
                        <div className="flex items-center border-2 border-gray-600 rounded-lg bg-gray-900">
                            <i className="fas fa-envelope text-gray-400 p-3"></i>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-transparent text-white placeholder-gray-400 outline-none flex-1 p-3"
                                required
                            />
                        </div>
                        <div className="flex items-center border-2 border-gray-600 rounded-lg bg-gray-900">
                            <i className="fas fa-lock text-gray-400 p-3"></i>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-transparent text-white placeholder-gray-400 outline-none flex-1 p-3"
                                required
                            />
                        </div>
                        <button type="submit" className="py-3 px-6 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105">
                            Login
                        </button>
                        {message && <p className="text-green-400 text-lg font-medium mt-4">{message}</p>}
                        {error && <p className="text-red-500 text-lg font-medium mt-4">{error}</p>}
                    </form>
                    <button className="mt-4 text-blue-400 hover:text-blue-300 underline">Forgot Password?</button>
                </div>
                <div className="w-1/2 bg-cover bg-center rounded-r-lg" style={{ backgroundImage: 'url(https://ilovenbo.com/wp-content/uploads/2023/12/pexels-antony-trivet-13348192.jpg)' }}>
                    <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50 text-white p-8">
                        <h3 className="text-3xl font-semibold mb-4">Welcome Back</h3>
                        <p className="text-lg text-center">Discover a seamless login experience with our modern and secure platform. Connect effortlessly and access your account with ease.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
