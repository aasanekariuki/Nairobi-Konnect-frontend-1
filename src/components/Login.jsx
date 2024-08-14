import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Login.css';
import { SERVER_URL } from '../../utils';

const loginSchema = z.object({
	email: z
		.string()
		.email('Invalid email address')
		.nonempty('Email address is required'),
	password: z
		.string()
		.min(6, 'Password must be at least 6 characters long')
		.nonempty('Password is required'),
});

const LoginPage = () => {
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate(); // Initialize useNavigate

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginSchema),
	});

	const handleLogin = async (data) => {
		try {
			const loginResponse = await fetch(`${SERVER_URL}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const loginData = await loginResponse.json();

			if (loginResponse.ok) {
				// Handle successful login
				console.log('Login successful:', loginData);
				localStorage.setItem('token', loginData.access_token); // Store token if needed

				// Redirect based on user role
				if (loginData.role === 'admin') {
					navigate('/admin'); // Redirect to admin view
				} else if (loginData.role === 'user') {
					navigate('/signupUser'); // Redirect to user signup
				} else {
					navigate('/signupBusiness'); // Redirect to business signup
				}
			} else {
				console.error('Login failed:', loginData.message);
				setError(loginData.message); // Set error message
			}
		} catch (error) {
			console.error('Error during login:', error);
			setError('An unexpected error occurred.'); // Set generic error message
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-custom-blue">
			<div className="relative flex w-full max-w-7xl h-screen md:h-4/5 lg:h-[80vh] xl:h-[85vh] bg-black bg-opacity-50 rounded-lg shadow-lg overflow-hidden">
				<div className="flex flex-col items-center justify-center w-full p-12 bg-gray-800 rounded-l-lg md:w-2/3 lg:w-3/5 xl:w-2/3 lg:p-16 bg-opacity-90">
					<h2 className="relative mb-8 text-5xl font-bold text-white lg:text-4xl group">
						Login
						<span className="block w-24 h-1 mx-auto mt-2 transition-transform duration-300 transform scale-x-0 bg-blue-600 lg:w-20 group-hover:scale-x-100"></span>
					</h2>
					<form
						onSubmit={handleSubmit(handleLogin)}
						className="flex flex-col w-full gap-6"
					>
						<div className="flex flex-col">
							<div className="flex items-center bg-gray-900 border-2 border-gray-600 rounded-lg">
								<i className="p-4 text-gray-400 fas fa-envelope"></i>
								<input
									type="email"
									id="email"
									{...register('email')}
									placeholder="Email"
									className="flex-1 p-4 text-lg text-white placeholder-gray-400 bg-transparent outline-none"
								/>
							</div>
							{errors.email && (
								<p className="mt-2 text-sm text-red-500">
									{errors.email.message}
								</p>
							)}
						</div>
						<div className="flex flex-col">
							<div className="flex items-center bg-gray-900 border-2 border-gray-600 rounded-lg">
								<i className="p-4 text-gray-400 fas fa-lock"></i>
								<input
									type="password"
									id="password"
									{...register('password')}
									placeholder="Password"
									className="flex-1 p-4 text-lg text-white placeholder-gray-400 bg-transparent outline-none"
								/>
							</div>
							{errors.password && (
								<p className="mt-2 text-sm text-red-500">
									{errors.password.message}
								</p>
							)}
						</div>
						<button
							type="submit"
							className="px-8 py-4 text-white transition-transform transform rounded-lg shadow-md bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 hover:scale-105"
						>
							Login
						</button>
						{message && (
							<p className="mt-6 text-xl font-medium text-green-400">
								{message}
							</p>
						)}
						{error && (
							<p className="mt-6 text-xl font-medium text-red-500">
								{error}
							</p>
						)}
					</form>
					<div className="mt-6">
						<p className="text-white">
							Do you have an account?
							<button
								onClick={() => navigate('/signupUser')}
								className="ml-2 text-blue-400 underline hover:text-blue-300"
							>
								Sign Up as User
							</button>
							or
							<button
								onClick={() => navigate('/signupBusiness')}
								className="ml-2 text-blue-400 underline hover:text-blue-300"
							>
								Sign Up as Business
							</button>
						</p>
					</div>
					<button className="mt-6 text-blue-400 underline hover:text-blue-300">
						Forgot Password?
					</button>
				</div>
				<div
					className="w-full bg-center bg-cover rounded-r-lg md:w-1/3 lg:w-2/5 xl:w-1/3"
					style={{
						backgroundImage:
							'url(https://ilovenbo.com/wp-content/uploads/2023/12/pexels-antony-trivet-13348192.jpg)',
					}}
				>
					<div className="flex flex-col items-center justify-center h-full p-12 text-white bg-black bg-opacity-50">
						<h3 className="mb-6 text-4xl font-semibold lg:text-3xl">
							Welcome Back
						</h3>
						<p className="text-lg text-center lg:text-base">
							Discover a seamless login experience with our modern
							and secure platform. Connect effortlessly and access
							your account with ease.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
