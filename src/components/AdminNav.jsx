import { Link } from 'react-router-dom';

export const AdminNav = () => {
	return (
		<div className="p-3">
			<h1 className="text-2xl text-gray-50 font-bold mb-4">
				Admin Dashboard
			</h1>
			<nav className="mb-4">
				<ul className="flex space-x-4">
					<li>
						<Link
							to="/admin"
							className="text-blue-500 hover:underline"
						>
							Dashboard
						</Link>
					</li>
					<li>
						<Link
							to="/admin/users"
							className="text-blue-500 hover:underline"
						>
							Manage Users
						</Link>
					</li>
					<li>
						<Link
							to="/admin/activity"
							className="text-blue-500 hover:underline"
						>
							View Activity
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};
