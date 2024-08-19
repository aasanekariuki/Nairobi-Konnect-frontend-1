import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SERVER_URL } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import "./styles/User.css"

const SignupBusiness = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const schema = z.object({
    email: z.string().email('Invalid email address').nonempty('Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters long').nonempty('Password is required'),
    confirmPassword: z.string().min(6, 'Password confirmation is required').nonempty('Password confirmation is required'),
    username: z.string().min(2, 'Username is required'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits').nonempty('Phone number is required'),
    role: z.string().nonempty('Role is required'),
  }).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage('');
  
    try {
      const response = await fetch(`${SERVER_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Signup successful:', result);
        
        localStorage.setItem('token', result.token);
        localStorage.setItem('userRole', data.role.toLowerCase());
  
        // Redirect to login page
        navigate('/login');
      } else {
        const result = await response.json();
        setErrorMessage(result.message || 'Signup failed. Please try again.');
        console.error('Signup failed:', result.message);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      console.error('Error during signup:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-custom-blue">
      <div className="flex bg-black shadow-lg rounded-lg overflow-hidden w-full max-w-6xl" style={{ maxHeight: '80vh' }}>
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://content.r9cdn.net/rimg/dimg/c6/b2/7e865843-city-26243-164a4a25d83.jpg?width=1366&height=768&xhint=3968&yhint=1450&crop=true)',
            backgroundSize: 'cover',
          }}
        ></div>
        <div className="w-full md:w-1/2 p-6 flex flex-col">
          <h2 className="mb-4 text-xl font-bold text-center text-white">Join Nairobi Konnect Community</h2>

          {errorMessage && (
            <p className="mb-3 text-sm text-red-500 text-center">
              {errorMessage}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg shadow-md">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="w-full mt-1 px-3 py-1.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter your name"
                {...register('username')}
              />
              {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>}
            </div>

            <div className="p-3 bg-gray-50 rounded-lg shadow-md">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full mt-1 px-3 py-1.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="youremail@email.com"
                {...register('email')}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="p-3 bg-gray-50 rounded-lg shadow-md">
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                className="w-full mt-1 px-3 py-1.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Phone number"
                {...register('phone')}
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
            </div>

            <div className="p-3 bg-gray-50 rounded-lg shadow-md">
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                id="role"
                className="w-full mt-1 px-3 py-1.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                {...register('role')}
              >
                <option value="">Select your role</option>
                <option value="seller">Seller</option>
                <option value="driver">Driver</option>
              </select>
              {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>}
            </div>

            <div className="p-3 bg-gray-50 rounded-lg shadow-md relative">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full mt-1 px-3 py-1.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter your password"
                {...register('password')}
              />
              <span
                className="absolute top-3 right-3 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <div className="p-3 bg-gray-50 rounded-lg shadow-md relative">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full mt-1 px-3 py-1.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Confirm your password"
                {...register('confirmPassword')}
              />
              <span
                className="absolute top-3 right-3 cursor-pointer text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                {loading ? <FaSpinner className="animate-spin mr-2" /> : 'Sign Up'}
              </button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm text-gray-300">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-blue-500 hover:underline"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupBusiness;
