import React, { useState } from 'react';
import axios from 'axios';

const images = [
  'https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg',
  'https://lh3.googleusercontent.com/UmleRgRVFO1XPWAuoIlmKTcODOx8rKKrPJksb2vejai-8SZzYpraCkLzV-57l3gZIbJ5YKd_NdSroma4kS4K0WoCqoIDTdIDgO4psV5EUtw=s750',
  'https://coolmen.africa/wp-content/uploads/2024/01/Perfume-Shop.jpg',
];

const Seller = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    available_quantity: '',
    shop_name: '',
    location: '',
    image: null,
    imageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setProduct({ ...product, image: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('available_quantity', product.available_quantity);
      formData.append('shop_name', product.shop_name);
      formData.append('location', product.location);
      if (product.image) {
        formData.append('image', product.image); // Append file if provided
      } else {
        formData.append('imageUrl', product.imageUrl); // Append URL if provided
      }

      const response = await axios.post('http://localhost:5000/products', formData);
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert('Error posting product');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-[#F4A460] to-white">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-0 transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${image})`,
              animation: `fade ${images.length * 10}s infinite`,
              animationDelay: `${index * (10 / images.length)}s`,
            }}
          />
        ))}
      </div>
      <div className="relative bg-[#F4A460] text-dark p-6 rounded-3xl shadow-2xl w-full max-w-3xl"> {/* Increased max width */}
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 mr-0 md:mr-4">
            <h2 className="text-center mb-4 font-bold text-[#3E2723] text-xl">Post a New Product</h2>
            <form onSubmit={handleSubmit}>
              {[
                { name: 'name', type: 'text', label: 'Product Name' },
                { name: 'description', type: 'textarea', label: 'Description' },
                { name: 'price', type: 'number', label: 'Price' },
                { name: 'available_quantity', type: 'number', label: 'Available Quantity' },
                { name: 'shop_name', type: 'text', label: 'Shop Name' },
                { name: 'location', type: 'text', label: 'Location' },
              ].map(({ name, type, label }) => (
                <div key={name} className="mb-4">
                  <label className="block text-[#3E2723] text-sm font-medium">{label}</label>
                  {type === 'textarea' ? (
                    <textarea
                      name={name}
                      value={product[name]}
                      onChange={handleChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-lg bg-[#FFF8E1] text-[#3E2723]"
                      required
                    ></textarea>
                  ) : (
                    <input
                      type={type}
                      name={name}
                      value={product[name]}
                      onChange={handleChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-lg bg-[#FFF8E1] text-[#3E2723]"
                      required
                    />
                  )}
                </div>
              ))}
              <div className="mb-4">
                <label className="block text-[#3E2723] text-sm font-medium">Product Image (Upload or URL)</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg bg-[#FFF8E1] text-[#3E2723]"
                />
                <input
                  type="text"
                  name="imageUrl"
                  value={product.imageUrl}
                  onChange={handleChange}
                  placeholder="Or enter image URL"
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-lg bg-[#FFF8E1] text-[#3E2723]"
                />
              </div>
              <div className="grid gap-2">
                <button type="submit" className="flex justify-center items-center w-full h-12 bg-gradient-to-r from-[#FF6F61] to-[#004D40] text-white font-bold rounded-full hover:scale-105 transition-transform">
                  Post Product
                </button>
              </div>
            </form>
          </div>
          <img
            src="https://img.pikbest.com/photo/20240716/orange-line-on-stock-graph-indicates-bearish-trend-and-global-issues_10670625.jpg!f305cw"
            alt="Side Image"
            className="max-w-xs md:max-w-sm rounded-lg object-cover mt-4 md:mt-0"
            style={{ width: '350px', height: '750px' }} // Adjust width as needed
          />
        </div>
      </div>
      <style>
        {`
          @keyframes fade {
            0%, 20%, 100% { opacity: 0; }
            25%, 95% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

export default Seller;