// src/components/login/LoginForm.jsx

import { useState } from 'react';
import eyeIcon from '../../assets/login/login_eye.png';

const LoginForm = ({ onLogin, isAnimating }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id.trim() && password.trim()) {
      onLogin();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login-form-container">
      <h2 className="login-form-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="login-input-group">
          <input
            type="text"
            className="login-input"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled={isAnimating}
            data-lpignore="true"
            autoComplete="off"
          />
        </div>
        <div className="login-input-group">
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isAnimating}
              data-lpignore="true"
              autoComplete="new-password"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
              disabled={isAnimating}
            >
              <img src={eyeIcon} alt="Toggle password visibility" className="password-eye-icon" />
            </button>
          </div>
        </div>
        <span className="recover-password">Recover Password ?</span>
        <button
          type="submit"
          className="login-submit-btn"
          disabled={isAnimating || !id.trim() || !password.trim()}
        >
          Login
        </button>
        <button
          type="button"
          className="signup-btn"
          disabled={isAnimating}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
