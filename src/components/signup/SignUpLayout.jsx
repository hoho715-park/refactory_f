// src/components/signup/SignUpLayout.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import loginTextImage from '../../assets/login/login_text.png';
import loginLogoImage from '../../assets/login/login_logo.png';
import './signup.css';

const SignUpLayout = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate('/login');
    }, 600);
  };

  return (
    <div className={`signup-container ${isAnimating ? 'animating-out' : 'animating-in'}`}>
      {/* Logo Text (top left) */}
      <Link to="/" className="signup-logo-link">
        <img
          src={loginTextImage}
          alt="RE:FACTORY"
          className="signup-logo-text"
        />
      </Link>

      {/* Page Header */}
      <div className="signup-header">
        <h1 className="signup-title">회원가입</h1>
        <p className="signup-subtitle">
          코드를 해부하고 구조를 시각화하고 더 나은 형태로 다시 설계합니다
        </p>
      </div>

      {/* SignUp Form */}
      <SignUpForm isAnimating={isAnimating} />

      {/* Back to Login Link */}
      <button className="signup-back-btn" onClick={handleBackToLogin}>
        로그인으로 돌아가기
      </button>

      {/* Watermark Logo (bottom right) */}
      <img
        src={loginLogoImage}
        alt="Logo Watermark"
        className="signup-watermark"
      />
    </div>
  );
};

export default SignUpLayout;
