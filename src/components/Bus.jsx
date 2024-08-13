import React from 'react';
import { useNavigate } from 'react-router-dom';

const StallCard = ({ img, name, route }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(route);
  };

  return (
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
