import React from 'react';
import '../Stylesheets/main.min.css';
import '../Stylesheets/login.css';

export const Register = () => {
  return (
    <div className="form-container">
      <form>
        <h1 className="h1">Welcome!</h1>
        <div className="input-row">
          <input className="email" type="email" placeholder="Email" />
          <input className="password" type="password" placeholder="Your Password" />
        </div>
        <div className="input-row">
          <input className="FirstName" type="text" placeholder="First Name" />
          <input className="LastName" type="text" placeholder="Last Name" />
        </div>
        <div className="input-row" style={{ paddingBottom: '20px' }}>
          <select>
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
          </select>
          <input className="RegistrationCode" type="text" placeholder="Registration Code" />
        </div>
        <button type="button" onClick={() => window.location.href='./login'}>
          Register Now
        </button>
        <div className="divider">or</div>
        <button type="button" onClick={() => window.location.href='./login'} className="button3">
          Login
        </button>
      </form>
    </div>
  );
};

export default Register;
