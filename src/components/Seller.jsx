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
    <div className="position-relative min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(to right, #F4A460, #FFFFFF)' }}>
      <div className="position-absolute top-0 left-0 w-100 h-100 overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className="slideshow-image"
            style={{
              backgroundImage: `url(${image})`,
              animation: `fade ${images.length * 10}s infinite`,
              opacity: 0,
              animationDelay: `${index * (10 / images.length)}s`,
            }}
          />
        ))}
      </div>
      <div className="position-relative bg-custom text-dark p-3 rounded-3xl shadow-2xl w-100" style={{ maxWidth: '600px', margin: '0 auto', borderRadius: '1rem' }}>
        <div className="d-flex flex-column flex-md-row">
          <div style={{ flex: 1, marginRight: '1rem' }}>
            <h2 className="text-center mb-3" style={{ fontWeight: 'bold', color: '#3E2723', fontSize: '1.5rem' }}>Post a New Product</h2>
            <form onSubmit={handleSubmit}>
              {[
                { name: 'name', type: 'text', label: 'Product Name' },
                { name: 'description', type: 'textarea', label: 'Description' },
                { name: 'price', type: 'number', label: 'Price' },
                { name: 'available_quantity', type: 'number', label: 'Available Quantity' },
                { name: 'shop_name', type: 'text', label: 'Shop Name' },
                { name: 'location', type: 'text', label: 'Location' },
              ].map(({ name, type, label }) => (
                <div key={name} className="mb-2">
                  <label className="form-label" style={{ fontSize: '1rem', color: '#3E2723' }}>{label}</label>
                  {type === 'textarea' ? (
                    <textarea
                      name={name}
                      value={product[name]}
                      onChange={handleChange}
                      className="form-control rounded-lg"
                      required
                      style={{ backgroundColor: '#FFF8E1', color: '#3E2723', borderRadius: '1rem' }}
                    ></textarea>
                  ) : (
                    <input
                      type={type}
                      name={name}
                      value={product[name]}
                      onChange={handleChange}
                      className="form-control rounded-lg"
                      required
                      style={{ backgroundColor: '#FFF8E1', color: '#3E2723', borderRadius: '1rem' }}
                    />
                  )}
                </div>
              ))}
              <div className="mb-2">
                <label className="form-label" style={{ fontSize: '1rem', color: '#3E2723' }}>Product Image (Upload or URL)</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="form-control rounded-lg"
                  style={{ backgroundColor: '#FFF8E1', color: '#3E2723', borderRadius: '1rem' }}
                />
                <input
                  type="text"
                  name="imageUrl"
                  value={product.imageUrl}
                  onChange={handleChange}
                  placeholder="Or enter image URL"
                  className="form-control rounded-lg mt-2"
                  style={{ backgroundColor: '#FFF8E1', color: '#3E2723', borderRadius: '1rem' }}
                />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-custom rounded-full">
                  Post Product
                </button>
              </div>
            </form>
          </div>
          <img src="https://img.pikbest.com/photo/20240716/orange-line-on-stock-graph-indicates-bearish-trend-and-global-issues_10670625.jpg!f305cw" alt="Side Image" style={{ maxWidth: '300px', borderRadius: '1rem', objectFit: 'cover' }} />
        </div>
      </div>
      <style>
        {`
          .slideshow-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            opacity: 0;
            transition: opacity 1s ease-in-out;
          }

          @keyframes fade {
            0%, 20%, 100% { opacity: 0; }
            25%, 95% { opacity: 1; }
          }

          .bg-custom {
            background-color: #F4A460;
          }

          .btn-custom {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 13rem;
            overflow: hidden;
            height: 3rem;
            background-size: 300% 300%;
            backdrop-filter: blur(1rem);
            border-radius: 2rem;
            transition: 0.5s;
            animation: gradient_301 5s ease infinite;
            border: none; /* Remove border */
            background-image: linear-gradient(137.48deg, #FF6F61 10%, #004D40 45%); /* Bright coral to dark teal */
            margin-top: 10px; /* Reduced margin */
            color: white; /* Text color */
            font-weight: bold; /* Make text bolder */
          }

          .btn-custom:hover {
            transform: scale(1.1);
            color: white;
          }

          .btn-custom:active {
            border: double 4px #00251a; /* Even darker teal on click */
            background-origin: border-box;
            background-clip: content-box, border-box;
            animation: none;
          }

          @keyframes gradient_301 {
            0% {
              background-position: 0% 50%;
            }

            50% {
              background-position: 100% 50%;
            }

            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Seller;
