import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
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
          <Route path="/" element={<Landing />} />
          <Route path="/bus" element={<Bus />} />
          <Route path="/company/:companyId" element={<Company />} />
          <Route path="/driver" element={<Driver />} />
          <Route path="/stallspage" element={<Stalls />} />
          <Route path="/stalls/:stallName" element={<StallDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/signupBusiness" element={<SignUpBusiness />} />
          <Route path="/signupUser" element={<SignUpUser />} />

          <Route path="/signupBusiness" element={<SignUpBusiness />} /> 
          <Route path="/signupUser" element={<SignUpUser />} />  
          <Route path="/stalls" element={<Stalls />} />
          <Route path="/stalls/:stallsId" element={<Stalls />} />

          <Route path="/user" element={<User />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          
          {/* Protected Routes for Admin */}
          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute role="admin">
              <AdminUsers />
            </ProtectedRoute>
          } />
          <Route path="/admin/activity" element={
            <ProtectedRoute role="admin">
              <AdminActivity />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
