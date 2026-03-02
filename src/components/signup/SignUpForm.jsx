// src/components/signup/SignUpForm.jsx

import { useState } from 'react';

const SignUpForm = ({ isAnimating }) => {
  const [formData, setFormData] = useState({
    name: '',
    memberId: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    verificationCode: '',
    email: '',
    emailDomain: '',
    emailType: '직접입력',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEmailTypeChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      emailType: value,
      emailDomain: value === '직접입력' ? '' : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('SignUp submitted:', formData);
  };

  const handleVerification = () => {
    console.log('Verification requested for:', formData.phone);
  };

  const handleVerifyCode = () => {
    console.log('Verifying code:', formData.verificationCode);
  };

  const handleCheckDuplicate = () => {
    console.log('Checking duplicate for:', formData.memberId);
  };

  return (
    <div className="signup-form-container">
      <div className="signup-form-card">
        <h2 className="signup-form-title">기본 정보</h2>

        <form onSubmit={handleSubmit} autoComplete="off">
          {/* 이름 */}
          <div className="signup-input-group">
            <label className="signup-label">
              이름 <span className="required">(필수)</span>
            </label>
            <input
              type="text"
              name="name"
              className="signup-input"
              placeholder="이름을 입력하세요"
              value={formData.name}
              onChange={handleChange}
              disabled={isAnimating}
            />
          </div>

          {/* 아이디 */}
          <div className="signup-input-group">
            <label className="signup-label">
              아이디 <span className="required">(필수)</span>
            </label>
            <div className="signup-input-with-btn">
              <input
                type="text"
                name="memberId"
                className="signup-input"
                placeholder="8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해주세요"
                value={formData.memberId}
                onChange={handleChange}
                disabled={isAnimating}
              />
              <button
                type="button"
                className="signup-side-btn"
                onClick={handleCheckDuplicate}
                disabled={isAnimating}
              >
                중복 확인
              </button>
            </div>
          </div>

          {/* 비밀번호 */}
          <div className="signup-input-group">
            <label className="signup-label">
              비밀번호 <span className="required">(필수)</span>
            </label>
            <input
              type="password"
              name="password"
              className="signup-input"
              placeholder="8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해주세요"
              value={formData.password}
              onChange={handleChange}
              disabled={isAnimating}
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="signup-input-group">
            <label className="signup-label">
              비밀번호 확인 <span className="required">(필수)</span>
            </label>
            <input
              type="password"
              name="passwordConfirm"
              className="signup-input"
              placeholder="동일한 비밀번호를 입력하세요"
              value={formData.passwordConfirm}
              onChange={handleChange}
              disabled={isAnimating}
            />
          </div>

          {/* 휴대폰 번호 */}
          <div className="signup-input-group">
            <label className="signup-label">
              휴대폰 번호 <span className="required">(필수)</span>
            </label>
            <div className="signup-input-with-btn">
              <input
                type="text"
                name="phone"
                className="signup-input"
                placeholder="'-'제외하고 숫자만 입력하세요"
                value={formData.phone}
                onChange={handleChange}
                disabled={isAnimating}
              />
              <button
                type="button"
                className="signup-side-btn"
                onClick={handleVerification}
                disabled={isAnimating}
              >
                인증번호 받기
              </button>
            </div>
            <div className="signup-input-with-btn" style={{ marginTop: '8px' }}>
              <input
                type="text"
                name="verificationCode"
                className="signup-input"
                placeholder="인증번호 숫자 4자리를 입력하세요"
                value={formData.verificationCode}
                onChange={handleChange}
                disabled={isAnimating}
              />
              <button
                type="button"
                className="signup-side-btn signup-side-btn-small"
                onClick={handleVerifyCode}
                disabled={isAnimating}
              >
                확인
              </button>
            </div>
          </div>

          {/* 이메일 주소 */}
          <div className="signup-input-group">
            <label className="signup-label">
              이메일 주소 <span className="required">(필수)</span>
            </label>
            <div className="signup-email-group">
              <input
                type="text"
                name="email"
                className="signup-input signup-email-input"
                placeholder="이메일 아이디"
                value={formData.email}
                onChange={handleChange}
                disabled={isAnimating}
              />
              <span className="signup-email-at">@</span>
              <input
                type="text"
                name="emailDomain"
                className="signup-input signup-email-domain"
                placeholder="이메일 호스트"
                value={formData.emailDomain}
                onChange={handleChange}
                disabled={isAnimating || formData.emailType !== '직접입력'}
              />
              <select
                className="signup-select"
                value={formData.emailType}
                onChange={handleEmailTypeChange}
                disabled={isAnimating}
              >
                <option value="직접입력">직접입력</option>
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="daum.net">daum.net</option>
              </select>
            </div>
          </div>

          {/* 직군 선택 */}
          <div className="signup-input-group">
            <label className="signup-label">
              직군 선택 <span className="required">(필수)</span>
            </label>
            <select
              name="role"
              className="signup-select signup-select-full"
              value={formData.role}
              onChange={handleChange}
              disabled={isAnimating}
            >
              <option value="">옵션을 선택하세요</option>
              <option value="developer">개발자</option>
              <option value="designer">디자이너</option>
              <option value="planner">기획자</option>
              <option value="manager">관리자</option>
              <option value="other">기타</option>
            </select>
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="signup-submit-btn"
            disabled={isAnimating}
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
