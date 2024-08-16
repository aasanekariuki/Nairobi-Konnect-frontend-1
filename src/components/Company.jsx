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

const RouteCard = ({ route, origin, destination, description, price, departureTime, arrivalTime, onBook, isBooked }) => {
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
      <div className="overflow-hidden rounded-lg shadow-md bg-white">
        <div className="p-6">
          <h2 className="mb-3 text-xl font-semibold text-center text-black">{route}</h2>
          <p className="mb-2 text-sm text-black">Origin: {origin}</p>
          <p className="mb-2 text-sm text-black">Destination: {destination}</p>
          <p className="mb-3 text-sm text-black">Description: {description}</p>
          <p className="mb-3 text-sm text-black">Price: Ksh {price}</p>
          <p className="mb-3 text-sm text-black">Departure Time:
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
          <p className="mb-3 text-sm text-black">Arrival Time: {arrivalTime}</p>
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
        const response = await fetch(`${SERVER_URL}/routes`);  // Update this URL as needed
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
    setSelectedRoute(route);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  const onSubmit = (data) => {
    console.log('Booking data:', data);

    // Update state and show success message
    setBookedRoutes([...bookedRoutes, selectedRoute]);
    setIsSuccess(true);

    // Generate ticket details
    const ticket = {
      name: data.name,
      seatNumber: data.seatNumber,
      route: selectedRoute.route,
      departureTime: data.departureTime,
      arrivalTime: selectedRoute.arrivalTime,
      price: data.amount,
    };

    console.log('Ticket generated:', ticket);

    // Automatically close modal after a short delay
    setTimeout(() => {
      handleCloseModal();
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 gradient-background">
      <h1 className="px-6 py-3 mt-24 mb-12 text-4xl font-bold text-center text-black bg-gray-900 rounded-lg shadow-lg bg-opacity-70 text-shadow-md">
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
        className="max-w-md p-6 mx-auto mt-20 bg-white rounded-lg shadow-lg"
      >
        <h2 className="mb-4 text-2xl font-bold text-black">Book a Bus</h2>

        {isSuccess && (
          <div className="mb-4 text-center text-green-500">
            <FaCheckCircle size={24} />
            <p className="text-lg font-semibold">Ticket Successfully Booked!</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">Name</label>
            <input
              type="text"
              {...register('name')}
              className="w-full p-2 mt-1 border rounded-lg text-black"
            />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">Seat Number</label>
            <input
              type="text"
              {...register('seatNumber')}
              className="w-full p-2 mt-1 border rounded-lg text-black"
              readOnly
            />
            {errors.seatNumber && <p className="text-red-500 text-xs italic">{errors.seatNumber.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">Amount (Ksh)</label>
            <input
              type="text"
              {...register('amount')}
              className="w-full p-2 mt-1 border rounded-lg text-black"
              readOnly
            />
            {errors.amount && <p className="text-red-500 text-xs italic">{errors.amount.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">Departure Time</label>
            <input
              type="text"
              {...register('departureTime')}
              className="w-full p-2 mt-1 border rounded-lg text-black"
              readOnly
            />
            {errors.departureTime && <p className="text-red-500 text-xs italic">{errors.departureTime.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">M-Pesa Number</label>
            <input
              type="text"
              {...register('mpesaNumber')}
              className="w-full p-2 mt-1 border rounded-lg text-black"
            />
            {errors.mpesaNumber && <p className="text-red-500 text-xs italic">{errors.mpesaNumber.message}</p>}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white transition-all rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              Pay & Book
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Company;
