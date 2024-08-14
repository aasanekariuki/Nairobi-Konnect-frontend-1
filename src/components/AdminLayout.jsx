import { Outlet } from 'react-router-dom';
import { AdminNav } from './AdminNav';

export const AdminLayout = () => {
	return (
		<>
			<AdminNav />
			<Outlet />
		</>
	);
};