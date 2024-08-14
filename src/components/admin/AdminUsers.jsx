import React from "react";

const AdminUsers = () => {
  // Mock data - replace with actual data from your backend
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
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Manage Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600 font-semibold">Role: {user.role}</p>
            <div className="mt-4">
              <h4 className="text-md font-bold text-blue-500">Activity:</h4>
              <ul className="list-disc ml-5 mt-2">
                {user.activity.map((item, index) => (
                  <li key={index} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;