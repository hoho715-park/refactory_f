// src/components/analysis/WarningList.jsx
// 리스크 탐지 경고 리스트 컴포넌트

import { getSeverityInfo } from '../../utils/analysisHelpers';
import './WarningList.css';

/**
 * 심각도 아이콘 컴포넌트
 */
const SeverityIcon = ({ severity }) => {
  const icons = {
    error: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 6V10M10 14H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    warning: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M8.57 3.22L1.5 14.75C1.3 15.1 1.3 15.5 1.5 15.85C1.7 16.2 2.1 16.4 2.5 16.4H16.5C16.9 16.4 17.3 16.2 17.5 15.85C17.7 15.5 17.7 15.1 17.5 14.75L10.43 3.22C10.23 2.87 9.83 2.67 9.43 2.67C9.03 2.67 8.63 2.87 8.43 3.22H8.57Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 7V10M10 13H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    info: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 14V10M10 6H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  };

  return icons[severity] || icons.info;
};

/**
 * 경고 리스트 컴포넌트
 * @param {object} props
 * @param {object[]} props.warnings - 경고 목록
 */
const WarningList = ({ warnings = [] }) => {
  if (warnings.length === 0) {
    return (
      <div className="warning-list-card">
        <h3 className="warning-list-title">리스크 탐지</h3>
        <div className="warning-empty">
          <div className="empty-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 24L22 30L32 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="empty-message">탐지된 위험 요소가 없습니다</p>
        </div>
      </div>
    );
  }

  // 심각도별 그룹화
  const groupedWarnings = {
    error: warnings.filter(w => w.severity === 'error'),
    warning: warnings.filter(w => w.severity === 'warning'),
    info: warnings.filter(w => w.severity === 'info')
  };

  return (
    <div className="warning-list-card">
      <div className="warning-list-header">
        <h3 className="warning-list-title">리스크 탐지</h3>
        <div className="warning-counts">
          {groupedWarnings.error.length > 0 && (
            <span className="count-badge count-error">
              {groupedWarnings.error.length} 오류
            </span>
          )}
          {groupedWarnings.warning.length > 0 && (
            <span className="count-badge count-warning">
              {groupedWarnings.warning.length} 경고
            </span>
          )}
          {groupedWarnings.info.length > 0 && (
            <span className="count-badge count-info">
              {groupedWarnings.info.length} 정보
            </span>
          )}
        </div>
      </div>

      <div className="warning-list">
        {warnings.map((warning, index) => {
          const severityInfo = getSeverityInfo(warning.severity);

          return (
            <div
              key={index}
              className={`warning-item warning-${warning.severity}`}
            >
              <div
                className="warning-icon"
                style={{ color: severityInfo.color }}
              >
                <SeverityIcon severity={warning.severity} />
              </div>

              <div className="warning-content">
                <div className="warning-location">
                  <span className="warning-file">{warning.file}</span>
                  <span className="warning-line">Line {warning.line}</span>
                </div>
                <p className="warning-message">{warning.message}</p>
              </div>

              <div
                className="warning-severity-badge"
                style={{ backgroundColor: severityInfo.color }}
              >
                {severityInfo.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WarningList;
