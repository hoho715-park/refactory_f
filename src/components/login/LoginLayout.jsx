// src/components/login/LoginLayout.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import loginMainImage from '../../assets/login/login_main.png';
import loginTextImage from '../../assets/login/login_text.png';
import loginLogoImage from '../../assets/login/login_logo.png';
import './login.css';

const LoginLayout = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLogin = () => {
    setIsAnimating(true);
    // Animation will play, then redirect or show success
    setTimeout(() => {
      // Handle post-login logic here
      console.log('Login successful');
    }, 800);
  };

  return (
    <div className={`login-container ${isAnimating ? 'animating' : ''}`}>
      {/* Left Section - Main Image */}
      <div className="login-left">
        <img src={loginMainImage} alt="Login Background" />
      </div>

      {/* Right Section - Login Form */}
      <div className="login-right">
        {/* Logo Text (top left) - Link to Home */}
        <Link to="/" className="login-logo-link">
          <img
            src={loginTextImage}
            alt="RE:FACTORY"
            className="login-logo-text"
          />
        </Link>

        {/* Login Form */}
        <LoginForm onLogin={handleLogin} isAnimating={isAnimating} />

        {/* Watermark Logo (bottom right) */}
        <img
          src={loginLogoImage}
          alt="Logo Watermark"
          className="login-watermark"
        />
      </div>
    </div>
  );
};

export default LoginLayout;
