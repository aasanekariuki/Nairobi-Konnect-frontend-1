import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import './Company.css';

Modal.setAppElement('#root');

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
          <h2 className="mb-3 text-xl font-semibold text-black text-center">{route}</h2>
          <p className="mb-3 text-sm text-gray-700">Price: ${price}</p>
          <p className="mb-3 text-sm text-gray-700">Departure Time: 
            <select
              value={selectedTime}
              onChange={handleTimeChange}
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
    setSelectedRoute(route);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
    <div className="flex flex-col items-center min-h-screen gradient-background p-6">
      <h1 className="mt-24 mb-12 text-4xl font-bold text-center text-white px-6 py-3 bg-gray-900 bg-opacity-70 rounded-lg shadow-lg text-shadow-md">
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
        className="max-w-md p-6 mx-auto mt-20 bg-white rounded-lg shadow-lg"
      >
        <h2 className="mb-4 text-2xl font-bold">Book a Bus</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="seatNumber">
              Seat Number
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="seatNumber"
              type="text"
              name="seatNumber"
              value={formData.seatNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="amount">
              Amount
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="amount"
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="departureTime">
              Departure Time
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="departureTime"
              type="text"
              name="departureTime"
              value={formData.departureTime}
              readOnly
            />
          </div>
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
              className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition-all"
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
