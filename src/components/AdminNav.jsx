import { NavLink } from 'react-router-dom';

export const AdminNav = () => {
	// This could be fetched from your state management (like Redux) or context
	const isAdmin = true; // Example: Admin status check
	const canManageUsers = true; // Example: Permission check

	return (
		<div className="p-4 bg-gray-800 text-white h-full">
			<h1 className="text-2xl font-bold mb-6">
				Admin Dashboard
			</h1>
			<nav>
				<ul className="space-y-4">
					<li>
						<NavLink
							to="/admin"
							className={({ isActive }) =>
								`block px-4 py-2 rounded-lg ${
									isActive ? 'bg-gray-700' : 'hover:bg-gray-600'
								}`
							}
						>
							Dashboard
						</NavLink>
					</li>
					{isAdmin && canManageUsers && (
						<li>
							<NavLink
								to="/admin/users"
								className={({ isActive }) =>
									`block px-4 py-2 rounded-lg ${
										isActive ? 'bg-gray-700' : 'hover:bg-gray-600'
									}`
								}
							>
								Manage Users
							</NavLink>
						</li>
					)}
					<li>
						<NavLink
							to="/admin/activity"
							className={({ isActive }) =>
								`block px-4 py-2 rounded-lg ${
									isActive ? 'bg-gray-700' : 'hover:bg-gray-600'
								}`
							}
						>
							View Activity
						</NavLink>
					</li>
					{/* Additional links or sections */}
					<li>
						<NavLink
							to="/admin/settings"
							className={({ isActive }) =>
								`block px-4 py-2 rounded-lg ${
									isActive ? 'bg-gray-700' : 'hover:bg-gray-600'
								}`
							}
						>
							Settings
						</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	);
};
