import React from 'react';
import { useNavigate } from 'react-router-dom';

// BusCompanyCard Component
const BusCompanyCard = ({ img, name, route }) => {
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
          <p className="text-sm text-gray-600 mt-2">
            Explore our routes and services for the best travel experience.
          </p>
          <button
            onClick={handleNavigation}
            className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition-colors duration-300"
          >
            Explore {name}
          </button>
        </div>
      </div>
    </div>
  );
};

// Buses Component
const Buses = () => {
  const companies = [
    { img: 'https://imgs.search.brave.com/HliQfhJGLs20OSrwztxBij-ryjuCzaJj5dqmVUM1ln8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dHVrby5jby5rZS9p/bWFnZXMvMTEyMC82/YjlhYWZmN2U0MmUy/ZTc0LmpwZWc_dj0x', name: 'Super Metro', route: '/company/1' },
    { img: 'https://imgs.search.brave.com/lcmXWzNjZgZy5x0S4VcdxUKUpdo1soPoKVIRGlrZ9Gk/rs:fit:500:0:0:0/g:ce/aHR0cDovL3d3dy5j/aXRpaG9wcGEuY28u/a2UvaW1hZ2VzL2dl/bmVyYWwvQ2l0aWhv/cHBhNi5qcGc', name:'Citti Hoppa', route: '/company/2' },
    { img: 'data:image/jpeg;base64,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', name:'MetroTrans', route: '/company/3' },
    { img: 'https://imgs.search.brave.com/kvitufsJPiPABhjJ0Q4IornphH77B_J1dmM3UIn4trM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9nYW4u/Y28ua2Uvd3AtY29u/dGVudC91cGxvYWRz/LzIwMjQvMDIvRWFz/eS1Db2FjaC1idXMt/a2VueWEud2VicA', name:'EasyCoach', route: '/company/4' },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-custom-blue p-8">
      <h1 className="text-5xl font-bold text-center text-white mb-16 mt-12"> 
        Available Bus Companies
      </h1>
      <div className="flex flex-wrap justify-center gap-8">
        {companies.map((company, index) => (
          <BusCompanyCard key={index} {...company} />
        ))}
      </div>
    </div>
  );
};

export default Buses;
