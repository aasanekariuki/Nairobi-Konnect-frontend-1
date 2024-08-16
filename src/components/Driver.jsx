import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const images = [
  '',
  '',
  '',
  '',
];

// Define Zod schema
const schema = z.object({
  start_location: z.string().nonempty('Start Location is required'),
  end_location: z.string().nonempty('End Location is required'),
  departure_time: z.string().nonempty('Departure Time is required'),
  arrival_time: z.string().nonempty('Arrival Time is required'),
});

const Driver = () => {
  const [tickets, setTickets] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSubmitForm = async (data) => {
    try {
      const response = await axios.post(`${SERVER_URL}/driver`, data);
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert('Error adding route');
    }
  };

  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tickets');
      setTickets(response.data.routes);
    } catch (error) {
      console.error(error);
      alert('Error fetching tickets');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--primary-color)' }}>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className="slideshow-image absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-0 transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${image})`,
              animation: `fade ${images.length * 10}s infinite`,
              animationDelay: `${index * (10 / images.length)}s`,
            }}
          />
        ))}
      </div>
      <div className="relative bg-[#111111] text-dark p-8 rounded-3xl shadow-2xl w-full max-w-2xl">
        <img src="https://cdn.pixabay.com/photo/2019/02/06/10/09/driver-3978839_1280.jpg" alt="Logo" className="mb-4 w-24 h-24 rounded-full mx-auto transition-transform hover:scale-110" />
        <h2 className="text-center mb-4 font-bold text-[#f5f3f2] text-xl">Welcome, Driver</h2>
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 mr-4">
            <h3 className="text-center mb-4 font-bold text-[#fdfdfd]">Add a New Route</h3>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              {[
                { name: 'start_location', type: 'text', label: 'Start Location' },
                { name: 'end_location', type: 'text', label: 'End Location' },
                { name: 'departure_time', type: 'datetime-local', label: 'Departure Time' },
                { name: 'arrival_time', type: 'datetime-local', label: 'Arrival Time' }
              ].map(({ name, type, label }) => (
                <div key={name} className="mb-4">
                  <label className="block text-[#f3f2f1] text-sm font-medium">{label}</label>
                  <div className="flex items-center bg-gray-900 border-2 border-gray-600 rounded-lg">
                    <input
                      type={type}
                      name={name}
                      {...register(name)}
                      placeholder={label}
                      className="flex-1 p-4 text-lg text-white placeholder-gray-400 bg-transparent outline-none"
                      required
                    />
                  </div>
                  {errors[name] && <p className="mt-2 text-xs text-red-400">{errors[name].message}</p>}
                </div>
              ))}
              <div className="d-grid gap-2">
                <button type="submit" className="flex justify-center items-center w-full h-12 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-full hover:scale-105 transition-transform">
                  Add Route
                </button>
              </div>
            </form>
          </div>
          <div className="flex-1">
            <h3 className="text-center mb-4 font-bold text-[#f7f5f5]">View Booked Seats & Tickets</h3>
            <button onClick={fetchTickets} className="flex justify-center items-center w-full h-12 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-full hover:scale-105 transition-transform mb-4">
              Fetch Tickets
            </button>
            {tickets.length > 0 ? (
              <div className="max-h-96 overflow-y-auto">
                {tickets.map((ticket, index) => (
                  <div key={index} className="card mb-3 bg-[#FFF8E1] text-[#3E2723] rounded-lg">
                    <div className="card-body p-4">
                      <h5 className="card-title">Route ID: {ticket.route_id}</h5>
                      <p className="card-text">Start Location: {ticket.start_location}</p>
                      <p className="card-text">End Location: {ticket.end_location}</p>
                      <p className="card-text">Departure: {ticket.departure_time}</p>
                      <p className="card-text">Arrival: {ticket.arrival_time}</p>
                      <p className="card-text">Booked Seats: {ticket.booked_seats}</p>
                      <p className="card-text">Tickets:</p>
                      <ul>
                        {ticket.tickets.map((t, idx) => (
                          <li key={idx}>Passenger ID: {t.passenger_id}, Seat Number: {t.seat_number}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No tickets available. Click "Fetch Tickets" to load.</p>
            )}
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes fade {
            0%, 20%, 100% { opacity: 0; }
            25%, 95% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

export default Driver;