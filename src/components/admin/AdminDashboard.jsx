import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get('/api/users'); 
				console.log(response);
			} catch (error) {
				console.error('Error fetching users', error);
			}
		};

		fetchUsers();
	}, []);

	return (
		<div className="p-6">
			<button data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
    <span class="sr-only">Open sidebar</span>
    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
    </svg>
</button>

<aside id="separator-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul class="space-y-2 font-medium">
            <li>
                <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 22 21">
                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                    </svg>
                    <span class="ms-3">Dashboard</span>
                </a>
            </li>
            <li>
                <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 18 18">
                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                    </svg>
                    <span class="flex-1 ms-3 whitespace-nowrap">Kanban</span>
                    <span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
                </a>
            </li>
            <li>
                <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span class="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                    <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                </a>
            </li>
            <li>
                <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h6.684a2.97 2.97 0 0 1-.184-1v-2a6.957 6.957 0 0 1 2.264-4Zm11.5 1h1a1 1 0 0 0 1-1V9a5.006 5.006 0 0 0-5-5H9v1a1 1 0 0 0-1 1v2a6.957 6.957 0 0 1-1.264 4H8a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2.684a2.97 2.97 0 0 1-.184-1v-2a6.957 6.957 0 0 1 2.264-4Zm-3.683 5a1 1 0 0 1-1-1v-2a6.957 6.957 0 0 1 2.264-4H8v-1a1 1 0 0 1 1-1h6.682a4.978 4.978 0 0 0 4.82-3.854A7.979 7.979 0 0 0 17.5 7a7.979 7.979 0 0 0-3.64.846 5 5 0 0 0 1.986 4.706c.015.013.029.027.045.041a1 1 0 0 1 .06 1.46l-.008.009A1 1 0 0 1 13.817 15h-2.982a1 1 0 0 1-.883-.542l-.126-.264ZM4.5 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/>
                    </svg>
                    <span class="flex-1 ms-3 whitespace-nowrap">Products</span>
                </a>
            </li>
            <li>
                <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M7 5H4v6h3V7a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1ZM6 7H5V6h1v1Zm0 3H5V8h1v2Zm7.556 1.662A7.452 7.452 0 0 0 14 8a7.452 7.452 0 0 0-1.444 2.662A8.978 8.978 0 0 0 14 8a8.978 8.978 0 0 0-1.444 2.662Zm-3.912-2.596c0 .128-.035.272-.107.388l-3.17 4.432a.77.77 0 0 1-.632.341c-.369 0-.73-.288-.814-.641l-1.117-6.488a.765.765 0 0 1 .817-.892h2.668l-.224 1.482c-.053.35.2.687.568.787l.14.047a.755.755 0 0 1 .689.745v.132Zm.818 2.171a1.752 1.752 0 1 1-3.5 0v-.084a1.747 1.747 0 0 1 .251-.939l1.504-2.11a.742.742 0 0 1 .724-.205c.348.14.583.485.65.863l.141.938c.09.604.609 1.051 1.236 1.051h.222Zm3.812-2.886a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-3Zm1-4.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-5-2a2.5 2.5 0 0 0-2.5 2.5v4.674A2.5 2.5 0 0 0 6.5 10h3a2.5 2.5 0 0 0 2.5-2.5V2.5A2.5 2.5 0 0 0 9 0H6.5A2.5 2.5 0 0 0 4 2.5ZM5.5 2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5h1Zm5 5a.5.5 0 0 0 .5-.5V2.5a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h2Zm4.618 6.787a.75.75 0 0 0-1.045-.261l-1.25 1a.75.75 0 0 0 .09 1.12c.236.183.558.271.87.188a.75.75 0 0 0 .365-1.458l-.03-.017Z"/>
                    </svg>
                    <span class="flex-1 ms-3 whitespace-nowrap">Sign In</span>
                </a>
            </li>
            <li>
                <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M6 3.5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5ZM3 8.5a.5.5 0 0 1 .5.5v2.5a.5.5 0 0 1-1 0v-2.5a.5.5 0 0 1 .5-.5Zm7.707-4.793a.5.5 0 0 0-.707.707L12.293 6H7a.5.5 0 0 0 0 1h5.293l-2.146 2.146a.5.5 0 1 0 .707.707l3-3a.5.5 0 0 0 0-.707l-3-3ZM8 12.5a.5.5 0 0 1 .5.5v.5h-1v-.5a.5.5 0 0 1 .5-.5Z"/>
                    </svg>
                    <span class="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
                </a>
            </li>
        </ul>
        <div class="absolute bottom-4 left-3 right-3">
            <ul class="space-y-2 font-medium">
                <li>
                    <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3.5 2.5A1.5 1.5 0 0 1 5 1h10a1.5 1.5 0 0 1 1.5 1.5v15A1.5 1.5 0 0 1 15 18H5a1.5 1.5 0 0 1-1.5-1.5V2.5ZM5 0a2.5 2.5 0 0 0-2.5 2.5V18A2.5 2.5 0 0 0 5 20h10a2.5 2.5 0 0 0 2.5-2.5V2.5A2.5 2.5 0 0 0 15 0H5Zm6 1v3H9V1h2Zm-2 0h2v2H9V1Z"/>
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Logout</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</aside>
		</div>
	);
};

export default AdminDashboard;