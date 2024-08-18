import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FiBell, FiLogOut, FiPhone } from 'react-icons/fi';
import { BsClock, BsFillPeopleFill } from 'react-icons/bs';
import { AiOutlineSchedule } from 'react-icons/ai';
import { MdOutlineRoute, MdSafetyDivider } from 'react-icons/md';
import './styles/DriverPage.css';  // Import the CSS file
import { SERVER_URL } from '../../utils';

// Zod schema for form validation
const schema = z.object({
  start_location: z.string().nonempty('Start Location is required'),
  end_location: z.string().nonempty('End Location is required'),
  departure_time: z.string().nonempty('Departure Time is required'),
  arrival_time: z.string().nonempty('Arrival Time is required'),
});

const DriverPage = () => {
  const [driver, setDriver] = useState(null); // State to store driver data
  const [tickets, setTickets] = useState([]); // State to store tickets
  const [routes, setRoutes] = useState([]); // State to store all routes
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  // Fetch driver data when component mounts
  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/drivers`); // API endpoint to fetch driver data
        const data = await response.json();
        setDriver(data);
      } catch (error) {
        // console.error('Error fetching driver data:', error);
      }
    };

    fetchDriverData(); // Call the function to fetch data
  }, []);

  // Handle form submission to add a new route
  const handleSubmitForm = async (data) => {
    try {
      const response = await fetch(`${SERVER_URL}/routes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      // console.error('Error adding route:', error);
      alert('Error adding route');
    }
  };

  // Fetch tickets for the current route
  const fetchTickets = async () => {
    try {
      // const response = await fetch(/`${SERVER_URL}/tickets`);
      const data = await response.json();
      setTickets(data.routes);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      alert('Error fetching tickets');
    }
  };

  // Fetch all available routes
  const fetchAllRoutes = async () => {
    try {
      const response = await fetch('http://localhost:5000/routes'); // API endpoint to fetch all routes
      const data = await response.json();
      setRoutes(data.routes); // Assuming the response has a 'routes' field
    } catch (error) {
      console.error('Error fetching routes:', error);
      alert('Error fetching routes');
    }
  };

  if (!driver) {
    return <p>Loading driver data...</p>; // Loading state
  }

  return (
    <div className="driver-page">
      {/* Header */}
      <header className="header">
        <div className="profile-info">
          <img src={driver.profilePicture} alt="Driver" className="profile-picture" />
          <div>
            <h1 className="profile-name">{driver.name}</h1>
            <p className="profile-status">{driver.status}</p>
          </div>
        </div>
        <div className="header-buttons">
          <button className="header-button">
            <FiBell className="icon" />
          </button>
          <button className="header-button logout-button">
            <FiLogOut className="icon" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Profile & Shift Info */}
        <section className="card">
          <h2 className="card-title">Profile & Shift</h2>
          <div className="card-content">
            <div className="info-row">
              <BsClock className="icon" />
              <p>Shift: <span>{driver.shiftStart} - {driver.shiftEnd}</span></p>
            </div>
            <div className="info-row">
              <MdOutlineRoute className="icon" />
              <p>Current Route: <span>{driver.currentRoute}</span></p>
            </div>
            <div className="info-row">
              <BsFillPeopleFill className="icon" />
              <p>Passengers Onboard: <span>{driver.passengersOnBoard}</span></p>
            </div>
            <button className="action-button">
              Contact Support <FiPhone className="inline-icon" />
            </button>
          </div>
        </section>

        {/* Add Route Form */}
        <section className="card wide-card">
          <h2 className="card-title">Add a New Route</h2>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            {[
              { name: 'start_location', type: 'text', label: 'Start Location' },
              { name: 'end_location', type: 'text', label: 'End Location' },
              { name: 'departure_time', type: 'datetime-local', label: 'Departure Time' },
              { name: 'arrival_time', type: 'datetime-local', label: 'Arrival Time' }
            ].map(({ name, type, label }) => (
              <div key={name} className="form-group">
                <label>{label}</label>
                <input
                  type={type}
                  {...register(name)}
                  className={`form-control ${errors[name] ? 'error' : ''}`}
                />
                {errors[name] && <p className="error-text">{errors[name]?.message}</p>}
              </div>
            ))}
            <button type="submit" className="submit-button">
              Add Route
            </button>
          </form>
        </section>

        {/* Tickets & Stops */}
        <section className="card wide-card">
          <h2 className="card-title">View Booked Seats & Tickets</h2>
          <button onClick={fetchTickets} className="action-button">
            Fetch Tickets
          </button>
          {tickets.length > 0 ? (
            <div className="tickets-list">
              {tickets.map((ticket, index) => (
                <div key={index} className="ticket">
                  <h5>Route ID: {ticket.route_id}</h5>
                  <p>Start Location: {ticket.start_location}</p>
                  <p>End Location: {ticket.end_location}</p>
                  <p>Departure: {ticket.departure_time}</p>
                  <p>Arrival: {ticket.arrival_time}</p>
                  <p>Booked Seats: {ticket.booked_seats}</p>
                  <p>Tickets:</p>
                  <ul>
                    {ticket.tickets.map((t, idx) => (
                      <li key={idx}>Passenger ID: {t.passenger_id}, Seat Number: {t.seat_number}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p>No tickets available. Click "Fetch Tickets" to load.</p>
          )}
        </section>

        {/* All Routes */}
        <section className="card wide-card">
          <h2 className="card-title">View All Routes</h2>
          <button onClick={fetchAllRoutes} className="action-button">
            Fetch All Routes
          </button>
          {routes.length > 0 ? (
            <div className="routes-list">
              {routes.map((route, index) => (
                <div key={index} className="route">
                  <h5>Route ID: {route.route_id}</h5>
                  <p>Start Location: {route.start_location}</p>
                  <p>End Location: {route.end_location}</p>
                  <p>Departure: {route.departure_time}</p>
                  <p>Arrival: {route.arrival_time}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No routes available. Click "Fetch All Routes" to load.</p>
          )}
        </section>

        {/* Schedule & Notifications */}
        <section className="card">
          <h2 className="card-title">Schedule & Notifications</h2>
          <div className="card-content">
            <div className="info-row">
              <AiOutlineSchedule className="icon" />
              <p>Next Route: <span>Route 15 - Airport to Downtown</span></p>
            </div>
            <div className="notification-list">
              <h3>Today's Notifications:</h3>
              <ul>
                <li>Traffic delay on 5th Avenue, expect 10 minutes delay.</li>
                <li>Passenger assistance needed at Central Park stop.</li>
              </ul>
            </div>
            <button className="action-button">
              View Full Schedule <MdSafetyDivider className="inline-icon" />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Transit Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DriverPage;
