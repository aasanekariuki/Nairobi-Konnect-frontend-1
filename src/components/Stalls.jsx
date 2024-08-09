import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const productImages = [
  'https://media-afr-cdn.oriflame.com/contentImage?externalMediaId=201bc7b3-c2f8-4578-af70-2dfe9523f20f&name=perfumes-1&inputFormat=png',
  'https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/16/360454/1.jpg?1646',
  'https://via.placeholder.com/300x200?text=Product+3',
  'https://via.placeholder.com/300x200?text=Product+4',
  'https://via.placeholder.com/300x200?text=Product+5',
  'https://via.placeholder.com/300x200?text=Product+6',
  'https://via.placeholder.com/300x200?text=Product+7',
  'https://via.placeholder.com/300x200?text=Product+8',
  'https://via.placeholder.com/300x200?text=Product+9',
  'https://via.placeholder.com/300x200?text=Product+10',
  'https://via.placeholder.com/300x200?text=Product+11',
  'https://via.placeholder.com/300x200?text=Product+12',
  'https://via.placeholder.com/300x200?text=Product+13',
  'https://via.placeholder.com/300x200?text=Product+14',
  'https://via.placeholder.com/300x200?text=Product+15',
  'https://via.placeholder.com/300x200?text=Product+16',
  'https://via.placeholder.com/300x200?text=Product+17',
  'https://via.placeholder.com/300x200?text=Product+18',
  'https://via.placeholder.com/300x200?text=Product+19',
  'https://via.placeholder.com/300x200?text=Product+20',
];

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="p-4 border border-gray-700 rounded-lg shadow-lg m-4 w-64 text-center bg-gray-800 hover:bg-gray-700 transition duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-cover rounded-md mb-4 shadow-md"
      />
      <h2 className="text-xl font-semibold mb-2 text-white">{product.name}</h2>
      <p className="mb-2 text-gray-300">{product.description}</p>
      <p className="text-lg font-bold mb-4 text-gray-100">${product.price.toFixed(2)}</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 transition duration-300 flex items-center justify-center space-x-2"
      >
        <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" />
        <span>Add to Cart</span>
      </button>
    </div>
  );
};

const StallsPage = () => {
  const [cart, setCart] = useState([]);

  const products = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: (i + 1) * 10.00,
    description: `This is a description of Product ${i + 1}`,
    image: productImages[i]
  }));

  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  return (
    <div className="gradient-background p-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-white">Stalls Page</h1>
      <div className="flex flex-wrap -m-4 justify-center">
        {products.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
      <div className="mt-8 p-6 border border-gray-600 rounded-lg bg-gray-900 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-white">Cart</h2>
        <ul className="list-disc pl-5 mb-4 text-gray-300">
          {cart.map((item, index) => (
            <li key={index} className="text-lg text-gray-200">{item.name} - ${item.price.toFixed(2)}</li>
          ))}
        </ul>
        <p className="text-xl font-semibold text-white">Total: ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<StallsPage />);

export default StallsPage;
