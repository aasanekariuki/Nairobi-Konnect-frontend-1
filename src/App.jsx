import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bus from './components/Bus';
import Company from './components/Company';
import Driver from './components/Driver';
import Landing from './components/Landing';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Seller from './components/Seller';
import SignUpBusiness from './components/SignupBusiness';
import SignUpUser from './components/SignupUser';
import Stalls from './components/Stalls';
import User from './components/User';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import StallDetails from './components/StallsDetails';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminUsers from './components/admin/AdminUsers';
import AdminActivity from './components/admin/AdminActivity';

const ProtectedRoute = ({ children, role }) => {
	const userRole = localStorage.getItem('role');
	if (userRole !== role) {
		return <Navigate to="/login" />;
	}
	return children;
};

function App() {
	return (
		<Router>
			<Navbar />
			<div className="p-4 app-content">
				<Routes>
					<Route path="/bus" element={<Bus />} />
					<Route path="/clothes" element={<Clothes />} />
					<Route path="/company/:companyId" element={<Company />} />
					<Route path="/driver" element={<Driver />} />
					<Route path="/electronics" element={<Electronics />} />
					<Route path="/food" element={<Food />} />
					<Route path="/stallspage" element={<StallsPage />} />
					<Route path="/" element={<Landing />} />
					<Route path="/login" element={<Login />} />
					<Route path="/perfumes" element={<Perfumes />} />
					<Route path="/seller" element={<Seller />} />
					<Route path="/shoes" element={<Shoes />} />
					<Route
						path="/signupBusiness"
						element={<SignUpBusiness />}
					/>
					<Route path="/signupUser" element={<SignUpUser />} />
					<Route path="/stalls" element={<Stalls />} />
					<Route path="/user" element={<User />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/edit-profile" element={<EditProfile />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
