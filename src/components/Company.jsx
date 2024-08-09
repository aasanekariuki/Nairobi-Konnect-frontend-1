import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import './Company.css';

Modal.setAppElement('#root');


// Define the Zod schema directly in this file
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  seatNumber: z.string().min(1, 'Seat Number is required'),
  amount: z.string().min(1, 'Amount is required').regex(/^\d+$/, 'Amount must be a number'),
  departureTime: z.string().min(1, 'Departure Time is required'),
});

const RouteCard = ({ route, price, departureTime, arrivalTime, onBook }) => {

const RouteCard = ({ route, price, departureTime, arrivalTime, onBook, isBooked }) => {

  const [selectedTime, setSelectedTime] = useState(departureTime);

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleBook = () => {
    if (!isBooked) {
      onBook(selectedTime, price);
    }
  };

  return (
    <div className={`w-full p-5 transition-transform transform cursor-pointer lg:w-1/3 hover:scale-105 ${isBooked ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div className="overflow-hidden rounded-lg shadow-md bg-sky-100">
        <div className="p-6">
          <h2 className="mb-3 text-xl font-semibold text-center text-black">{route}</h2>
          <p className="mb-3 text-sm text-gray-700">Price: ${price}</p>
          <p className="mb-3 text-sm text-gray-700">Departure Time: 
            <select
              value={selectedTime}
              onChange={handleTimeChange}

              className="p-1 ml-2 border rounded"

              className="ml-2 p-1 border rounded"
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
          <p className="mb-3 text-sm text-gray-700">Arrival Time: {arrivalTime}</p>
          <div className="flex justify-center">
            <button
              onClick={handleBook}

              className="px-4 py-2 font-bold text-white transition-all rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"

              className={`px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all ${isBooked ? 'opacity-50 cursor-not-allowed' : ''}`}
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

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      seatNumber: '',
      amount: '',
      departureTime: '',
    },
  });

  const [formData, setFormData] = useState({
    name: '',
    seatNumber: '',
    amount: '',
    departureTime: '',
  });

  const [selectedRoute, setSelectedRoute] = useState(null);
  const [bookedRoutes, setBookedRoutes] = useState([]);


  const routes = [
    { route: 'Route 1', price: 10, departureTime: '08:00 AM', arrivalTime: '10:00 AM' },
    { route: 'Route 2', price: 15, departureTime: '09:00 AM', arrivalTime: '11:00 AM' },
    { route: 'Route 3', price: 20, departureTime: '10:00 AM', arrivalTime: '12:00 PM' },
    { route: 'Route 4', price: 25, departureTime: '11:00 AM', arrivalTime: '01:00 PM' },
    { route: 'Route 5', price: 30, departureTime: '12:00 PM', arrivalTime: '02:00 PM' },
    { route: 'Route 6', price: 35, departureTime: '01:00 PM', arrivalTime: '03:00 PM' },
    { route: 'Route 7', price: 40, departureTime: '02:00 PM', arrivalTime: '04:00 PM' },
    { route: 'Route 8', price: 100, departureTime: '03:00 PM', arrivalTime: '04:00 PM' },
    { route: 'Route 9', price: 110, departureTime: '04:00 PM', arrivalTime: '05:00 PM' },
    { route: 'Route 10', price: 120, departureTime: '05:00 PM', arrivalTime: '06:00 PM' },
  ];

  const handleOpenModal = (route, selectedTime) => {
    setFormData({
      name: '',
      seatNumber: '',
      amount: route.price,
      departureTime: selectedTime,
    });
    setValue('amount', route.price); // Set form value for amount
    setValue('departureTime', selectedTime); // Set form value for departureTime
    setSelectedRoute(route);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const onSubmit = (data) => {
    alert(`Ticket Generated: \nName: ${data.name}\nSeat Number: ${data.seatNumber}\nAmount: ${data.amount}\nDeparture Time: ${data.departureTime}`);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Ticket Generated: \nName: ${formData.name}\nSeat Number: ${formData.seatNumber}\nAmount: ${formData.amount}\nDeparture Time: ${formData.departureTime}`);
    setBookedRoutes([...bookedRoutes, selectedRoute.route]);

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
            {...route}
            onBook={(selectedTime, price) => handleOpenModal(route, selectedTime)}
            isBooked={bookedRoutes.includes(route.route)}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Book a Bus"
        className="max-w-md p-6 mx-auto mt-20 bg-white rounded-lg shadow-l"
      >
        <h2 className="mb-4 text-2xl font-bold text-black">Book a Bus</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              {...register('name')}
            />
            {errors.name && <p className="mt-2 text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="seatNumber">
              Seat Number
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="seatNumber"
              type="text"
              {...register('seatNumber')}
            />
            {errors.seatNumber && <p className="mt-2 text-xs text-red-500">{errors.seatNumber.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="amount">
              Amount
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="amount"
              type="text"
              {...register('amount')}
              readOnly
            />
            {errors.amount && <p className="mt-2 text-xs text-red-500">{errors.amount.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="departureTime">
              Departure Time
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="departureTime"
              type="text"
              {...register('departureTime')}
              readOnly
            />
            {errors.departureTime && <p className="mt-2 text-xs text-red-500">{errors.departureTime.message}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 mr-2 font-bold text-white bg-red-600 border rounded hover:bg-red-700"

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 bg-gray-500 text-white font-bold rounded-lg shadow-md hover:bg-gray-600 transition-all"

            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-blue-600 border rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Company;
