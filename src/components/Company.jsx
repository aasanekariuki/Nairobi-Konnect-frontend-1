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
      onBook(route, selectedTime, price, arrivalTime);
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

  const handleOpenModal = (route, selectedTime, price, arrivalTime) => {
    console.log('Opening modal with:', { route, selectedTime, price, arrivalTime }); // Debugging

    setValue('amount', price); // Set the price in the form
    setValue('departureTime', selectedTime); // Set the departure time in the form
    setValue('seatNumber', generateSeatNumber()); // Generate and set the seat number
    
    // Check if values are correctly set (Debugging)
    console.log('Form values set:', {
        amount: price,
        departureTime: selectedTime,
        seatNumber: generateSeatNumber(),
    });

    setSelectedRoute({ route, departureTime: selectedTime, arrivalTime });
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
                arrivalTime: selectedRoute.arrivalTime,
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
            arrivalTime: selectedRoute.arrivalTime,
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
    <div className="flex flex-col items-center min-h-screen p-6 gradient-background">
      <h1 className="px-6 py-3 mt-24 mb-12 text-4xl font-bold text-center text-black bg-gray-900 rounded-lg shadow-lg bg-opacity-70 text-shadow-md">
        Routes for Company {companyId}
      </h1>
      <div className="flex flex-wrap justify-center gap-5 mt-14">
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
              arrivalTime={route.arrival_time}
              onBook={(route, selectedTime, price, arrivalTime) => handleOpenModal(route, selectedTime, price, arrivalTime)}
              isBooked={bookedRoutes.includes(`${route.origin} to ${route.destination}`)}
            />
          ))
        ) : (
          <p className="text-white">No routes available</p>
        )}
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
            <label className="block mb-1 font-bold text-black">Name</label>
            <input
                {...register('name')}
                className={`w-full px-4 py-2 border rounded-lg shadow-md text-black focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
            <label className="block mb-1 font-bold text-black">Seat Number</label>
            <input
                {...register('seatNumber')}
                className={`w-full px-4 py-2 border rounded-lg shadow-md text-black focus:outline-none ${errors.seatNumber ? 'border-red-500' : 'border-gray-300'}`}
                readOnly
            />
            {errors.seatNumber && <p className="mt-1 text-sm text-red-500">{errors.seatNumber.message}</p>}
        </div>

        <div className="mb-4">
            <label className="block mb-1 font-bold text-black">Amount</label>
            <input
                {...register('amount')}
                className={`w-full px-4 py-2 border rounded-lg shadow-md text-black focus:outline-none ${errors.amount ? 'border-red-500' : 'border-gray-300'}`}
                readOnly
            />
            {errors.amount && <p className="mt-1 text-sm text-red-500">{errors.amount.message}</p>}
        </div>

        <div className="mb-4">
            <label className="block mb-1 font-bold text-black">Departure Time</label>
            <input
                {...register('departureTime')}
                className={`w-full px-4 py-2 border rounded-lg shadow-md text-black focus:outline-none ${errors.departureTime ? 'border-red-500' : 'border-gray-300'}`}
                readOnly
            />
            {errors.departureTime && <p className="mt-1 text-sm text-red-500">{errors.departureTime.message}</p>}
        </div>

        <div className="mb-4">
            <label className="block mb-1 font-bold text-black">M-Pesa Number</label>
            <input
                {...register('mpesaNumber')}
                className={`w-full px-4 py-2 border rounded-lg shadow-md text-black focus:outline-none ${errors.mpesaNumber ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.mpesaNumber && <p className="mt-1 text-sm text-red-500">{errors.mpesaNumber.message}</p>}
        </div>

        <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white transition-all bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
        >
            Book Ticket
        </button>
    </form>
</Modal>

    </div>
  );
};

export default Company;
