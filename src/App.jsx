import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import { AuthProvider } from './components/AuthContext'; // Import the AuthProvider
import Bus from './components/Bus';
import Company from './components/Company';
import Driver from './components/Driver';
import Landing from './components/Landing';
import Login from './components/pages/Login';
import Navbar from './components/Navbar';
import Seller from './components/Seller';
import SignUpBusiness from './components/SignupBusiness';
import SignUpUser from './components/pages/SignupUser';
import Stalls from './components/Stalls';
import User from './components/User';
import StallDetails from './components/StallsDetails';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminUsers from './components/admin/AdminUsers';
import AdminActivity from './components/admin/AdminActivity';
import { Layout } from './components/Layout';
import { AdminLayout } from './components/AdminLayout';
import LogoutPage from './components/pages/Logout';

function App() {
    return (
        <AuthProvider> {/* Wrap your application with AuthProvider */}
            <Router>
                <Navbar /> {/* Include Navbar here */}
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Landing />} />
                        <Route path="/bus" element={<Bus />} />
                        <Route path="/company/:companyId" element={<Company />} />
                        <Route path="/driver" element={<Driver />} />
                        <Route path="/stalls" element={<Stalls />} />
                        <Route path="/stalls/:stallName" element={<StallDetails />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/seller" element={<Seller />} />
                        <Route path="/signupBusiness" element={<SignUpBusiness />} />
                        <Route path="/signupUser" element={<SignUpUser />} />
                        
                        {/* User route with authentication check */}
                        <Route 
                            path="/user" 
                            element={<User />} 
                        />
                    </Route>

                    {/* Protected Routes for Admin */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route
                            index
                            element={<AdminDashboard />}
                        />
                        <Route
                            path="/admin/users"
                            element={<AdminUsers />}
                        />
                        <Route
                            path="/admin/activity"
                            element={<AdminActivity />}
                        />
                    </Route>

                    {/* Logout Route */}
                    <Route path="/logout" element={<LogoutPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;