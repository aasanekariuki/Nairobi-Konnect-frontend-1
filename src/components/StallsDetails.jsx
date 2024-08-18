import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaCartPlus, FaTrash } from 'react-icons/fa';
import { SERVER_URL } from '../../utils';
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';

const paymentSchema = z.object({
  mpesaNumber: z.string().length(10, { message: 'Invalid Number' }),
});

const StallsDetails = () => {
  const { stallName } = useParams();
  const [cart, setCart] = useState({});
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);  // Add this state to handle payment success

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(paymentSchema),
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const encodedStallName = encodeURIComponent(stallName);
        const response = await fetch(`${SERVER_URL}/products`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
        setProducts([]);  // Ensure products is set to an empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [stallName]);

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
      if (updatedCart[id]) {
        if (updatedCart[id].quantity > 1) {
          updatedCart[id].quantity -= 1;
        } else {
          delete updatedCart[id];
        }
      }
      return updatedCart;
    });
  };

  const totalAmount = Object.values(cart).reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const initiateMpesaPayment = async (mpesaNumber, amount) => {
    try {
      const token = localStorage.getItem('token');

      // Log the token to ensure it's correctly formatted
      console.log('Authorization token:', token);

      if (!token || token.split('.').length !== 3) {
        throw new Error('Invalid token structure');
      }

      const response = await fetch(`${SERVER_URL}/stk_push`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Include the token here
        },
        body: JSON.stringify({
          phone: mpesaNumber,
          amount: amount,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error response from server:', errorMessage);
        throw new Error('Failed to initiate payment');
      }

      const result = await response.json();
      console.log('Payment successful:', result);
      return result;
    } catch (error) {
      console.error('Error during payment:', error.message);
      throw error;
    }
  };
  const handlePaymentSubmit = async (data) => {
    // Parse totalAmount as an integer and ensure it is valid
    const amount = parseInt(totalAmount, 10);

    console.log('Parsed Amount:', amount); // Debug: Log parsed amount
    console.log('M-Pesa Number:', data.mpesaNumber); // Debug: Log M-Pesa number

    if (isNaN(amount) || amount <= 0) {
        console.error('Invalid amount:', totalAmount);
        alert('Invalid amount. Amount must be a positive integer.');
        return;
    }

    const paymentData = {
        phone: data.mpesaNumber,
        amount: amount,  // Ensure amount is an integer
        cart: cart,
    };

    console.log('Payment Data being sent:', paymentData); // Debug: Log payment data before sending

    try {
        const token = localStorage.getItem('token');

        if (!token || token.split('.').length !== 3) {
            throw new Error('Invalid token structure');
        }

        const response = await fetch(`${SERVER_URL}/stk_push`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  // Include the token here
            },
            body: JSON.stringify(paymentData),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Error response from server:', errorMessage);
            throw new Error('Failed to initiate payment');
        }

        const result = await response.json();
        console.log('Payment successful:', result);
        setIsSuccess(true);
        console.log('Payment successful');
        reset(); // Reset the form after successful payment
        setTimeout(() => {
            setShowPaymentForm(false);
            setIsSuccess(false);
        }, 2000); // Close modal after 2 seconds
    } catch (error) {
        console.error('Payment error:', error.message);
    }
};



  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  return (
    <div className="p-8 gradient-background min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-white">{stallName} Products</h1>

      <div className="mt-4 p-4 border border-gray-600 rounded-lg bg-gray-900 shadow-lg mb-8 w-80 mx-auto">
        <h2 className="text-xl font-semibold mb-2 text-white">Cart</h2>
        <ul className="list-disc pl-5 mb-2 text-gray-300">
          {Object.values(cart).map((item) => (
            <li key={item.id} className="text-base text-gray-200 flex items-center justify-between">
              {item.name} - Ksh {item.price.toFixed(2)} x {item.quantity}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
        <p className="text-lg font-semibold text-white mb-2">
          Total: Ksh {totalAmount}
        </p>
        <button
          onClick={() => setShowPaymentForm(true)}
          className="bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700 transition duration-300 text-sm"
        >
          Checkout
        </button>
      </div>

      <div className="flex flex-wrap justify-center">
        {products.length > 0 ? products.map((product) => (
          <div
            key={product.id}
            className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-56 m-4" 
          >
            <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-48"> 
              <img
                src={product.image_url}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4"> 
              <div className="flex items-center justify-between mb-2">
                <p className="block font-sans text-sm font-medium leading-relaxed text-blue-gray-900"> 
                  {product.name}
                </p>
                <p className="block font-sans text-sm font-medium leading-relaxed text-blue-gray-900"> 
                  Ksh {product.price.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button
                onClick={() => addToCart(product)} 
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                type="button">
                Add to Cart
              </button>
            </div>
          </div>
        )) : (
          <p className="text-white text-center">No products found.</p>
        )}
      </div>

      {showPaymentForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-black text-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Payment</h2>
            {isSuccess && (
              <div className="mb-4 text-center text-green-500">
                <p className="text-lg font-semibold">Payment Successful!</p>
              </div>
            )}
            {!isSuccess && (
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
                <p className="text-lg mb-4">Total Amount: Ksh {totalAmount}</p>
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StallsDetails;
