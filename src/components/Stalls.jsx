import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Stalls.css';
import './styles/Login.css';
import { SERVER_URL } from '../../utils';

const StallsCompanyCard = ({ img, name }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/stalls/${encodeURIComponent(name.toLowerCase())}`);
  };

  return (
    <div className="w-full p-6 transition-transform transform cursor-pointer hover:scale-105 hover:shadow-lg rounded-lg">
      <div className="overflow-hidden bg-white rounded-lg shadow-lg">
        <img className="object-cover w-full h-60 rounded-t-lg" src={img} alt={name} />
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-center text-black">{name}</h2>
            <p className="text-sm text-gray-600 mb-4 text-center">
              Explore our stalls and products for the best buyer experience.
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
        </div>
      </div>
    </div>
  );
};

const Stalls = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchStalls = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/stalls`); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error('Error fetching stalls:', error);
      }
    };

    fetchStalls();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen p-8 gradient-background">
      <h1 className="text-5xl font-bold text-center text-white mb-16 mt-12">
        Available Stalls
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {companies.map((company, index) => (
          <StallsCompanyCard key={index} img={company.image_url} name={company.stall_name} />
        ))}
      </div>
    </div>
  );
};

export default Stalls;
