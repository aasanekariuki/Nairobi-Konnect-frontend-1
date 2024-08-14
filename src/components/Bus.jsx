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
    { img: 'https://scontent.fnbo15-1.fna.fbcdn.net/v/t39.30808-6/451381119_514629627583249_1621371190230132507_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=HCce9FWkT6MQ7kNvgGREcYZ&_nc_ht=scontent.fnbo15-1.fna&oh=00_AYA4JM_rnfteqyT5ZHkPgaFZYp5nZZoi14qBbXo9ttaUMw&oe=66B82426', name:'MetroTrans', route: '/company/3' },
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
