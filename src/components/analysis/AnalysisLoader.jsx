// src/components/analysis/AnalysisLoader.jsx
// 분석 진행 상태를 표시하는 로딩 컴포넌트

import './AnalysisLoader.css';

/**
 * 분석 로딩 컴포넌트
 * @param {object} props
 * @param {number} props.progress - 진행률 (0~100)
 * @param {string} props.currentStep - 현재 진행 중인 단계
 * @param {string[]} props.completedSteps - 완료된 단계 목록
 * @param {object[]} props.steps - 전체 단계 정보
 * @param {string} props.error - 에러 메시지
 */
const AnalysisLoader = ({
  progress = 0,
  currentStep,
  completedSteps = [],
  steps = [],
  error = null
}) => {
  return (
    <div className="analysis-loader-page">
      <div className="analysis-loader-container">
        {/* 로딩 애니메이션 */}
        <div className="loader-animation">
          <div className="loader-circle">
            <svg viewBox="0 0 100 100">
              <circle
                className="loader-circle-bg"
                cx="50"
                cy="50"
                r="45"
              />
              <circle
                className="loader-circle-progress"
                cx="50"
                cy="50"
                r="45"
                style={{
                  strokeDasharray: `${progress * 2.83} 283`,
                }}
              />
            </svg>
            <div className="loader-percentage">
              <span className="percentage-number">{Math.round(progress)}</span>
              <span className="percentage-symbol">%</span>
            </div>
          </div>
        </div>

        {/* 헤더 */}
        <div className="loader-header">
          <h1 className="loader-title">코드 분석 중</h1>
          <p className="loader-subtitle">
            프로젝트를 분석하고 있습니다. 잠시만 기다려주세요.
          </p>
        </div>

        {/* 에러 표시 */}
        {error && (
          <div className="loader-error">
            <div className="error-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="error-message">{error}</p>
          </div>
        )}

        {/* 진행 단계 */}
        {!error && (
          <div className="loader-steps">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = currentStep === step.id;

              return (
                <div
                  key={step.id}
                  className={`loader-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                >
                  <div className="step-indicator">
                    {isCompleted ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3 8L6.5 11.5L13 5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : isCurrent ? (
                      <div className="step-spinner" />
                    ) : (
                      <span className="step-number">{index + 1}</span>
                    )}
                  </div>
                  <div className="step-content">
                    <span className="step-label">{step.label}</span>
                    {isCurrent && (
                      <span className="step-description">{step.description}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 프로그레스 바 */}
        <div className="loader-progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 안내 문구 */}
        <p className="loader-hint">
          평균 분석 시간: 약 30초 ~ 1분
        </p>
      </div>
    </div>
  );
};

export default AnalysisLoader;
