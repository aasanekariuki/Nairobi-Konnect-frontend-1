// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Bus from './components/Bus';
import Driver from './components/Driver';
import Landing from './components/Landing';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Company from './components/Company';
import Seller from './components/Seller';



import SignUp from './components/Signup';
import StallsPage from './components/Stalls'; 
import User from './components/User';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-content p-4"> 
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/bus" element={<Bus />} />
          <Route path="/company/:companyId" element={<Company />} />
          <Route path="/driver" element={<Driver />} />
          <Route path="/login" element={<Login />} />
          <Route path="/seller" element={<Seller />} />

          <Route path="/stalls" element={<Stalls />} />
=========
          <Route path="/signup" element={<SignUp />} />
          <Route path="/stalls" element={<StallsPage />} /> {/* Use StallsPage here */}

          <Route path="/user" element={<User />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
