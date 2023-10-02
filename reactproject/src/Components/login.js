import React from 'react';
import '../Stylesheets/main.min.css';
import '../Stylesheets/login.css';

export const Login = () => {
  return (
    <div className="form-container">
      <form>
        <h1 className="h1">Login</h1>
        <div className="input-row1">
          <input className="email" type="email" placeholder="Email" />
        </div>
        <div className="input-row1 input-last">
          <input className="password" type="password" placeholder="Your Password" />
        </div>
        <button type="button" className="button1" onClick={() => window.location.href='./enrolled-course'}>
          Login
        </button>
        <div className="divider">or</div>
        <div className="button-container">
          <button type="button" className="button2" onClick={() => window.location.href='./register'}>
            Register Here
          </button>
          <button type="button" className="button2" onClick={() => window.location.href='./forgotPassword'}>
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
