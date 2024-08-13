import React from 'react';
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import Bus from './components/Bus';
import Clothes from './components/Clothes';
import Company from './components/Company';
import Driver from './components/Driver';
import Electronics from './components/Electronics';
import Food from './components/Food';
import StallsPage from './components/Jewellery ';
import Landing from './components/Landing';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Perfumes from './components/Perfumes';
import Seller from './components/Seller';
import Shoes from './components/Shoes';
import SignUpBusiness from './components/SignupBusiness';
import SignUpUser from './components/SignupUser';
import Stalls from './components/Stalls';
import User from './components/User';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';



function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4 app-content"> 
        <Routes>
          <Route path="/bus" element={<Bus />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/company/:companyId" element={<Company />} />
          <Route path="/stalls/:stallsId" element={<company/>} />
          <Route path="/driver" element={<Driver />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/food" element={<Food />} />
          <Route path="/stallspage" element={<StallsPage />} />
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfumes" element={<Perfumes />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/shoes" element={<Shoes />} />
          <Route path="/signupBusiness" element={<SignUpBusiness />} /> 
          <Route path="/signupUser" element={<SignUpUser />} />  
          <Route path="/stalls" element={<Stalls />} />
          <Route path="/stalls/:stallsId" element={<Stalls />} />
          <Route path="/user" element={<User />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;