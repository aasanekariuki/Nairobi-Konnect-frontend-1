import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import './styles/Login.css';
import { FaCheckCircle } from 'react-icons/fa';
import './styles/Company.css';

Modal.setAppElement('#root');

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  seatNumber: z.string().min(1, 'Seat Number is required'),
  amount: z.string().min(1, 'Amount is required').regex(/^\d+$/, 'Amount must be a number'),
  departureTime: z.string().min(1, 'Departure Time is required'),
  mpesaNumber: z.string().length(10, 'M-Pesa number must be exactly 10 digits'),
});

const RouteCard = ({ route, price, departureTime, arrivalTime, onBook, isBooked }) => {
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
    <div className={`w-full p-5 transition-transform transform cursor-pointer lg:w-1/3 hover:scale-105 ${isBooked ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div className="overflow-hidden rounded-lg shadow-md bg-black">
        <div className="p-6">
          <h2 className="mb-3 text-xl font-semibold text-center text-white">{route}</h2>
          <p className="mb-3 text-sm text-white">Price: ${price}</p>
          <p className="mb-3 text-sm text-white">Departure Time:
            <select
              value={selectedTime}
              onChange={handleTimeChange}
              className="p-1 ml-2 border rounded mb-3 text-sm text-black"
              disabled={isBooked}
            >
              <option value="08:00 AM">08:00 AM</option>
              <option value="09:00 AM">09:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="01:00 PM">01:00 PM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="03:00 PM">03:00 PM</option>
              <option value="04:00 PM">04:00 PM</option>
              <option value="05:00 PM">05:00 PM</option>
            </select>
          </p>
          <p className="mb-3 text-sm text-white">Arrival Time: {arrivalTime}</p>
          <div className="flex justify-center">
            <button
              onClick={handleBook}
              className={`px-4 py-2 font-bold text-white transition-all rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 ${isBooked ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isBooked}
            >
              {isBooked ? 'Booked' : 'Book Now'}
            </button>
          </div>
        </div>
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

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
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
        const response = await fetch('http://localhost:5000/routes');  // Update this URL as needed
        const data = await response.json();
        setRoutes(data);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    fetchRoutes();
  }, []);

  const generateSeatNumber = () => {
    // Generate seat number based on the booked routes
    return bookedRoutes.length + 1;
  };

  const handleOpenModal = (route, selectedTime, price) => {
    setValue('amount', price);
    setValue('departureTime', selectedTime);
    setValue('seatNumber', generateSeatNumber());
    setSelectedRoute(route);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  const onSubmit = (data) => {
    // Log booking details for debugging
    console.log('Booking data:', data);

    // Update state and show success message
    setBookedRoutes([...bookedRoutes, selectedRoute]);
    setIsSuccess(true);
    handleCloseModal();
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 gradient-background">
      <h1 className="px-6 py-3 mt-24 mb-12 text-4xl font-bold text-center text-white bg-gray-900 rounded-lg shadow-lg bg-opacity-70 text-shadow-md">
        Routes for Company {companyId}
      </h1>
      <div className="flex flex-wrap justify-center gap-5 mt-14">
        {routes.map((route, index) => (
          <RouteCard
            key={index}
            route={route.origin + ' to ' + route.destination}
            price={route.price}  // Assumes price is provided by backend
            departureTime={route.departure_time}  // Assumes departure_time is provided by backend
            arrivalTime={route.arrival_time}  // Assumes arrival_time is provided by backend
            onBook={(route, selectedTime, price) => handleOpenModal(route, selectedTime, price)}
            isBooked={bookedRoutes.includes(route.origin + ' to ' + route.destination)}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Book a Bus"
        className="max-w-md p-6 mx-auto mt-20 bg-black rounded-lg shadow-lg"
      >
        <h2 className="mb-4 text-2xl font-bold text-white">Book a Bus</h2>

        {isSuccess && (
          <div className="mb-4 text-center text-green-500">
            <FaCheckCircle size={24} />
            <p className="text-lg font-semibold">Booking Successful!</p>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-white" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-black bg-gray-300 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              {...register('name')}
            />
            {errors.name && <p className="mt-2 text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-white" htmlFor="seatNumber">
              Seat Number
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-black bg-gray-300 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="seatNumber"
              type="text"
              {...register('seatNumber')}
              disabled
            />
            {errors.seatNumber && <p className="mt-2 text-xs text-red-500">{errors.seatNumber.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-white" htmlFor="amount">
              Amount
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-black bg-gray-300 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="amount"
              type="text"
              {...register('amount')}
              disabled
            />
            {errors.amount && <p className="mt-2 text-xs text-red-500">{errors.amount.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-white" htmlFor="departureTime">
              Departure Time
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-black bg-gray-300 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="departureTime"
              type="text"
              {...register('departureTime')}
              disabled
            />
            {errors.departureTime && <p className="mt-2 text-xs text-red-500">{errors.departureTime.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-white" htmlFor="mpesaNumber">
              M-Pesa Number
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-black bg-gray-300 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="mpesaNumber"
              type="text"
              {...register('mpesaNumber')}
            />
            {errors.mpesaNumber && <p className="mt-2 text-xs text-red-500">{errors.mpesaNumber.message}</p>}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white transition-all rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Company;
