import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

const AdminUsers = () => {
  const [expanded, setExpanded] = useState(null);

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Driver",
      activity: ["Booked a bus ticket", "Updated profile", "Viewed routes"],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Passenger",
      activity: ["Signed up", "Booked a bus ticket", "Posted a review"],
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Driver",
      activity: ["Completed a trip", "Earned a bonus", "Requested time off"],
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bob@example.com",
      role: "Passenger",
      activity: ["Booked a bus ticket", "Canceled a trip", "Reported an issue"],
    },
    {
      id: 5,
      name: "Charlie Green",
      email: "charlie@example.com",
      role: "Driver",
      activity: ["Accepted a trip", "Rated a passenger", "Earned a badge"],
    },
    {
      id: 6,
      name: "Diana Prince",
      email: "diana@example.com",
      role: "Passenger",
      activity: ["Booked a bus ticket", "Wrote a review", "Referred a friend"],
    },
    {
      id: 7,
      name: "Ethan Hunt",
      email: "ethan@example.com",
      role: "Driver",
      activity: ["Completed a trip", "Received a compliment", "Updated availability"],
    },
    {
      id: 8,
      name: "Fiona Apple",
      email: "fiona@example.com",
      role: "Passenger",
      activity: ["Booked a bus ticket", "Gave feedback", "Joined a group"],
    },
    {
      id: 9,
      name: "George Clooney",
      email: "george@example.com",
      role: "Driver",
      activity: ["Completed a trip", "Earned a bonus", "Reviewed a passenger"],
    },
    {
      id: 10,
      name: "Hannah Montana",
      email: "hannah@example.com",
      role: "Passenger",
      activity: ["Booked a bus ticket", "Changed preferences", "Rated a driver"],
    },
    {
      id: 11,
      name: "Ian Malcolm",
      email: "ian@example.com",
      role: "Passenger",
      activity: ["Booked a bus ticket", "Reported an issue", "Updated profile"],
    },
    {
      id: 12,
      name: "Jack Sparrow",
      email: "jack@example.com",
      role: "Driver",
      activity: ["Completed a trip", "Received a rating", "Updated vehicle info"],
    },
    {
      id: 13,
      name: "Katy Perry",
      email: "katy@example.com",
      role: "Passenger",
      activity: ["Booked a bus ticket", "Wrote a review", "Shared a trip"],
    },
    {
      id: 14,
      name: "Leonardo DiCaprio",
      email: "leo@example.com",
      role: "Driver",
      activity: ["Completed a trip", "Earned a badge", "Updated schedule"],
    },
    {
      id: 15,
      name: "Miley Cyrus",
      email: "miley@example.com",
      role: "Passenger",
      activity: ["Booked a bus ticket", "Joined a group", "Rated a driver"],
    },
  ];

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[var(--primary-color)] p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Manage Users</h2>
        <input
          type="text"
          placeholder="Search users..."
          className="p-2 rounded-lg shadow-md border border-gray-300"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-6 rounded-lg shadow-lg relative hover:shadow-xl transition-shadow duration-300"
          >
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
                <span
                  className={`text-sm font-semibold inline-block py-1 px-2 rounded-full ${
                    user.role === "Driver"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {user.role}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <h4
                className="text-md font-bold text-blue-500 cursor-pointer"
                onClick={() => toggleExpand(user.id)}
              >
                Recent Activity{" "}
                <span className="text-gray-500 text-sm">
                  {expanded === user.id ? "▲" : "▼"}
                </span>
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

      {/* Modal for Adding User */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Add New User</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className={`w-full p-2 border rounded ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className={`w-full p-2 border rounded ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <select
                className={`w-full p-2 border rounded ${
                  errors.role ? "border-red-500" : "border-gray-300"
                }`}
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="Driver">Driver</option>
                <option value="Buyer">Buyer</option>
                <option value="Seller">Seller</option>
                <option value="Passenger">Passenger</option>
              </select>
              {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
            </div>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-gray-900 rounded hover:bg-gray-900"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-black rounded hover:bg-blue-700"
                onClick={handleAddUser}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;








