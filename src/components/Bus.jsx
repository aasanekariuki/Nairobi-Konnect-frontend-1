import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Bus.css'

const BusCompanyCard = ({ img, name, route }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(route);
  };

  return (
    <div className="w-full p-5 transition-transform transform cursor-pointer lg:w-1/3 hover:scale-105">
      <div className="overflow-hidden bg-white rounded-lg shadow-md">
        <img className="object-cover w-full h-48" src={img} alt="Bus Company" />
        <div className="p-6">
          <h2 className="mb-3 text-xl font-semibold text-center">{name}</h2>
          <div className="flex justify-center">
            <button
              onClick={handleNavigation}
              className="px-4 py-2 font-bold text-white bg-blue-400 rounded hover:bg-blue-500"
            >
              View Routes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Buses = () => {
  const companies = [
    { img: 'https://imgs.search.brave.com/HliQfhJGLs20OSrwztxBij-ryjuCzaJj5dqmVUM1ln8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dHVrby5jby5rZS9p/bWFnZXMvMTEyMC82/YjlhYWZmN2U0MmUy/ZTc0LmpwZWc_dj0x', name: 'Super Metro', route: '/company/1' },
    { img: 'https://imgs.search.brave.com/lcmXWzNjZgZy5x0S4VcdxUKUpdo1soPoKVIRGlrZ9Gk/rs:fit:500:0:0:0/g:ce/aHR0cDovL3d3dy5j/aXRpaG9wcGEuY28u/a2UvaW1hZ2VzL2dl/bmVyYWwvQ2l0aWhv/cHBhNi5qcGc', name:'Citti Hoppa', route: '/company/2' },
     { img: 'https://scontent.fnbo15-1.fna.fbcdn.net/v/t39.30808-6/451381119_514629627583249_1621371190230132507_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=HCce9FWkT6MQ7kNvgGREcYZ&_nc_ht=scontent.fnbo15-1.fna&oh=00_AYA4JM_rnfteqyT5ZHkPgaFZYp5nZZoi14qBbXo9ttaUMw&oe=66B82426', name:'MetroTrans', route: '/company/3' },
      { img: 'https://imgs.search.brave.com/kvitufsJPiPABhjJ0Q4IornphH77B_J1dmM3UIn4trM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9nYW4u/Y28ua2Uvd3AtY29u/dGVudC91cGxvYWRz/LzIwMjQvMDIvRWFz/eS1Db2FjaC1idXMt/a2VueWEud2VicA', name:'EasyCocach', route: '/company/4' },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-600">
      <h1 className="mt-16 text-4xl font-medium text-center text-white lg:mt-0">Available Bus Companies</h1>
      <div className="flex flex-wrap justify-center gap-5 mt-14">
        {companies.map((company, index) => (
          <BusCompanyCard key={index} {...company} />
        ))}
      </div>
    </div>
  );
};

export default Buses;