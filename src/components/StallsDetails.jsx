import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaCartPlus, FaTrash } from 'react-icons/fa';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';


const paymentSchema = z.object({
  mpesaNumber: z.string().length(10, { message: 'M-Pesa number must be exactly 10 digits' }),
});

const StallsDetails = () => {
  const { stallName } = useParams();
  const [cart, setCart] = useState({});
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const products = {
    clothes: [
      { id: 1, name: 'T-Shirt', price: 25, image: 'https://via.placeholder.com/300x200?text=T-Shirt' },
      { id: 2, name: 'Jeans', price: 40, image: 'https://via.placeholder.com/300x200?text=Jeans' },
    ],
    electronics: [
      { id: 1, name: 'Smartphone', price: 699, image: 'https://via.placeholder.com/300x200?text=Smartphone' },
      { id: 2, name: 'Laptop', price: 1200, image: 'https://via.placeholder.com/300x200?text=Laptop' },
    ],
    food: [
      { id: 1, name: 'Apple', price: 1, image: 'https://via.placeholder.com/300x200?text=Apple' },
      { id: 2, name: 'Bread', price: 2, image: 'https://via.placeholder.com/300x200?text=Bread' },
    ],
    jewellery: [
      { id: 1, name: 'Necklace', price: 150, image: 'https://via.placeholder.com/300x200?text=Necklace' },
      { id: 2, name: 'Ring', price: 200, image: 'https://via.placeholder.com/300x200?text=Ring' },
    ],
    perfumes: [
      { id: 1, name: 'Eau de Parfum', price: 80, image: 'https://via.placeholder.com/300x200?text=Eau+de+Parfum' },
      { id: 2, name: 'Cologne', price: 50, image: 'https://via.placeholder.com/300x200?text=Cologne' },
    ],
    shoes: [
      { id: 1, name: 'Sneakers', price: 60, image: 'https://via.placeholder.com/300x200?text=Sneakers' },
      { id: 2, name: 'Boots', price: 100, image: 'https://via.placeholder.com/300x200?text=Boots' },
    ],
  };

  const selectedProducts = products[stallName.toLowerCase()] || [];

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingQuantity = prevCart[product.id]?.quantity || 0;
      return {
        ...prevCart,
        [product.id]: {
          ...product,
          quantity: existingQuantity + 1,
        },
      };
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[id].quantity > 1) {
        updatedCart[id].quantity -= 1;
      } else {
        delete updatedCart[id];
      }
      return updatedCart;
    });
  };

  const totalAmount = Object.values(cart).reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(paymentSchema),
  });

  const handlePaymentSubmit = (data) => {
    console.log('Payment details:', data);
    // Handle payment logic here
  };

  return (
    <div className="p-8 gradient-background min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-white">{stallName} Products</h1>
      <div className="flex flex-wrap -m-4 justify-center">
        {selectedProducts.map((product) => (
          <div key={product.id} className="p-4 border border-gray-700 rounded-lg shadow-lg m-4 w-64 text-center bg-gray-800 hover:bg-gray-700 transition duration-300">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover rounded-md mb-4 shadow-md"
            />
            <h2 className="text-xl font-semibold mb-2 text-white">{product.name}</h2>
            <p className="text-lg font-bold mb-4 text-gray-100">${product.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-green-700 transition duration-300"
            >
              <FaCartPlus className="mr-2" /> Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 p-6 border border-gray-600 rounded-lg bg-gray-900 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-white">Cart</h2>
        <ul className="list-disc pl-5 mb-4 text-gray-300">
          {Object.values(cart).map((item) => (
            <li key={item.id} className="text-lg text-gray-200 flex items-center justify-between">
              {item.name} - ${item.price.toFixed(2)} x {item.quantity}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
        <p className="text-xl font-semibold text-white mb-4">
          Total: ${totalAmount}
        </p>
        <button
          onClick={() => setShowPaymentForm(true)}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Checkout
        </button>
      </div>

      {/* Payment Form Popup */}
      {showPaymentForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-black text-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Payment</h2>
            <form onSubmit={handleSubmit(handlePaymentSubmit)} className="space-y-4">
              <div className="mb-4">
                <label htmlFor="mpesaNumber" className="block text-sm font-medium">M-Pesa Number</label>
                <input
                  id="mpesaNumber"
                  type="text"
                  {...register('mpesaNumber')}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                />
                {errors.mpesaNumber && (
                  <p className="mt-1 text-red-500 text-sm">{errors.mpesaNumber.message}</p>
                )}
              </div>
              <p className="text-lg mb-4">Total Amount: ${totalAmount}</p>
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Pay Now
              </button>
              <button
                type="button"
                onClick={() => setShowPaymentForm(false)}
                className="ml-4 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StallsDetails;
