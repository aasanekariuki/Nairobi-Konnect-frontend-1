import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the backend API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users'); // Adjust the URL as needed
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error('Unexpected data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex h-screen" style={{ backgroundColor: 'var(--primary-color)' }}>
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-gray-800 text-white">
        <div className="h-full px-3 py-4 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <ul className="space-y-2 font-medium">
            <li>
              <Link to="/admin/activity" className="flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-700">
                <span className="ms-3">View Activity</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-700">
                <span className="ms-3">Manage Users</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="flex-1 ml-64 p-6">
        {/* Add an image for visual appeal */}
        <img 
          src="https://media.cnn.com/api/v1/images/stellar/prod/230202121817-basigo-electric-bus-nairobi-kenya-2.jpg?c=original" // Replace with your image URL
          alt="Admin Dashboard Visual"
          className="mb-4 rounded-lg shadow-lg w-full h-auto" // Make the image responsive
        />
        <Outlet /> {/* This will render the nested routes for View Activity and Manage Users */}
      </div>
    </div>
  );
};

export default AdminDashboard;