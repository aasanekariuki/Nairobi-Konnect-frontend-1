import React from 'react';
import { useNavigate } from 'react-router-dom';

const StallsCompanyCard = ({ img, name }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    // Navigate to the stall details page
    navigate(`/stalls/${encodeURIComponent(name.toLowerCase())}`);
  };

  return (
    <div className="w-full p-6 transition-transform transform cursor-pointer hover:scale-105 hover:shadow-lg rounded-lg">
      <div className="overflow-hidden bg-white rounded-lg shadow-lg">
        <img className="object-cover w-full h-60 rounded-t-lg" src={img} alt={name} />
        <div className="p-6 flex flex-col justify-between">
          <h2 className="mb-3 text-2xl font-semibold text-center text-black">{name}</h2>
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
  const companies = [
    { img: 'https://basildonmarket.co.uk/wp-content/uploads/2021/06/ClothesShop-2.jpg', name: 'Clothes' },
    { img: 'https://c8.alamy.com/comp/KE4MYN/electronics-outlet-in-tottenham-court-road-london-uk-KE4MYN.jpg', name: 'Electronics' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-RJI8NetYBMOO0Uyk05mklNxST2zwHwSboA&s', name: 'Food' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtLR5F84bq9F1OnOhCP2_er4nu0xl02OsKJw&s', name: 'Jewellery' },
    { img: 'https://pictures-kenya.jijistatic.com/51888523_NjIwLTQ2NS1hMzA3NDkyOWZj.webp', name: 'Perfumes' },
    { img: 'https://i.ytimg.com/vi/iqY7K-LqQSQ/maxresdefault.jpg', name: 'Shoes' },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-custom-blue p-8">
      <h1 className="text-5xl font-bold text-center text-white mb-16 mt-12">
        Available Stalls
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {companies.map((company, index) => (
          <StallsCompanyCard key={index} {...company} />
        ))}
      </div>
    </div>
  );
};

export default Stalls;
