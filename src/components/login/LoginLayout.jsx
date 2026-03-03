// src/components/login/LoginLayout.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUpForm from '../signup/SignUpForm';
import loginMainImage from '../../assets/login/login_main.png';
import loginTextImage from '../../assets/login/login_text.png';
import loginLogoImage from '../../assets/login/login_logo.png';
import './login.css';

const LoginLayout = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentView, setCurrentView] = useState('login'); // 'login' or 'signup'
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLogin = () => {
    setIsAnimating(true);
    setTimeout(() => {
      console.log('Login successful');
    }, 800);
  };

  const handleSignUp = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView('signup');
    }, 300);
  };

  const handleBackToLogin = () => {
    setIsTransitioning(false);
    setTimeout(() => {
      setCurrentView('login');
    }, 300);
  };

  const getContainerClass = () => {
    let classes = 'login-container';
    if (isAnimating) classes += ' animating';
    if (isTransitioning || currentView === 'signup') classes += ' signup-mode';
    return classes;
  };

  return (
    <div className={getContainerClass()}>
      {/* Left Section - Main Image */}
      <div className="login-left">
        <img src={loginMainImage} alt="Login Background" />
      </div>

      {/* Right Section */}
      <div className="login-right">
        {/* Logo Text - moves from center-top to top-left */}
        <Link to="/" className="login-logo-link">
          <img
            src={loginTextImage}
            alt="RE:FACTORY"
            className="login-logo-text"
          />
        </Link>

        {/* Content Area */}
        <div className="login-content-area">
          {/* Login Form */}
          <div className={`login-form-wrapper ${currentView === 'login' ? 'active' : 'hidden'}`}>
            <LoginForm
              onLogin={handleLogin}
              onSignUp={handleSignUp}
              isAnimating={isAnimating || isTransitioning}
            />
          </div>

          {/* SignUp Form */}
          <div className={`signup-form-wrapper ${currentView === 'signup' ? 'active' : 'hidden'}`}>
            {/* SignUp Header */}
            <div className="signup-header">
              <h1 className="signup-title">회원가입</h1>
              <p className="signup-subtitle">
                코드를 해부하고 구조를 시각화하고 더 나은 형태로 다시 설계합니다
              </p>
            </div>
            <SignUpForm isAnimating={isTransitioning} />
            <button className="back-to-login-btn" onClick={handleBackToLogin}>
              로그인으로 돌아가기
            </button>
          </div>
        </div>

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
