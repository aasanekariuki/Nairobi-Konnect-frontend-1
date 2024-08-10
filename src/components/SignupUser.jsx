import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SERVER_URL } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa'; // Importing icons

const SignupBusiness = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for toggling confirm password visibility

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
        localStorage.setItem('userRole', data.role); 
        
     
        switch (data.role) {
          case 'buyer':
          case 'passenger':
            navigate('/user');
            break;
          default:
            navigate('/home');
            break;
        }
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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:flex-row gradient-background">
      <div className="flex bg-[#0a0a0a] shadow-2xl rounded-3xl overflow-hidden w-full max-w-4xl">
        <div
          className="w-full transition-transform duration-500 ease-in-out bg-center bg-no-repeat bg-cover md:w-1/2 hover:scale-105"
          style={{
            backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1664302152991-d013ff125f3f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVzfGVufDB8fDB8fHww)',
          }}
        ></div>
        <div className="w-full md:w-1/2 p-8 text-[#f5f3f2]">
          <h2 className="mb-6 text-2xl font-bold text-center">Join Nairobi Konnect Community</h2>

          {errorMessage && (
            <p className="mb-4 text-sm text-red-400 text-center">
              {errorMessage}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-[#1c1a36] p-4 rounded-lg shadow-md">
              <label className="block text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-2 border border-gray-600 rounded-lg bg-[#faf9f8] text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter your name"
                {...register('username')}
              />
              {errors.username && <p className="mt-2 text-xs text-red-400">{errors.username.message}</p>}
            </div>

            <div className="bg-[#1c1a36] p-4 rounded-lg shadow-md">
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                className="w-full mt-1 px-4 py-2 border border-gray-600 rounded-lg bg-[#faf9f8] text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="youremail@email.com"
                {...register('email')}
              />
              {errors.email && <p className="mt-2 text-xs text-red-400">{errors.email.message}</p>}
            </div>

            <div className="bg-[#1c1a36] p-4 rounded-lg shadow-md">
              <label className="block text-sm font-medium text-gray-300">Phone</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-2 border border-gray-600 rounded-lg bg-[#faf9f8] text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Phone number"
                {...register('phone')}
              />
              {errors.phone && <p className="mt-2 text-xs text-red-400">{errors.phone.message}</p>}
            </div>

            <div className="bg-[#1c1a36] p-4 rounded-lg shadow-md">
              <label className="block text-sm font-medium text-gray-300">Role</label>
              <select
                id="role"
                className="w-full mt-1 px-4 py-2 border border-gray-600 rounded-lg bg-[#faf9f8] text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                {...register('role')}
              >
                <option value="">Select your role</option>
                <option value="buyer">Buyer</option>
                <option value="passenger">Passenger</option>
              </select>
              {errors.role && <p className="mt-2 text-xs text-red-400">{errors.role.message}</p>}
            </div>

            {/* Password Field */}
            <div className="bg-[#1c1a36] p-4 rounded-lg shadow-md relative">
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-[#faf9f8] text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  placeholder="Password"
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-blue-500 text-xl" />
                  ) : (
                    <FaEye className="text-blue-500 text-xl" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-xs text-red-400">{errors.password.message}</p>}
            </div>

            {/* Confirm Password Field */}
            <div className="bg-[#1c1a36] p-4 rounded-lg shadow-md relative">
              <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-[#faf9f8] text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  placeholder="Confirm Password"
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="text-blue-500 text-xl" />
                  ) : (
                    <FaEye className="text-blue-500 text-xl" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-2 text-xs text-red-400">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 mt-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              {loading ? (
                <FaSpinner className="w-5 h-5 mr-2 animate-spin inline" />
              ) : (
                'Sign Up'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupBusiness;
