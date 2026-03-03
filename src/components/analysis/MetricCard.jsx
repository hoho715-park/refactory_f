// src/components/analysis/MetricCard.jsx
// 개별 품질 지표를 표시하는 카드 컴포넌트

import { useState, useEffect } from 'react';
import {
  getScoreStatus,
  getMetricLabel,
  getMetricDescription
} from '../../utils/analysisHelpers';
import './MetricCard.css';

/**
 * 메트릭 아이콘 컴포넌트
 */
const MetricIcon = ({ type }) => {
  const icons = {
    complexity: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    variableManagement: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    eventHandlers: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15 14C15 14 14.5 15.5 12 15.5C9.5 15.5 9 14 9 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8.5 9H8.51M15.5 9H15.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    maintainability: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M14.7 6.3C14.5 6.1 14.2 6 13.9 6H10.1C9.8 6 9.5 6.1 9.3 6.3L6.3 9.3C6.1 9.5 6 9.8 6 10.1V13.9C6 14.2 6.1 14.5 6.3 14.7L9.3 17.7C9.5 17.9 9.8 18 10.1 18H13.9C14.2 18 14.5 17.9 14.7 17.7L17.7 14.7C17.9 14.5 18 14.2 18 13.9V10.1C18 9.8 17.9 9.5 17.7 9.3L14.7 6.3Z" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    performanceRisk: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  };

  return icons[type] || icons.complexity;
};

/**
 * 메트릭 카드 컴포넌트
 * @param {object} props
 * @param {string} props.metricKey - 메트릭 키
 * @param {number} props.score - 점수 (0~100)
 * @param {boolean} props.animate - 애니메이션 활성화 여부
 */
const MetricCard = ({ metricKey, score = 0, animate = true }) => {
  const [displayScore, setDisplayScore] = useState(0);

  const { status, label, color } = getScoreStatus(score);
  const metricLabel = getMetricLabel(metricKey);
  const description = getMetricDescription(metricKey, score);

  // 점수 카운트업 애니메이션
  useEffect(() => {
    if (!animate) {
      setDisplayScore(score);
      return;
    }

    const duration = 1200;
    const steps = 40;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentScore = Math.round(eased * score);

      setDisplayScore(currentScore);

      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayScore(score);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [score, animate]);

  return (
    <div className={`metric-card metric-card-${status}`}>
      <div className="metric-card-header">
        <div className="metric-icon" style={{ backgroundColor: `${color}15`, color }}>
          <MetricIcon type={metricKey} />
        </div>
        <div className="metric-badge" style={{ backgroundColor: color }}>
          {label}
        </div>
      </div>

      <h4 className="metric-label">{metricLabel}</h4>

      <div className="metric-score-section">
        <div className="metric-score">
          <span className="score-value">{displayScore}</span>
          <span className="score-max">/ 100</span>
        </div>

        {/* 미니 프로그레스 바 */}
        <div className="metric-progress-bar">
          <div
            className="metric-progress-fill"
            style={{
              width: `${displayScore}%`,
              backgroundColor: color
            }}
          />
        </div>
      </div>

      <p className="metric-description">{description}</p>
    </div>
  );
};

export default MetricCard;
