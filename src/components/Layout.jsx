import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export const Layout = ({ children }) => {
	return (
		<>
			<Navbar />
			<div className="p-4 app-content mt-16">
				<Outlet />
			</div>
		</>
	);
};