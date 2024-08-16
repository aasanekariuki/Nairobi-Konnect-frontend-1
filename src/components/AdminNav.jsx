import { NavLink } from 'react-router-dom';

export const AdminNav = () => {
    const navStyle = {
        backgroundColor: 'var(--primary-color)', // Use CSS variable for primary color
        padding: '1rem',
        color: 'white'
    };

    const titleStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem'
    };

    const navListStyle = {
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem'
    };

    const navLinkStyle = {
        color: '#d1d5db', // Tailwind's gray-300
        textDecoration: 'none',
        transition: 'color 0.3s'
    };

    const navLinkHoverStyle = {
        color: 'white'
    };

    return (
     <nav className="flex justify-between items-center" style={navStyle}></nav>
    );

	// This could be fetched from your state management (like Redux) or context
	const isAdmin = true; // Example: Admin status check
	const canManageUsers = true; // Example: Permission check

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
