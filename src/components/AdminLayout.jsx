import { Outlet } from 'react-router-dom';
import { AdminNav } from './AdminNav';

 const AdminLayout = () => {
	return (
		<>
			<AdminNav />
			<Outlet />
		</>
	);
};

export default AdminLayout;