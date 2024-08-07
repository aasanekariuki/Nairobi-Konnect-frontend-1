import React, { useState } from 'react';
import './Login.css';
import backgroundImage from '../assets/image4.jpeg'; // Import the background image

const Login = () => {
  // Separate states for each form
  const [isLoginActive1, setIsLoginActive1] = useState(true);
  const [isLoginActive2, setIsLoginActive2] = useState(true);
  const [role, setRole] = useState('');

  // Event handlers for the first form
  const handleLoginClick1 = () => {
    setIsLoginActive1(true);
  };

  const handleSignupClick1 = () => {
    setIsLoginActive1(false);
  };

  // Event handlers for the second form
  const handleLoginClick2 = () => {
    setIsLoginActive2(true);
  };

  const handleSignupClick2 = () => {
    setIsLoginActive2(false);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <header>
        <h2 className="heading">Join Nairobi Konnect Community</h2>
      </header>

      <div className="main-login">
        {/* First form */}
        <div className="container">
          <div className={`slider ${!isLoginActive1 ? 'moveslider' : ''}`}></div>
          <div className="btn">
            <button className="login" onClick={handleLoginClick1}>Login</button>
            <button className="signup" onClick={handleSignupClick1}>Signup</button>
          </div>

          <div className={`form-section ${!isLoginActive1 ? 'form-section-move' : ''}`}>
            <div className="login-box">
              <input type="email" className="email ele" placeholder="youremail@email.com" />
              <input type="text" className="phone ele" placeholder="Phone number" />
              <input type="password" className="password ele" placeholder="password" />
              <button className="clkbtn">Login</button>
            </div>

            <div className="signup-box">
              <input type="text" className="name ele" placeholder="Enter your name" />
              <input type="email" className="email ele" placeholder="youremail@email.com" />
              <input type="text" className="phone ele" placeholder="Phone number" />
              <input type="password" className="password ele" placeholder="password" />
              <button className="clkbtn">Signup</button>
            </div>
          </div>
        </div>

        {/* Second form */}
        <div className="container">
          <div className={`slider ${!isLoginActive2 ? 'moveslider' : ''}`}></div>
          <div className="btn">
            <button className="login" onClick={handleLoginClick2}>Login</button>
            <button className="signup" onClick={handleSignupClick2}>Signup</button>
          </div>

          <div className={`form-section ${!isLoginActive2 ? 'form-section-move' : ''}`}>
            <div className="login-box">
              <input type="email" className="email ele" placeholder="youremail@email.com" />
              <input type="text" className="phone ele" placeholder="Phone number" />
              <input type="password" className="password ele" placeholder="password" />
              <button className="clkbtn">Login</button>
            </div>

            <div className="signup-box">
            <div className="color">
              <label htmlFor="role" className="ele-label">Who are you?</label>
              </div>
              <select id="role" className="ele dropdown" value={role} onChange={handleRoleChange}>
                <option value="">Select your role</option>
                <option value="driver">Driver</option>
                <option value="seller">Seller</option>
              </select>
              <input type="text" className="name ele" placeholder="Enter your name" />
              <input type="email" className="email ele" placeholder="youremail@email.com" />
              <input type="text" className="phone ele" placeholder="Phone number" />
              <input type="password" className="password ele" placeholder="password" />
              <button className="clkbtn">Signup</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
