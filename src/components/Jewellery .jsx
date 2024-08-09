import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';

const productImages = [
  'https://media-afr-cdn.oriflame.com/contentImage?externalMediaId=201bc7b3-c2f8-4578-af70-2dfe9523f20f&name=perfumes-1&inputFormat=png',
  'https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/16/360454/1.jpg?1646',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-zu6pw5nheoJ-7N3NQ0hPzP4treYDnma8cw&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAX3yQjLAMx_eumhguaU-ODpb2kyt87lxseA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWMKjLnHoskVswoialcgGZsTV2MlouYJ8o7Q&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzb-6bIRDnF_6uGAzFV4bi9dqKkQx8NHZ_Ug&s',
  'https://i.ytimg.com/vi/WKD00uAbepk/maxresdefault.jpg',
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

const products = [
  {
    id: 1,
    name: 'Elegant Perfume',
    price: 29.99,
    description: 'A sophisticated fragrance with notes of jasmine and rose.',
    image: productImages[0],
    category: 'Perfumes'
  },
  {
    id: 2,
    name: 'Dress',
    price: 499.99,
    description: 'An amazing dress.',
    image: productImages[1],
    category: 'Clothes'
  },
  {
    id: 3,
    name: 'Shirt',
    price: 199.99,
    description: 'elegant shirt.',
    image: productImages[2],
    category: 'clothes'
  },
  {
    id: 4,
    name: 'Cozy Sweater',
    price: 59.99,
    description: 'A warm and comfortable sweater perfect for chilly days.',
    image: productImages[3],
    category: 'Clothes'
  },
  {
    id: 5,
    name: 'Gourmet Coffee Beans',
    price: 15.99,
    description: 'Freshly roasted coffee beans for the perfect brew.',
    image: productImages[4],
    category: 'Food'
  },
  {
    id: 6,
    name: 'Vintage Necklace',
    price: 89.99,
    description: 'A vintage necklace with intricate design and gem embellishments.',
    image: productImages[5],
    category: 'Jewelry'
  },
  {
    id: 7,
    name: 'High-Resolution Camera',
    price: 799.99,
    description: 'Capture stunning photos with this high-resolution camera.',
    image: productImages[6],
    category: 'Electronics'
  },
  {
    id: 8,
    name: 'Stylish Sunglasses',
    price: 45.99,
    description: 'Trendy sunglasses that offer UV protection and style.',
    image: productImages[7],
    category: 'Clothes'
  },
  
];

const ProductCard = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

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
      <div className="mb-4 flex justify-center items-center space-x-4">
        <button
          onClick={() => setQuantity(Math.max(quantity - 1, 1))}
          className="bg-gray-600 text-white py-1 px-3 rounded hover:bg-gray-700 transition duration-300"
        >
          -
        </button>
        <span className="text-white text-lg">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="bg-gray-600 text-white py-1 px-3 rounded hover:bg-gray-700 transition duration-300"
        >
          +
        </button>
      </div>
      <button
        onClick={() => addToCart({ ...product, quantity })}
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const filteredProducts = products
    .filter(product => 
      (selectedCategory === 'All' || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="gradient-background p-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-white">Stalls Page</h1>

      <div className="mb-8 text-center relative">
        <div className="relative inline-block">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-600 rounded text-black pl-10"
          />
          <FontAwesomeIcon 
            icon={faSearch} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" 
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="ml-4 p-2 border border-gray-600 rounded bg-black text-white"
        >
          <option value="All">All Categories</option>
          <option value="Clothes">Clothes</option>
          <option value="Electronics">Electronics</option>
          <option value="Perfumes">Perfumes</option>
          <option value="Food">Food</option>
          <option value="Jewelry">Jewelry</option>
        </select>
      </div>

      <div className="flex flex-wrap -m-4 justify-center">
        {currentProducts.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>

     
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-4 text-white">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <div className="mt-8 p-6 border border-gray-600 rounded-lg bg-gray-900 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-white">Cart</h2>
        <ul className="list-disc pl-5 mb-4 text-gray-300">
          {cart.map((item, index) => (
            <li key={index} className="text-lg text-gray-200">
              {item.name} - ${item.price.toFixed(2)} x {item.quantity}
            </li>
          ))}
        </ul>
        <p className="text-xl font-semibold text-white">
          Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<StallsPage />);

export default StallsPage;
