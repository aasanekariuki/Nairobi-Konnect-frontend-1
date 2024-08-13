import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SERVER_URL } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import "./User.css"

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
        localStorage.setItem('userRole', data.role);

        switch (data.role) {
          case 'buyer':
          case 'passenger':
            navigate('/user');
            break;
          case 'driver':
            navigate('/driver');
            break;
          case 'seller':
            navigate('/seller');
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
            <div className="p-3 bg-gray-900 rounded-lg shadow-md">
              <label className="block text-sm font-medium text-white">Name</label>
              <div className="flex items-center bg-gray-900 border-2 border-gray-600 rounded-lg">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 text-lg text-white placeholder-gray-400 bg-transparent outline-none"
                  placeholder="Enter your name"
                  {...register('username')}
                />
              </div>
              {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>}
            </div>

            <div className="p-3 bg-gray-900 rounded-lg shadow-md">
              <label className="block text-sm font-medium text-white">Email</label>
              <div className="flex items-center bg-gray-900 border-2 border-gray-600 rounded-lg">
                <input
                  type="email"
                  className="flex-1 px-4 py-2 text-lg text-white placeholder-gray-400 bg-transparent outline-none"
                  placeholder="youremail@email.com"
                  {...register('email')}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="p-3 bg-gray-900 rounded-lg shadow-md">
              <label className="block text-sm font-medium text-white">Phone</label>
              <div className="flex items-center bg-gray-900 border-2 border-gray-600 rounded-lg">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 text-lg text-white placeholder-gray-400 bg-transparent outline-none"
                  placeholder="Phone number"
                  {...register('phone')}
                />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
            </div>

            <div className="p-3 bg-gray-900 rounded-lg shadow-md">
              <label className="block text-sm font-medium text-white">Role</label>
              <select
                id="role"
                className="w-full mt-1 px-3 py-1.5 border bg-gray-900 border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                {...register('role')}
              >
                <option value="">Select your role</option>
                <option value="seller">Seller</option>
                <option value="driver">Driver</option>
              </select>
              {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>}
            </div>

            <div className="p-3 bg-gray-900 rounded-lg shadow-md relative">
              <label className="block text-sm font-medium text-white">Password</label>
              <div className="relative">
                <div className="flex items-center bg-gray-900 border-2 border-gray-600 rounded-lg">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="flex-1 px-4 py-2 text-lg text-white placeholder-gray-400 bg-transparent outline-none"
                    placeholder="Password"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-blue-500 text-lg" />
                    ) : (
                      <FaEye className="text-blue-500 text-lg" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
              </div>
            </div>

            <div className="p-3 bg-gray-900 rounded-lg shadow-md relative">
              <label className="block text-sm font-medium text-white">Confirm Password</label>
              <div className="relative">
                <div className="flex items-center bg-gray-900 border-2 border-gray-600 rounded-lg">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="flex-1 px-4 py-2 text-lg text-white placeholder-gray-400 bg-transparent outline-none"
                    placeholder="Confirm Password"
                    {...register('confirmPassword')}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className="text-blue-500 text-lg" />
                    ) : (
                      <FaEye className="text-blue-500 text-lg" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
              </div>
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
              className="font-semibold text-blue-500 hover:text-blue-700"
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
