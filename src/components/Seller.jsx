import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { FiShoppingBag, FiUsers, FiShoppingCart, FiDollarSign } from 'react-icons/fi';
import { AiOutlineHome, AiOutlineOrderedList, AiOutlineUser, AiOutlineBarChart, AiOutlineSetting } from 'react-icons/ai';
import { BiStore } from 'react-icons/bi';

function App() {
  const [revenue, setRevenue] = useState(0);
  const [totalProductsSold, setTotalProductsSold] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [salesData, setSalesData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Fetch revenue data
    fetch('http://localhost:5000/api/revenue')
      .then(response => response.json())
      .then(data => setRevenue(data.totalRevenue))
      .catch(error => console.error('Error fetching revenue:', error));

    // Fetch total products sold
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setTotalProductsSold(data.totalProductsSold))
      .catch(error => console.error('Error fetching products:', error));

    // Fetch total customers
    fetch('http://localhost:5000/api/customers')
      .then(response => response.json())
      .then(data => setTotalCustomers(data.totalCustomers))
      .catch(error => console.error('Error fetching customers:', error));

    // Fetch total orders
    fetch('http://localhost:5000/api/orders')
      .then(response => response.json())
      .then(data => setTotalOrders(data.totalOrders))
      .catch(error => console.error('Error fetching orders:', error));

    // Fetch sales data for the chart
    fetch('http://localhost:5000/api/sales')
      .then(response => response.json())
      .then(data => {
        setSalesData({
          labels: data.months,
          datasets: [
            {
              label: 'Total Sales ($)',
              data: data.sales,
              fill: false,
              backgroundColor: 'rgba(0, 39, 77, 0.2)',
              borderColor: '#00274d',
              tension: 0.4,
            },
          ],
        });
      })
      .catch(error => console.error('Error fetching sales data:', error));
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 border-r border-gray-200">
        <div className="flex items-center mb-8">
          <BiStore className="text-3xl text-red-500" />
          <h2 className="ml-3 text-2xl font-bold text-gray-800">NairobiKonnect</h2>
        </div>
        <nav className="space-y-4">
          <a href="#home" className="flex items-center text-red-500">
            <AiOutlineHome className="mr-3" /> Home
          </a>
          <a href="#products" className="flex items-center text-gray-600 hover:text-red-500">
            <FiShoppingBag className="mr-3" /> Products
          </a>
          <a href="#orders" className="flex items-center text-gray-600 hover:text-red-500">
            <AiOutlineOrderedList className="mr-3" /> Orders
          </a>
          <a href="#customers" className="flex items-center text-gray-600 hover:text-red-500">
            <FiUsers className="mr-3" /> Customers
          </a>
          <a href="#analytics" className="flex items-center text-gray-600 hover:text-red-500">
            <AiOutlineBarChart className="mr-3" /> Analytics
          </a>
          <a href="#settings" className="flex items-center text-gray-600 hover:text-red-500">
            <AiOutlineSetting className="mr-3" /> Store settings
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Hi, Jane Doe</h3>
                <p className="text-sm text-gray-500">Access your store here</p>
              </div>
              <img
                src="https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/assets/media/images/en/websiteQRCode_noFrame.png"
                alt="QR Code"
                className="w-20 h-20"
              />
            </div>
            <div className="mt-6 flex space-x-4">
              <button className="bg-red-500 text-white py-2 px-4 rounded-lg">Visit store</button>
              <button className="border border-red-500 text-red-500 py-2 px-4 rounded-lg">Copy store link</button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h4 className="text-sm text-gray-500">Total products sold</h4>
                <p className="text-2xl font-bold text-gray-700">{totalProductsSold}</p>
                <p className="text-xs text-green-500">+80% than last month</p>
              </div>
              <FiShoppingBag className="text-3xl text-yellow-500" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h4 className="text-sm text-gray-500">Total sales</h4>
                <p className="text-2xl font-bold text-gray-700">${revenue.toLocaleString()}</p>
                <p className="text-xs text-green-500">+65% than last month</p>
              </div>
              <FiDollarSign className="text-3xl text-green-500" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h4 className="text-sm text-gray-500">Total customers</h4>
                <p className="text-2xl font-bold text-gray-700">{totalCustomers}</p>
                <p className="text-xs text-red-500">-10% than last month</p>
              </div>
              <FiUsers className="text-3xl text-red-500" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h4 className="text-sm text-gray-500">Total orders</h4>
                <p className="text-2xl font-bold text-gray-700">{totalOrders}</p>
                <p className="text-xs text-purple-500">-5% than last month</p>
              </div>
              <FiShoppingCart className="text-3xl text-purple-500" />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold text-gray-700 mb-4">Total sales</h4>
            {/* Fixing the height issue */}
            <div className="h-64">
              <Line data={salesData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold text-gray-700 mb-4">Top products</h4>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-700">Nike blazer</span>
                <span className="font-bold">25 sold</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">Nike sb zoom</span>
                <span className="font-bold">15 sold</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">Nike blazer suede</span>
                <span className="font-bold">10 sold</span>
              </li>
            </ul>
            <a href="#" className="block text-red-500 mt-4">View all</a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
