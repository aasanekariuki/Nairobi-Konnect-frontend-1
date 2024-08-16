// import React, { useState, useEffect } from "react"; 
// import { SERVER_URL } from '../../../utils';

// const AdminUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [newUser, setNewUser] = useState({
//     username: "",
//     email: "",
//     role: "",
//     password: "",
//   });
//   const [token, setToken] = useState(localStorage.getItem("token"));

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(`${SERVER_URL}/admin`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch users");
//         }

//         const data = await response.json();
//         setUsers(data.users || []);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, [token]);

//   const handleAddUser = async () => {
//     try {
//       const response = await fetch(`${SERVER_URL}/admin`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(newUser),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to add user");
//       }

//       const data = await response.json();
//       setUsers([...users, data.user]);
//       setShowModal(false);
//       setNewUser({ username: "", email: "", role: "", password: "" });
//     } catch (error) {
//       console.error("Error adding user:", error);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     if (window.confirm("Are you sure you want to delete the user?")) {
//       try {
//         const response = await fetch(`${SERVER_URL}/admin/${userId}`, {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to delete user");
//         }

//         setUsers(users.filter((user) => user.id !== userId));
//       } catch (error) {
//         console.error("Error deleting user:", error);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h2 className="text-2xl font-bold text-blue-600 mb-6">Manage Users</h2>

//       <button
//         className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         onClick={() => setShowModal(true)}
//       >
//         Add User
//       </button>

//       {/* Modal for adding a new user */}
//       {showModal && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <h3 className="text-lg font-semibold mb-4">Add a New User</h3>
//             <input
//               type="text"
//               placeholder="Username"
//               value={newUser.username}
//               onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
//               className="w-full mb-2 px-4 py-2 border rounded"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               value={newUser.email}
//               onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//               className="w-full mb-2 px-4 py-2 border rounded"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={newUser.password}
//               onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
//               className="w-full mb-2 px-4 py-2 border rounded"
//             />
//             <select
//               value={newUser.role}
//               onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
//               className="w-full mb-2 px-4 py-2 border rounded"
//             >
//               <option value="">Select Role</option>
//               <option value="Driver">Driver</option>
//               <option value="Seller">Seller</option>
//               <option value="Buyer">Buyer</option>
//               <option value="Passenger">Passenger</option>
//             </select>
//             <button
//               className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               onClick={handleAddUser}
//             >
//               Add User
//             </button>
//             <button
//               className="w-full mt-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//               onClick={() => setShowModal(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Display users */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         {users.map((user) => (
//           <div key={user.id} className="bg-white p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold text-gray-800">{user.username}</h3>
//             <p className="text-gray-600">{user.email}</p>
//             <p className="text-gray-600 font-semibold">Role: {user.role}</p>
//             <div className="mt-4">
//               <button
//                 className="text-red-600 hover:text-red-800"
//                 onClick={() => handleDeleteUser(user.id)}
//               >
//                 Delete User
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminUsers;












import React, { useState } from "react";
import { z } from "zod";

// Zod Schema for validation
const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["Driver", "Buyer", "Seller", "Passenger"]),
});

const AdminUsers = () => {
  const [users, setUsers] = useState([
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
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Driver" });
  const [errors, setErrors] = useState({});

  const handleAddUser = () => {
    try {
      userSchema.parse(newUser); // Validate user data
      setUsers([...users, { ...newUser, id: users.length + 1, activity: [] }]);
      setNewUser({ name: "", email: "", role: "Driver" });
      setShowModal(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(errorMessages);
      }
    }
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete the user?")) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Manage Users</h2>

      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => setShowModal(true)}
      >
        Add User
      </button>

      {/* User List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600 font-semibold">Role: {user.role}</p>
              <div className="mt-2">
                <h4 className="text-md font-bold text-blue-500">Activity:</h4>
                <ul className="list-disc ml-5 mt-2">
                  {user.activity.map((item, index) => (
                    <li key={index} className="text-gray-700">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              className="ml-4 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => handleDeleteUser(user.id)}
            >
              Delete
            </button>
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








