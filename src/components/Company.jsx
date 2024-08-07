import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import './Company.css'

Modal.setAppElement('#root');

const RouteCard = ({ route, price, departureTime, arrivalTime, onBook }) => (
  <div className="w-full p-5 transition-transform transform cursor-pointer lg:w-1/3 hover:scale-105">
    <div className="overflow-hidden rounded-lg shadow-md bg-sky-100">
      <div className="p-6">
        <h2 className="mb-3 text-xl font-semibold text-center">{route}</h2>
        <p className="mb-3 text-sm text-gray-700">Price: ${price}</p>
        <p className="mb-3 text-sm text-gray-700">Departure Time: {departureTime}</p>
        <p className="mb-3 text-sm text-gray-700">Arrival Time: {arrivalTime}</p>
        <div className="flex justify-center">
          <button
            onClick={onBook}
            className="btn"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Company = () => {
  const { companyId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    seatNumber: '',
    amount: '',
    departureTime: '',
  });

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

  const handleOpenModal = (route) => {
    setFormData((prevState) => ({ ...prevState, departureTime: route.departureTime, amount: route.price }));
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
    handleCloseModal();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-600">
      <h1 className="mt-16 text-4xl font-medium text-center text-white lg:mt-0">Routes for Company {companyId}</h1>
      <div className="flex flex-wrap justify-center gap-5 mt-14">
        {routes.map((route, index) => (
          <RouteCard key={index} {...route} onBook={() => handleOpenModal(route)} />
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
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCloseModal}
              className="btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn"
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
