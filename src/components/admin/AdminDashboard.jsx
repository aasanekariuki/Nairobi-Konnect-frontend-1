import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		// Fetch users from the backend API
		const fetchUsers = async () => {
			try {
				const response = await axios.get('/api/users'); // Adjust the URL as needed
				console.log(response);
				// setUsers(response.data);
			} catch (error) {
				console.error('Error fetching users', error);
			}
		};

		fetchUsers();
	}, []);

	return (
		<div className="p-6">
			<div>
				<h2 className="text-xl text-gray-950 font-semibold mb-2">
					All Users
				</h2>
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								ID
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Name
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Email
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Role
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{users.map((user) => (
							<tr key={user.id}>
								<td className="px-6 py-4 whitespace-nowrap">
									{user.id}
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									{user.name}
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									{user.email}
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									{user.role}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AdminDashboard;