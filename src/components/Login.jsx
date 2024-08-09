import React, { useState } from 'react';
import axios from 'axios';
import { z, ZodError } from 'zod';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import './Login.css';

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
            loginSchema.parse({ email, password });
            const response = await axios.post('/api/login', { email, password });
            setMessage('Login successful!');
            setError('');
        } catch (err) {
            if (err instanceof ZodError) {
                setError(err.errors.map(error => error.message).join(', '));
                setMessage('');
            } else if (err.response) {
                setError(`Login failed: ${err.response.data.message}`);
                setMessage('');
            } else {
                setError('An unknown error occurred');
                setMessage('');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-custom-blue">
            <div className="relative flex w-full max-w-7xl h-screen md:h-4/5 lg:h-[80vh] xl:h-[85vh] bg-black bg-opacity-50 rounded-lg shadow-lg overflow-hidden">
                <div className="w-full md:w-2/3 lg:w-3/5 xl:w-2/3 p-12 lg:p-16 flex flex-col items-center justify-center bg-gray-800 bg-opacity-90 rounded-l-lg">
                    <h2 className="text-5xl lg:text-4xl font-bold text-white mb-8 relative group">
                        Login
                        <span className="block w-24 lg:w-20 h-1 bg-blue-600 mt-2 mx-auto transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </h2>
                    <form onSubmit={handleLogin} className="w-full flex flex-col gap-6">
                        <div className="flex items-center border-2 border-gray-600 rounded-lg bg-gray-900">
                            <i className="fas fa-envelope text-gray-400 p-4"></i>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-transparent text-white placeholder-gray-400 outline-none flex-1 p-4 text-lg"
                                required
                            />
                        </div>
                        <div className="flex items-center border-2 border-gray-600 rounded-lg bg-gray-900">
                            <i className="fas fa-lock text-gray-400 p-4"></i>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-transparent text-white placeholder-gray-400 outline-none flex-1 p-4 text-lg"
                                required
                            />
                        </div>
                        <button type="submit" className="py-4 px-8 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105">
                            Login
                        </button>
                        {message && <p className="text-green-400 text-xl font-medium mt-6">{message}</p>}
                        {error && <p className="text-red-500 text-xl font-medium mt-6">{error}</p>}
                    </form>
                    <button className="mt-6 text-blue-400 hover:text-blue-300 underline">Forgot Password?</button>
                </div>
                <div className="w-full md:w-1/3 lg:w-2/5 xl:w-1/3 bg-cover bg-center rounded-r-lg" style={{ backgroundImage: 'url(https://ilovenbo.com/wp-content/uploads/2023/12/pexels-antony-trivet-13348192.jpg)' }}>
                    <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50 text-white p-12">
                        <h3 className="text-4xl lg:text-3xl font-semibold mb-6">Welcome Back</h3>
                        <p className="text-lg lg:text-base text-center">Discover a seamless login experience with our modern and secure platform. Connect effortlessly and access your account with ease.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
