// src/components/analysis/ScoreDonut.jsx
// 종합 점수를 도넛 차트로 표시하는 컴포넌트

import { useState, useEffect } from 'react';
import { getGradeColor } from '../../utils/analysisHelpers';
import './ScoreDonut.css';

/**
 * 점수 도넛 차트 컴포넌트
 * @param {object} props
 * @param {number} props.score - 종합 점수 (0~100)
 * @param {string} props.grade - 등급 (A, B, C, D, F)
 * @param {boolean} props.animate - 애니메이션 활성화 여부
 * @param {object} props.scores - 개별 점수 데이터
 */
const ScoreDonut = ({ score = 0, grade = 'F', animate = true, scores = {} }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [strokeDasharray, setStrokeDasharray] = useState('0 283');
  const [showMethodModal, setShowMethodModal] = useState(false);

  const gradeColor = getGradeColor(grade);
  const circumference = 2 * Math.PI * 45; // r=45

  // 점수 카운트업 애니메이션
  useEffect(() => {
    if (!animate) {
      setDisplayScore(score);
      setStrokeDasharray(`${(score / 100) * circumference} ${circumference}`);
      return;
    }

    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // easeOutQuart 이징 함수
      const eased = 1 - Math.pow(1 - progress, 4);
      const currentScore = Math.round(eased * score);

      setDisplayScore(currentScore);
      setStrokeDasharray(`${(eased * score / 100) * circumference} ${circumference}`);

      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayScore(score);
        setStrokeDasharray(`${(score / 100) * circumference} ${circumference}`);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [score, animate, circumference]);

  // 등급에 따른 설명 문구
  const getGradeDescription = (grade) => {
    const descriptions = {
      'A': '우수한 코드 품질입니다!',
      'B': '양호한 코드 품질입니다.',
      'C': '개선이 필요한 부분이 있습니다.',
      'D': '코드 품질 개선이 권장됩니다.',
      'F': '코드 품질에 심각한 문제가 있습니다.'
    };
    return descriptions[grade] || '';
  };

  return (
    <div className="score-donut-card">
      <h3 className="score-donut-title">종합 점수</h3>

      <div className="score-donut-chart">
        <svg viewBox="0 0 100 100" className="donut-svg">
          {/* 배경 원 */}
          <circle
            cx="50"
            cy="50"
            r="45"
            className="donut-background"
          />
          {/* 점수 원 */}
          <circle
            cx="50"
            cy="50"
            r="45"
            className="donut-progress"
            style={{
              stroke: gradeColor,
              strokeDasharray: strokeDasharray,
            }}
          />
        </svg>

        <div className="donut-center">
          <span className="donut-score">{displayScore}</span>
          <span className="donut-score-suffix">점</span>
        </div>
      </div>

      {/* 등급 배지 */}
      <div
        className="grade-badge"
        style={{ backgroundColor: gradeColor }}
      >
        <span className="grade-letter">{grade}</span>
        <span className="grade-label">등급</span>
      </div>

      {/* 설명 문구 */}
      <p className="grade-description">
        {getGradeDescription(grade)}
      </p>

      {/* 점수 계산 방법 버튼 */}
      <button
        className="score-method-btn"
        onClick={() => setShowMethodModal(true)}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 7V11M8 5H8.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        점수 계산 방법
      </button>

      {/* 점수 계산 방법 모달 */}
      {showMethodModal && (
        <div className="score-method-modal-overlay" onClick={() => setShowMethodModal(false)}>
          <div className="score-method-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>점수 계산 방법</h3>
              <button className="modal-close" onClick={() => setShowMethodModal(false)}>
                &times;
              </button>
            </div>

            <div className="modal-content">
              <div className="method-section">
                <h4>종합 점수 산출 공식</h4>
                <div className="formula-box">
                  <p>종합 점수 = (복잡도 × 0.25) + (변수 관리 × 0.20) + (이벤트 핸들러 × 0.15) + (유지보수 × 0.25) + (성능 × 0.15)</p>
                </div>
              </div>

              <div className="method-section">
                <h4>각 지표별 점수</h4>
                <div className="score-breakdown">
                  <div className="breakdown-item">
                    <span className="breakdown-label">함수 복잡도</span>
                    <span className="breakdown-value">{scores.complexity || 0}점</span>
                    <span className="breakdown-weight">× 25%</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-label">변수 관리</span>
                    <span className="breakdown-value">{scores.variableManagement || 0}점</span>
                    <span className="breakdown-weight">× 20%</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-label">이벤트 핸들러</span>
                    <span className="breakdown-value">{scores.eventHandlers || 0}점</span>
                    <span className="breakdown-weight">× 15%</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-label">유지보수 지수</span>
                    <span className="breakdown-value">{scores.maintainability || 0}점</span>
                    <span className="breakdown-weight">× 25%</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-label">성능 리스크</span>
                    <span className="breakdown-value">{scores.performanceRisk || 0}점</span>
                    <span className="breakdown-weight">× 15%</span>
                  </div>
                </div>
              </div>

              <div className="method-section">
                <h4>등급 기준</h4>
                <div className="grade-criteria">
                  <div className="criteria-item grade-a">A등급: 90점 이상</div>
                  <div className="criteria-item grade-b">B등급: 80~89점</div>
                  <div className="criteria-item grade-c">C등급: 70~79점</div>
                  <div className="criteria-item grade-d">D등급: 60~69점</div>
                  <div className="criteria-item grade-f">F등급: 60점 미만</div>
                </div>
              </div>

              <div className="method-section">
                <h4>평가 기준 설명</h4>
                <ul className="criteria-list">
                  <li><strong>함수 복잡도:</strong> 순환 복잡도(Cyclomatic Complexity)를 기반으로 함수의 복잡성을 평가</li>
                  <li><strong>변수 관리:</strong> 변수 선언, 스코프 관리, 미사용 변수 등을 분석</li>
                  <li><strong>이벤트 핸들러:</strong> React 이벤트 핸들러의 효율성과 메모이제이션 적용 여부 평가</li>
                  <li><strong>유지보수 지수:</strong> 코드 가독성, 모듈화, 주석 품질 등을 종합 평가</li>
                  <li><strong>성능 리스크:</strong> 불필요한 리렌더링, 메모리 누수 가능성 등을 분석</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreDonut;
