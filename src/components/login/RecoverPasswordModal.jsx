// src/components/login/RecoverPasswordModal.jsx

import { useState } from 'react';

const RecoverPasswordModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    memberId: '',
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 임시 처리 - 실제로는 API 호출
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      console.log('Password recovery requested:', formData);
    }, 1000);
  };

  const handleClose = () => {
    setFormData({ memberId: '', name: '', email: '' });
    setIsSuccess(false);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        <button className="modal-close-btn" onClick={handleClose}>
          &times;
        </button>

        <div className="modal-header">
          <h2 className="modal-title">비밀번호 찾기</h2>
          <p className="modal-subtitle">
            가입 시 등록한 정보를 입력해주세요
          </p>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="modal-input-group">
              <label className="modal-label">
                아이디 <span className="required">(필수)</span>
              </label>
              <input
                type="text"
                name="memberId"
                className="modal-input"
                placeholder="아이디를 입력하세요"
                value={formData.memberId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="modal-input-group">
              <label className="modal-label">
                이름 <span className="required">(필수)</span>
              </label>
              <input
                type="text"
                name="name"
                className="modal-input"
                placeholder="이름을 입력하세요"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="modal-input-group">
              <label className="modal-label">
                이메일 <span className="required">(필수)</span>
              </label>
              <input
                type="email"
                name="email"
                className="modal-input"
                placeholder="가입 시 등록한 이메일을 입력하세요"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="modal-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? '처리 중...' : '비밀번호 찾기'}
            </button>
          </form>
        ) : (
          <div className="modal-success">
            <div className="success-icon">✓</div>
            <p className="success-message">
              입력하신 이메일로<br />
              임시 비밀번호를 발송했습니다.
            </p>
            <button className="modal-submit-btn" onClick={handleClose}>
              확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecoverPasswordModal;
