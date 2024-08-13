import React from 'react';
import { useNavigate } from 'react-router-dom';

const StallCard = ({ img, name, route }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(route);
  };

  return (

    <div className="w-full p-6 transition-transform transform cursor-pointer lg:w-1/3 hover:scale-105 hover:shadow-lg rounded-lg">
      <div className="overflow-hidden bg-black rounded-lg shadow-lg">
        <img className="object-cover w-full h-60 rounded-t-lg" src={img} alt="Bus Company" />
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-center text-blue-500">{name}</h2>
            <p className="text-white sm text- mb-4 text-center">
              Explore our routes and services for the best travel experience.
            </p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleNavigation}
              className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all"
            >
              Go to {name}
            </button>
          </div>

    <div
      onClick={handleNavigation}
      className="transform transition-transform duration-300 cursor-pointer hover:scale-105"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
        <img className="w-full h-48 object-cover" src={img} alt={name} />
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition-colors duration-300">
            Explore {name}
          </button>

        </div>
      </div>
    </div>
  );
};

const Stalls = () => {
  const stalls = [
    { img: 'https://example.com/stall1.jpg', name: 'Fresh Produce Market', route: '/stall/1' },
    { img: 'https://example.com/stall2.jpg', name: 'Artisan Crafts', route: '/stall/2' },
    { img: 'https://example.com/stall3.jpg', name: 'Local Bakery', route: '/stall/3' },
    { img: 'https://example.com/stall4.jpg', name: 'Flower Shop', route: '/stall/4' },
    { img: 'https://example.com/stall5.jpg', name: 'Handmade Jewelry', route: '/stall/5' },
    { img: 'https://example.com/stall6.jpg', name: 'Organic Spices', route: '/stall/6' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Explore Our Stalls</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {stalls.map((stall, index) => (
          <StallCard key={index} {...stall} />
        ))}
      </div>
    </div>
  );
};

export default Stalls;
