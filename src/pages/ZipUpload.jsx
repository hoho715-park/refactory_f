// src/pages/ZipUpload.jsx

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ZipUpload.css';

const ZipUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    if (file && file.name.endsWith('.zip')) {
      setUploadedFile(file);
      simulateUpload();
    } else {
      alert('ZIP 파일만 업로드 가능합니다.');
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
  };

  const handleAnalyze = () => {
    // 분석 페이지로 이동
    console.log('Start analysis:', uploadedFile?.name);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="zip-upload-page">
      <div className="zip-upload-container">
        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate('/code-insight')}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          돌아가기
        </button>

        {/* Header */}
        <div className="zip-upload-header">
          <h1 className="zip-upload-title">ZIP 파일 업로드</h1>
          <p className="zip-upload-subtitle">
            분석할 프로젝트의 ZIP 파일을 업로드하세요
          </p>
        </div>

        {/* Upload Area */}
        <div
          className={`upload-dropzone ${isDragging ? 'dragging' : ''} ${uploadedFile ? 'has-file' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {!uploadedFile ? (
            <>
              <div className="dropzone-icon">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <path d="M56 40V52C56 53.4145 55.4381 54.7712 54.4379 55.7714C53.4377 56.7716 52.081 57.3333 50.6667 57.3333H13.3333C11.919 57.3333 10.5623 56.7716 9.5621 55.7714C8.5619 54.7712 8 53.4145 8 52V40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M45.3333 21.3333L32 8L18.6667 21.3333" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M32 8V40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="dropzone-text">
                <p className="dropzone-main-text">
                  ZIP 파일을 여기에 드래그하거나
                </p>
                <button className="browse-btn" onClick={handleBrowseClick}>
                  파일 찾아보기
                </button>
              </div>
              <p className="dropzone-hint">
                최대 100MB까지 업로드 가능합니다
              </p>
            </>
          ) : (
            <div className="uploaded-file-info">
              <div className="file-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M28 4H12C10.9391 4 9.92172 4.42143 9.17157 5.17157C8.42143 5.92172 8 6.93913 8 8V40C8 41.0609 8.42143 42.0783 9.17157 42.8284C9.92172 43.5786 10.9391 44 12 44H36C37.0609 44 38.0783 43.5786 38.8284 42.8284C39.5786 42.0783 40 41.0609 40 40V16L28 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M28 4V16H40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 28H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M24 24V32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="file-details">
                <p className="file-name">{uploadedFile.name}</p>
                <p className="file-size">{formatFileSize(uploadedFile.size)}</p>
              </div>
              {isUploading ? (
                <div className="upload-progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <span className="progress-text">{uploadProgress}%</span>
                </div>
              ) : (
                <div className="file-actions">
                  <span className="upload-complete">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="#4CAF50"/>
                      <path d="M6 10L8.5 12.5L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    업로드 완료
                  </span>
                  <button className="remove-file-btn" onClick={handleRemoveFile}>
                    삭제
                  </button>
                </div>
              )}
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".zip"
            onChange={handleInputChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* Instructions */}
        <div className="upload-instructions">
          <h3 className="instructions-title">업로드 가이드</h3>
          <ul className="instructions-list">
            <li>
              <span className="instruction-number">1</span>
              프로젝트 폴더를 ZIP 파일로 압축하세요
            </li>
            <li>
              <span className="instruction-number">2</span>
              node_modules, .git 등 불필요한 폴더는 제외하세요
            </li>
            <li>
              <span className="instruction-number">3</span>
              소스 코드 파일(.js, .ts, .py 등)이 포함되어 있어야 합니다
            </li>
          </ul>
        </div>

        {/* Analyze Button */}
        <div className="zip-upload-actions">
          <button
            className={`analyze-btn ${uploadedFile && !isUploading ? 'active' : ''}`}
            onClick={handleAnalyze}
            disabled={!uploadedFile || isUploading}
          >
            분석 시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZipUpload;
