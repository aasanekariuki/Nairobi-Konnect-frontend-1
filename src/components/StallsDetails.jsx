import React from 'react';
import { useParams } from 'react-router-dom';

const stallData = {
  clothes: {
    img: 'https://basildonmarket.co.uk/wp-content/uploads/2021/06/ClothesShop-2.jpg',
    description: 'Discover a wide range of stylish and affordable clothing at our Clothes stall. From casual wear to formal attire, we have something for everyone.',
  },
  electronics: {
    img: 'https://c8.alamy.com/comp/KE4MYN/electronics-outlet-in-tottenham-court-road-london-uk-KE4MYN.jpg',
    description: 'Explore the latest gadgets and electronic devices at our Electronics stall. Find top-quality products from leading brands.',
  },
  food: {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-RJI8NetYBMOO0Uyk05mklNxST2zwHwSboA&s',
    description: 'Savor delicious and fresh food items at our Food stall. We offer a variety of snacks, meals, and beverages to satisfy your cravings.',
  },
  jewellery: {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtLR5F84bq9F1OnOhCP2_er4nu0xl02OsKJw&s',
    description: 'Find exquisite and elegant jewellery pieces at our Jewellery stall. Whether you’re looking for gold, silver, or diamond, we have it all.',
  },
  perfumes: {
    img: 'https://pictures-kenya.jijistatic.com/51888523_NjIwLTQ2NS1hMzA3NDkyOWZj.webp',
    description: 'Indulge in luxurious fragrances at our Perfumes stall. Discover a variety of scents that suit every occasion and personality.',
  },
  shoes: {
    img: 'https://i.ytimg.com/vi/iqY7K-LqQSQ/maxresdefault.jpg',
    description: 'Step into style with our collection of shoes at the Shoes stall. From casual sneakers to formal shoes, we have the perfect pair for you.',
  },
};

const StallDetails = () => {
  const { stallName } = useParams();

  // Retrieve the details for the current stall
  const stall = stallData[stallName.toLowerCase()];

  if (!stall) {
    return <div>Stall not found</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-custom-blue p-8">
      <h1 className="text-5xl font-bold text-center text-white mb-16 mt-12">
        {stallName.charAt(0).toUpperCase() + stallName.slice(1)} Stall
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <img src={stall.img} alt={stallName} className="w-full h-96 object-cover rounded-lg mb-6" />
        <p className="text-lg text-gray-700">{stall.description}</p>
      </div>
    </div>
  );
};

export default StallDetails;
