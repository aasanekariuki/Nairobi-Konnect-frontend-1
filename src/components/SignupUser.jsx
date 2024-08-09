import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SERVER_URL } from '../../utils';
import { useNavigate } from 'react-router-dom';

const SignupUser = () => {
  const navigate = useNavigate();

  // Zod schema for validation
  const schema = z.object({
    email: z.string().email('Invalid email address').nonempty('Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters long').nonempty('Password is required'),
    username: z.string().min(2, 'Username is required'),
    phone: z.string().min(10, 'Phone number is required'),
    role: z.string().nonempty('Role is required'),
  });

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(schema),
  });

  const role = watch('role'); // Watch the role field value

  const onSubmit = async (data) => {
    console.log('Form data submitted:', data);

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
        navigate('/home');
      } else {
        const result = await response.json();
        console.error('Signup failed:', result.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:flex-row gradient-background">
      <div className="flex flex-col md:flex-row bg-[#0a0a0a] shadow-2xl rounded-3xl overflow-hidden w-full max-w-4xl">
        <div
          className="w-full transition-transform duration-500 ease-in-out bg-center bg-no-repeat bg-cover md:w-1/2 hover:scale-105 rounded-tl-3xl md:rounded-l-3xl"
          style={{
            backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1664302152991-d013ff125f3f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVzfGVufDB8fDB8fHww)',
          }}
        ></div>
        <div className="w-full md:w-1/2 p-8 bg-opacity-90 bg-[#0a0a0a] rounded-tr-3xl md:rounded-r-3xl">
          <h2 className="mb-6 text-2xl font-bold text-center text-[#f5f3f2]">Join Nairobi Konnect Community</h2>

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

            <div className="bg-[#1c1a36] p-4 rounded-lg shadow-md">
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                className="w-full mt-1 px-4 py-2 border border-gray-600 rounded-lg bg-[#faf9f8] text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Password"
                {...register('password')}
              />
              {errors.password && <p className="mt-2 text-xs text-red-400">{errors.password.message}</p>}
            </div>

            <div className="mt-6">
              <button type="submit" className="w-full h-12 font-semibold text-white transition-transform transform bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 hover:shadow-xl">
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupUser;
