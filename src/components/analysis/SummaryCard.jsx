// src/components/analysis/SummaryCard.jsx
// AST 요약 정보를 표시하는 카드 컴포넌트

import { formatNumber } from '../../utils/analysisHelpers';
import './SummaryCard.css';

/**
 * AST 요약 카드 컴포넌트
 * @param {object} props
 * @param {object} props.summary - 요약 데이터
 */
const SummaryCard = ({ summary }) => {
  const {
    totalFiles = 0,
    totalFunctions = 0,
    totalASTNodes = 0,
    averageFunctionLength = 0,
    analysisTime = 0
  } = summary || {};

  const summaryItems = [
    {
      label: '분석 파일 수',
      value: formatNumber(totalFiles),
      unit: '개',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      label: '총 함수 수',
      value: formatNumber(totalFunctions),
      unit: '개',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M16 18L22 12L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      label: 'AST 노드 수',
      value: formatNumber(totalASTNodes),
      unit: '개',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
          <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2"/>
          <circle cx="20" cy="4" r="2" stroke="currentColor" strokeWidth="2"/>
          <circle cx="4" cy="20" r="2" stroke="currentColor" strokeWidth="2"/>
          <circle cx="20" cy="20" r="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M5.5 5.5L9.5 9.5M14.5 9.5L18.5 5.5M5.5 18.5L9.5 14.5M14.5 14.5L18.5 18.5" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      label: '평균 함수 길이',
      value: averageFunctionLength,
      unit: '줄',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 14H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 18H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      label: '분석 시간',
      value: analysisTime.toFixed(1),
      unit: '초',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <div className="summary-card">
      <h3 className="summary-card-title">AST 분석 요약</h3>
      <div className="summary-items">
        {summaryItems.map((item, index) => (
          <div key={index} className="summary-item">
            <div className="summary-item-icon">
              {item.icon}
            </div>
            <div className="summary-item-content">
              <span className="summary-item-label">{item.label}</span>
              <div className="summary-item-value">
                <span className="value-number">{item.value}</span>
                <span className="value-unit">{item.unit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryCard;
