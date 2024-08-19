import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaCheckCircle, FaSearch } from 'react-icons/fa';
import { SERVER_URL } from '../../utils'; // Ensure SERVER_URL is correctly set

Modal.setAppElement('#root');

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  seatNumber: z.string(), // No validation for seatNumber
  amount: z.string().min(1, 'Amount is required').regex(/^\d+$/, 'Amount must be a number'),
  departureTime: z.string().min(1, 'Departure Time is required'),
  mpesaNumber: z.string().length(10, 'M-Pesa number must be exactly 10 digits'),
});

const generateTimeOptions = () => {
  const times = [];
  for (let hour = 8; hour <= 20; hour++) {
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const ampm = hour < 12 ? 'AM' : 'PM';
    times.push(`${formattedHour}:00 ${ampm}`);
  }
  return times;
};

const Company = () => {
  const { companyId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [bookedRoutes, setBookedRoutes] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [availableTimes, setAvailableTimes] = useState(generateTimeOptions());

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      seatNumber: '',
      mpesaNumber: '',
    },
  });

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/routes`);
        if (!response.ok) {
          throw new Error('Failed to fetch routes');
        }
        const data = await response.json();
        setRoutes(data);
        setFilteredRoutes(data);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    fetchRoutes();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredRoutes(
        routes.filter(route =>
          `${route.origin} to ${route.destination}`.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredRoutes(routes);
    }
  }, [searchTerm, routes]);

  const generateSeatNumber = () => {
    return bookedRoutes.length + 1;
  };

  const handleOpenModal = (route, selectedTime) => {
    const amountValue = '10';
    setValue('amount', amountValue);
    setValue('departureTime', selectedTime || '');
    setValue('seatNumber', generateSeatNumber());
    setSelectedRoute({ route, departureTime: selectedTime || '' });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  // Function to initiate M-Pesa payment
  const initiateMpesaPayment = async (mpesaNumber, amount) => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store your token in localStorage
  
      const response = await fetch(`${SERVER_URL}/stk_push`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Include the token here
        },
        body: JSON.stringify({
          phone: mpesaNumber,
          amount: amount,
        }),
      });
  
      if (!response.ok) {
        throw new Error('M-Pesa payment initiation failed');
      }
  
      const data = await response.json();
      console.log('M-Pesa payment initiated:', data);
      return data;
    } catch (error) {
      console.error('Error during M-Pesa payment:', error);
      throw error;
    }
  };
  
  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
  
      // Ensure amount is a number
      const formattedData = {
        ...data,
        amount: Number(data.amount), // Convert amount to number
        route: selectedRoute.route,
      };
  
      const response = await fetch(`${SERVER_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error response from server:', errorMessage);
        throw new Error('Failed to book ticket');
      }
  
      // Handle successful booking and payment
      await initiateMpesaPayment(data.mpesaNumber, data.amount);
  
      setBookedRoutes([...bookedRoutes, selectedRoute.route]);
      setIsSuccess(true);
  
      console.log('Ticket generated:', formattedData);
  
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
  
    } catch (error) {
      console.error('Error during booking:', error);
    }
  };
  
  return (
    <div className="gradient-background">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Routes for Company {companyId}</h1>
        
        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search routes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredRoutes.length > 0 ? (
            filteredRoutes.map((route, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transform hover:scale-101 transition duration-300 ease-in-out flex flex-col items-center justify-between route-card">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{`${route.origin} to ${route.destination}`}</h2>
                  <p className="text-sm text-gray-600 mb-1">Origin: {route.origin}</p>
                  <p className="text-sm text-gray-600 mb-1">Destination: {route.destination}</p>
                  <p className="text-sm text-gray-600 mb-3">{route.description}</p>
                  <p className="text-sm font-semibold text-gray-800 mb-2">Price: Ksh {route.price || '10'}</p> {/* Default to 10 if price is not set */}
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => handleOpenModal(route, '')}
                    className={`px-4 py-2 font-bold text-white rounded-full shadow-md bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 ${bookedRoutes.includes(`${route.origin} to ${route.destination}`) ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ''}`}
                    disabled={bookedRoutes.includes(`${route.origin} to ${route.destination}`)}
                  >
                    {bookedRoutes.includes(`${route.origin} to ${route.destination}`) ? 'Booked' : 'Book Now'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No routes available</p>
          )}
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Book a Bus"
          className="fixed inset-0 flex items-center justify-center p-4"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Book a Bus</h2>

            {isSuccess && (
              <div className="mb-4 text-center text-green-500">
                <FaCheckCircle size={24} />
                <p className="text-lg font-semibold">Ticket Successfully Booked!</p>
              </div>
            )}

            {!isSuccess && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="name" className="mb-1 text-sm font-semibold text-gray-700">
                    Name
                  </label>
                  <input
                    id="name"
                    {...register('name')}
                    className="p-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="seatNumber" className="mb-1 text-sm font-semibold text-gray-700">
                    Seat Number
                  </label>
                  <input
                    id="seatNumber"
                    {...register('seatNumber')}
                    className="p-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    readOnly
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="amount" className="mb-1 text-sm font-semibold text-gray-700">
                    Amount
                  </label>
                  <input
                    id="amount"
                    {...register('amount')}
                    className="p-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    readOnly
                  />
                  {errors.amount && <p className="mt-1 text-sm text-red-500">{errors.amount.message}</p>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="departureTime" className="mb-1 text-sm font-semibold text-gray-700">
                    Departure Time
                  </label>
                  <select
                    id="departureTime"
                    {...register('departureTime')}
                    className="p-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  >
                    <option value="">Select Departure Time</option>
                    {availableTimes.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  {errors.departureTime && <p className="mt-1 text-sm text-red-500">{errors.departureTime.message}</p>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="mpesaNumber" className="mb-1 text-sm font-semibold text-gray-700">
                    M-Pesa Number
                  </label>
                  <input
                    id="mpesaNumber"
                    {...register('mpesaNumber')}
                    className="p-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                  {errors.mpesaNumber && <p className="mt-1 text-sm text-red-500">{errors.mpesaNumber.message}</p>}
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 font-bold text-white rounded-full shadow-md bg-red-500 hover:bg-red-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 font-bold text-white rounded-full shadow-md bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Company;
