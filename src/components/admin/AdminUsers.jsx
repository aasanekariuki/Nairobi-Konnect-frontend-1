import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { FaEllipsisV, FaUserPlus, FaUserMinus } from "react-icons/fa";
import {SERVER_URL} from '../../../utils'

const AdminUsers = () => {
  const [expanded, setExpanded] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Driver", activity: ["Booked a bus ticket", "Updated profile", "Viewed routes"] },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Passenger", activity: ["Signed up", "Booked a bus ticket", "Posted a review"] },
    // Add more users as needed
  ]);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const addUser = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      const addedUser = await response.json();
      setUsers([...users, addedUser]); // Add the new user to the state
      setNewUser({ name: "", email: "", role: "" }); // Clear the input fields
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers(users.filter((user) => user.id !== userId)); // Remove the user from the state
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--primary-color)] p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Manage Users</h2>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search users..."
            className="p-2 rounded-lg shadow-md border border-gray-300 mr-4"
          />
          <button className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600" onClick={() => setShowModal(true)}>
            <FaUserPlus />
            <span className="ml-2">Add User</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-6 rounded-lg shadow-lg relative hover:shadow-xl transition-shadow duration-300">
            <div className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer">
              <FaEllipsisV />
            </div>
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white w-16 h-16 flex items-center justify-center rounded-full mr-4 text-2xl font-semibold">
                {user.name[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                <span className={`text-sm font-semibold inline-block py-1 px-2 rounded-full ${user.role === "Driver" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                  {user.role}
                </span>
              </div>
              <button className="ml-auto bg-red-500 text-white p-2 rounded-lg hover:bg-red-600" onClick={() => deleteUser(user.id)}>
                <FaUserMinus />
                <span className="ml-2">Delete</span>
              </button>
            </div>
            <div className="mt-4">
              <h4 className="text-md font-bold text-blue-500 cursor-pointer" onClick={() => toggleExpand(user.id)}>
                Recent Activity <span className="text-gray-500 text-sm">{expanded === user.id ? "▲" : "▼"}</span>
              </h4>
              {expanded === user.id && (
                <ul className="list-disc ml-5 mt-2 text-gray-700 max-h-24 overflow-y-auto custom-scrollbar">
                  {user.activity.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add New User</h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
              value={newUser.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
              value={newUser.email}
              onChange={handleInputChange}
            />
            <select
              name="role"
              className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
              value={newUser.role}
              onChange={handleInputChange}
            >
              <option value="">Select Role</option>
              <option value="Driver">Driver</option>
              <option value="Passenger">Passenger</option>
            </select>
            <div className="flex justify-end">
              <button
                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 mr-2"
                onClick={addUser}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={() => navigate("/admin")} // Navigate to AdminDashboard
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default AdminUsers;