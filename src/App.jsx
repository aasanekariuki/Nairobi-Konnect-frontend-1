
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Bus from './components/Bus';
import Driver from './components/Driver';
import Landing from './components/Landing';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Company from './components/Company';
import Seller from './components/Seller';
import StallsPage from './components/Stalls'; 
import SignUpUser from './components/SignupUser'; 
import SignUpBusiness from './components/SignupBusiness'; 
import StallsPage from './components/Jewellery '; 
import SignUp from './components/Signup';
import User from './components/User';

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
          <Route path="/login" element={<Login />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/signupUser" element={<SignUpUser />} />  
          <Route path="/signupBusiness" element={<SignUpBusiness />} /> 
          <Route path="/stalls" element={<StallsPage />} /> 
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
