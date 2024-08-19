import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const LogoutPage = () => {
    const [isConfirming, setIsConfirming] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleLogout = () => {
        // Clear the user's session
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        
        // Clear user state in context
        setUser(null);

        // Navigate to the login page
        navigate('/login');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-800">
            <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg">
                <h1 className="mb-4 text-3xl font-bold text-gray-800">Logout</h1>
                <p className="mb-6 text-lg text-gray-600">Are you sure you want to log out?</p>
                <button
                    onClick={() => setIsConfirming(true)}
                    className="px-6 py-3 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
                >
                    Yes, Logout
                </button>
                {isConfirming && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                            <h2 className="text-xl font-semibold mb-4">Logout Confirmation</h2>
                            <p className="mb-4">Are you sure you want to log out?</p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
                                >
                                    Yes, Logout
                                </button>
                                <button
                                    onClick={() => setIsConfirming(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LogoutPage;
