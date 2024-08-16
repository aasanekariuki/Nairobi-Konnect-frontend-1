import React, { useState } from 'react';
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

  const routes = [
    { route: 'Route 1', origin: 'CBD', destination: 'Westlands', description: 'Route from Nairobi Central Business District to Westlands', price: 10, departureTime: '08:00 AM', arrivalTime: '10:00 AM' },
    { route: 'Route 2', origin: 'CBD', destination: 'Kilimani', description: 'Route from Nairobi Central Business District to Kilimani', price: 15, departureTime: '09:00 AM', arrivalTime: '11:00 AM' },
    { route: 'Route 3', origin: 'CBD', destination: 'Kibera', description: 'Route from Nairobi Central Business District to Kibera', price: 20, departureTime: '10:00 AM', arrivalTime: '12:00 PM' },
    { route: 'Route 4', origin: 'CBD', destination: 'Lang\'ata', description: 'Route from Nairobi Central Business District to Lang\'ata', price: 25, departureTime: '11:00 AM', arrivalTime: '01:00 PM' },
    { route: 'Route 5', origin: 'CBD', destination: 'Karen', description: 'Route from Nairobi Central Business District to Karen', price: 30, departureTime: '12:00 PM', arrivalTime: '02:00 PM' },
    { route: 'Route 6', origin: 'CBD', destination: 'Ngong', description: 'Route from Nairobi Central Business District to Ngong', price: 35, departureTime: '01:00 PM', arrivalTime: '03:00 PM' },
    { route: 'Route 7', origin: 'CBD', destination: 'Rongai', description: 'Route from Nairobi Central Business District to Rongai', price: 40, departureTime: '02:00 PM', arrivalTime: '04:00 PM' },
    { route: 'Route 8', origin: 'CBD', destination: 'Embakasi', description: 'Route from Nairobi Central Business District to Embakasi', price: 100, departureTime: '03:00 PM', arrivalTime: '04:00 PM' },
    { route: 'Route 9', origin: 'CBD', destination: 'Thika', description: 'Route from Nairobi Central Business District to Thika', price: 110, departureTime: '04:00 PM', arrivalTime: '05:00 PM' },
    { route: 'Route 10', origin: 'CBD', destination: 'Gikambura', description: 'Route from Nairobi Central Business District to Gikambura in Kikuyu', price: 120, departureTime: '05:00 PM', arrivalTime: '06:00 PM' },
  ];

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

    // Simulate a booking success
    setBookedRoutes([...bookedRoutes, selectedRoute.route]);
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
            {...route}
            onBook={(route, selectedTime, price) => handleOpenModal(route, selectedTime, price)}
            isBooked={bookedRoutes.includes(route.route)}
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
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
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
