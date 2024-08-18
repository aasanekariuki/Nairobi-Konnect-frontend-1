import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import './styles/Login.css';
import { FaCheckCircle } from 'react-icons/fa';
import './styles/Company.css';
import { SERVER_URL } from '../../utils';

Modal.setAppElement('#root');

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  seatNumber: z.string().min(1, 'Seat Number is required'),
  amount: z.string().min(1, 'Amount is required').regex(/^\d+$/, 'Amount must be a number'),
  departureTime: z.string().min(1, 'Departure Time is required'),
  mpesaNumber: z.string().length(10, 'M-Pesa number must be exactly 10 digits'),
});

const RouteCard = ({ route, origin, destination, description, price, departureTime, onBook, isBooked }) => {
  const [selectedTime, setSelectedTime] = useState(departureTime);

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleBook = () => {
    if (!isBooked) {
      onBook(route, selectedTime, price);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out flex flex-col items-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{route}</h2>
        <p className="text-sm text-gray-600 mb-1">Origin: {origin}</p>
        <p className="text-sm text-gray-600 mb-1">Destination: {destination}</p>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <p className="text-sm font-semibold text-gray-800 mb-2">Price: Ksh {price}</p>
        <p className="text-sm text-gray-600 mb-3">Departure Time: {departureTime}</p>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleBook}
          className={`px-4 py-2 font-bold text-white rounded-full shadow-md bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 ${isBooked ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ''}`}
          disabled={isBooked}
        >
          {isBooked ? 'Booked' : 'Book Now'}
        </button>
      </div>
    </div>
  );
};

const Company = () => {
  const { companyId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [bookedRoutes, setBookedRoutes] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [routes, setRoutes] = useState([]);

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      seatNumber: '',
      amount: '',
      departureTime: '',
      mpesaNumber: '',
    },
  });

  useEffect(() => {
    // Fetch routes from backend
    const fetchRoutes = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/routes`);
        if (!response.ok) {
          throw new Error('Failed to fetch routes');
        }
        const data = await response.json();
        setRoutes(data);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    fetchRoutes();
  }, []);

  const generateSeatNumber = () => {
    return bookedRoutes.length + 1;
  };

  const handleOpenModal = (route, selectedTime, price) => {
    setValue('amount', price);
    setValue('departureTime', selectedTime);
    setValue('seatNumber', generateSeatNumber());

    setSelectedRoute({ route, departureTime: selectedTime });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${SERVER_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          route: selectedRoute.route,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to book ticket');
      }

      setBookedRoutes([...bookedRoutes, selectedRoute.route]);
      setIsSuccess(true);

      const ticket = {
        name: data.name,
        seatNumber: data.seatNumber,
        route: selectedRoute.route,
        departureTime: data.departureTime,
        price: data.amount,
      };

      console.log('Ticket generated:', ticket);

      setTimeout(() => {
        handleCloseModal();
      }, 2000);

    } catch (error) {
      console.error('Error during booking:', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Routes for Company {companyId}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {routes.length > 0 ? (
          routes.map((route, index) => (
            <RouteCard
              key={index}
              route={`${route.origin} to ${route.destination}`}
              origin={route.origin}
              destination={route.destination}
              description={route.description}
              price={route.price}
              departureTime={route.departure_time}
              onBook={(route, selectedTime, price) => handleOpenModal(route, selectedTime, price)}
              isBooked={bookedRoutes.includes(`${route.origin} to ${route.destination}`)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No routes available</p>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Book a Bus"
        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        overlayClassName="fixed inset-0"
      >
        <div className="bg-white rounded-lg p-8 shadow-md">
          <h2 className="text-2xl font-bold mb-4">Book a Bus</h2>

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
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
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
                  readOnly
                  className="p-2 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                {errors.seatNumber && <p className="mt-1 text-sm text-red-500">{errors.seatNumber.message}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="amount" className="mb-1 text-sm font-semibold text-gray-700">
                  Amount
                </label>
                <input
                  id="amount"
                  {...register('amount')}
                  readOnly
                  className="p-2 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                {errors.amount && <p className="mt-1 text-sm text-red-500">{errors.amount.message}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="departureTime" className="mb-1 text-sm font-semibold text-gray-700">
                  Departure Time
                </label>
                <input
                  id="departureTime"
                  {...register('departureTime')}
                  readOnly
                  className="p-2 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                {errors.departureTime && <p className="mt-1 text-sm text-red-500">{errors.departureTime.message}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="mpesaNumber" className="mb-1 text-sm font-semibold text-gray-700">
                  M-Pesa Number
                </label>
                <input
                  id="mpesaNumber"
                  {...register('mpesaNumber')}
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                {errors.mpesaNumber && <p className="mt-1 text-sm text-red-500">{errors.mpesaNumber.message}</p>}
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Company;
