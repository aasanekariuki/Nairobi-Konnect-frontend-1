import React, { useState } from 'react';
import axios from 'axios';

const images = [
  'https://www.esi-africa.com/wp-content/uploads/2023/05/basigo-metrotrans.jpeg',
  'https://www.techarena.co.ke/wp-content/uploads/2022/11/BasiGo.jpg',
  'https://nnmedia.nation.africa/uploads/2023/06/Electric-Bus.jpg',
  'https://i.ytimg.com/vi/EpAHcV-xPOg/maxresdefault.jpg',
];

const Driver = () => {
  const [route, setRoute] = useState({
    start_location: '',
    end_location: '',
    departure_time: '',
    arrival_time: '',
  });

  const [tickets, setTickets] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoute({ ...route, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/routes', route);
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
    <div className="position-relative min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(to right, #F4A460, #FFFFFF)' }}>
      <div className="position-absolute top-0 left-0 w-100 h-100 overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className="slideshow-image"
            style={{
              backgroundImage: `url(${image})`,
              animation: `fade ${images.length * 10}s infinite`,
              opacity: 0,
              animationDelay: `${index * (10 / images.length)}s`,
            }}
          />
        ))}
      </div>
      <div className="position-relative bg-custom text-dark p-5 rounded-3xl shadow-2xl w-100" style={{ maxWidth: '800px', margin: '0 auto', borderRadius: '2rem', backgroundColor: '#ADD8E6' }}>
        <img src="https://cdn.pixabay.com/photo/2019/02/06/10/09/driver-3978839_1280.jpg" alt="Logo" className="logo-image mb-4" />
        <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#3E2723' }}>Welcome, Driver</h2>
        <div className="d-flex flex-column flex-md-row">
          <div style={{ flex: 1, marginRight: '2rem' }}>
            <h3 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#3E2723' }}>Add a New Route</h3>
            <form onSubmit={handleSubmit}>
              {[
                { name: 'start_location', type: 'text', label: 'Start Location' },
                { name: 'end_location', type: 'text', label: 'End Location' },
                { name: 'departure_time', type: 'datetime-local', label: 'Departure Time' },
                { name: 'arrival_time', type: 'datetime-local', label: 'Arrival Time' }
              ].map(({ name, type, label }) => (
                <div key={name} className="mb-3">
                  <label className="form-label" style={{ fontSize: '1.1rem', color: '#3E2723' }}>{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={route[name]}
                    onChange={handleChange}
                    className="form-control rounded-lg"
                    required
                    style={{ backgroundColor: '#FFF8E1', color: '#3E2723', borderRadius: '1rem' }}
                  />
                </div>
              ))}
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-custom rounded-full">
                  Add Route
                </button>
              </div>
            </form>
          </div>
          <div style={{ flex: 1 }}>
            <h3 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#3E2723' }}>View Booked Seats & Tickets</h3>
            <button onClick={fetchTickets} className="btn btn-custom rounded-full mb-4">
              Fetch Tickets
            </button>
            {tickets.length > 0 ? (
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {tickets.map((ticket, index) => (
                  <div key={index} className="card mb-3" style={{ backgroundColor: '#FFF8E1', color: '#3E2723', borderRadius: '1rem' }}>
                    <div className="card-body">
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
          .slideshow-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            opacity: 0;
            transition: opacity 1s ease-in-out;
          }

          @keyframes fade {
            0%, 20%, 100% { opacity: 0; }
            25%, 95% { opacity: 1; }
          }

          .bg-custom {
            background-color: #ADD8E6;
          }

          .btn-custom {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 13rem;
            overflow: hidden;
            height: 3rem;
            background-size: 300% 300%;
            backdrop-filter: blur(1rem);
            border-radius: 2rem;
            transition: 0.5s;
            animation: gradient_301 5s ease infinite;
            border: none;
            background-image: linear-gradient(137.48deg, #FF6F61 10%, #004D40 45%);
            margin-top: 20px;
            color: white;
            font-weight: bold;
          }

          .btn-custom:hover {
            transform: scale(1.1);
            color: white;
          }

          .btn-custom:active {
            border: double 4px #00251a;
            background-origin: border-box;
            background-clip: content-box, border-box;
            animation: none;
          }

          @keyframes gradient_301 {
            0% {
              background-position: 0% 50%;
            }

            50% {
              background-position: 100% 50%;
            }

            100% {
              background-position: 0% 50%;
            }
          }

          .logo-image {
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 100px; /* Set width */
            height: 100px; /* Set height to the same value for a circle */
            border-radius: 50%; /* Make it circular */
            transition: transform 0.3s ease;
          }

          .logo-image:hover {
            transform: scale(1.1);
          }
        `}
      </style>
    </div>
  );
}

export default Driver;
