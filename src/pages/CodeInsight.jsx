// src/pages/CodeInsight.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CodeInsight.css';

const CodeInsight = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const navigate = useNavigate();

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleContinue = () => {
    if (selectedMethod === 'zip') {
      navigate('/code-insight/zip-upload');
    } else if (selectedMethod === 'github') {
      // GitHub 연동 페이지로 이동 (추후 구현)
      console.log('Navigate to GitHub connect');
    }
  };

  return (
    <div className="code-insight-page">
      <div className="code-insight-container">
        {/* Header */}
        <div className="code-insight-header">
          <h1 className="code-insight-title">Code Insight</h1>
          <p className="code-insight-subtitle">
            코드를 분석하고 시각화하기 위해 프로젝트를 업로드하세요
          </p>
        </div>

        {/* Upload Method Selection */}
        <div className="upload-method-section">
          <h2 className="section-title">업로드 방법 선택</h2>

          <div className="upload-method-cards">
            {/* ZIP Upload Card */}
            <div
              className={`upload-card ${selectedMethod === 'zip' ? 'selected' : ''}`}
              onClick={() => handleMethodSelect('zip')}
            >
              <div className="upload-card-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M40 30V38C40 39.0609 39.5786 40.0783 38.8284 40.8284C38.0783 41.5786 37.0609 42 36 42H12C10.9391 42 9.92172 41.5786 9.17157 40.8284C8.42143 40.0783 8 39.0609 8 38V30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M32 16L24 8L16 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M24 8V30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="upload-card-title">ZIP 파일 업로드</h3>
              <p className="upload-card-description">
                프로젝트 폴더를 ZIP 파일로 압축하여<br />
                직접 업로드합니다
              </p>
              <ul className="upload-card-features">
                <li>최대 100MB 파일 지원</li>
                <li>빠른 업로드 속도</li>
                <li>오프라인 프로젝트 지원</li>
              </ul>
              {selectedMethod === 'zip' && (
                <div className="selected-indicator">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#4461F2"/>
                    <path d="M7 12L10.5 15.5L17 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>

            {/* GitHub Connect Card */}
            <div
              className={`upload-card ${selectedMethod === 'github' ? 'selected' : ''}`}
              onClick={() => handleMethodSelect('github')}
            >
              <div className="upload-card-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4C12.954 4 4 12.954 4 24C4 32.824 9.73 40.262 17.68 42.96C18.68 43.142 19.044 42.528 19.044 42.002C19.044 41.528 19.026 40.108 19.018 38.248C13.454 39.478 12.28 35.622 12.28 35.622C11.37 33.262 10.058 32.648 10.058 32.648C8.242 31.408 10.196 31.432 10.196 31.432C12.202 31.572 13.26 33.492 13.26 33.492C15.042 36.548 17.95 35.632 19.08 35.126C19.26 33.772 19.78 32.856 20.354 32.828C15.754 32.328 10.92 30.468 10.92 22.868C10.92 20.648 11.692 18.828 13.3 17.408C13.092 16.878 12.404 14.808 13.496 12.008C13.496 12.008 15.172 11.442 18.996 14.062C20.586 13.598 22.3 13.368 24 13.358C25.7 13.368 27.414 13.598 29.008 14.062C32.828 11.442 34.5 12.008 34.5 12.008C35.596 14.808 34.908 16.878 34.7 17.408C36.312 18.828 37.076 20.648 37.076 22.868C37.076 30.488 32.234 32.322 27.618 32.808C28.338 33.422 28.98 34.632 28.98 36.482C28.98 39.128 28.956 41.258 28.956 42.002C28.956 42.534 29.314 43.154 30.332 42.956C38.276 40.254 44 32.82 44 24C44 12.954 35.046 4 24 4Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="upload-card-title">GitHub 연동</h3>
              <p className="upload-card-description">
                GitHub 계정을 연결하여<br />
                레포지토리를 가져옵니다
              </p>
              <ul className="upload-card-features">
                <li>실시간 동기화 가능</li>
                <li>브랜치 선택 지원</li>
                <li>커밋 히스토리 분석</li>
              </ul>
              {selectedMethod === 'github' && (
                <div className="selected-indicator">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#4461F2"/>
                    <path d="M7 12L10.5 15.5L17 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="code-insight-actions">
          <button
            className={`continue-btn ${selectedMethod ? 'active' : ''}`}
            onClick={handleContinue}
            disabled={!selectedMethod}
          >
            계속하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeInsight;
