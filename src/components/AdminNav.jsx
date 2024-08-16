import { NavLink } from 'react-router-dom';

export const AdminNav = () => {
	
	const isAdmin = true; 
	const canManageUsers = true; 
	return (
		<div className="p-4 bg-[#003366] text-white h-full"> {/* Dark blue background */}
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
									isActive ? 'bg-[#002244]' : 'hover:bg-[#004080]'  
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
										isActive ? 'bg-[#002244]' : 'hover:bg-[#004080]'  
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
									isActive ? 'bg-[#002244]' : 'hover:bg-[#004080]'  
								}`
							}
						>
							View Activity
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/admin/settings"
							className={({ isActive }) =>
								`block px-4 py-2 rounded-lg ${
									isActive ? 'bg-[#002244]' : 'hover:bg-[#004080]'  // Darker blue for active, lighter blue for hover
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
