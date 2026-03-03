// src/components/analysis/Dashboard.jsx
// 분석 결과 대시보드 메인 컴포넌트

import { useNavigate } from 'react-router-dom';
import ScoreDonut from './ScoreDonut';
import SummaryCard from './SummaryCard';
import MetricCard from './MetricCard';
import WarningList from './WarningList';
import FileTable from './FileTable';
import { downloadJSON } from '../../utils/analysisHelpers';
import './Dashboard.css';

/**
 * 분석 결과 대시보드 컴포넌트
 * @param {object} props
 * @param {object} props.data - 분석 결과 데이터
 * @param {Function} props.onReanalyze - 재분석 핸들러
 * @param {Function} props.onNewProject - 새 프로젝트 업로드 핸들러
 */
const Dashboard = ({ data, onReanalyze, onNewProject }) => {
  const navigate = useNavigate();

  if (!data) {
    return (
      <div className="dashboard-error">
        <p>분석 결과를 불러올 수 없습니다.</p>
        <button onClick={() => navigate('/code-insight')}>
          다시 시도
        </button>
      </div>
    );
  }

  const { summary, scores, warnings, fileBreakdown } = data;

  // JSON 다운로드 핸들러
  const handleDownloadJSON = () => {
    const timestamp = new Date().toISOString().slice(0, 10);
    downloadJSON(data, `analysis-result-${timestamp}.json`);
  };

  // 재분석 핸들러
  const handleReanalyze = () => {
    onReanalyze?.();
  };

  // 새 프로젝트 업로드 핸들러
  const handleNewProject = () => {
    if (onNewProject) {
      onNewProject();
    } else {
      navigate('/code-insight');
    }
  };

  // 메트릭 키 배열
  const metricKeys = Object.keys(scores || {});

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* 헤더 */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1 className="dashboard-title">분석 결과</h1>
            <p className="dashboard-subtitle">
              프로젝트 코드 품질 분석이 완료되었습니다
            </p>
          </div>
          <div className="header-actions">
            <button className="action-btn secondary" onClick={handleDownloadJSON}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M15.75 11.25V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V11.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.25 7.5L9 11.25L12.75 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 11.25V2.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              JSON 다운로드
            </button>
          </div>
        </div>

        {/* 상단 요약 영역 */}
        <section className="dashboard-section summary-section">
          <div className="summary-grid">
            <ScoreDonut
              score={summary?.overallScore || 0}
              grade={summary?.grade || 'F'}
              animate={true}
              scores={scores}
            />
            <SummaryCard summary={summary} />
          </div>
        </section>

        {/* 품질 지표 카드 영역 */}
        <section className="dashboard-section">
          <h2 className="section-title">품질 지표</h2>
          <div className="metrics-grid">
            {metricKeys.map(key => (
              <MetricCard
                key={key}
                metricKey={key}
                score={scores[key]}
                animate={true}
              />
            ))}
          </div>
        </section>

        {/* 리스크 탐지 영역 */}
        <section className="dashboard-section">
          <WarningList warnings={warnings} />
        </section>

        {/* 파일 분석 테이블 영역 */}
        <section className="dashboard-section">
          <FileTable files={fileBreakdown} />
        </section>

        {/* 하단 액션 영역 */}
        <section className="dashboard-actions">
          <button className="action-btn primary" onClick={handleReanalyze}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M1.5 1.5V6H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.6325 11.25C3.09182 12.5765 3.95642 13.7243 5.10649 14.5314C6.25657 15.3385 7.63361 15.7651 9.0402 15.7503C10.4468 15.7356 11.8145 15.2803 12.9474 14.449C14.0804 13.6177 14.9214 12.4513 15.3533 11.1143C15.7852 9.77727 15.7862 8.33712 15.3561 7.00943C14.926 5.68175 14.0866 4.53336 12.9548 3.70033C11.8231 2.86731 10.4561 2.39009 9.0496 2.35328C7.64314 2.31648 6.25317 2.72183 5.0775 3.51" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            재분석
          </button>
          <button className="action-btn secondary" onClick={handleNewProject}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M15 9.75V14.25C15 14.6478 14.842 15.0294 14.5607 15.3107C14.2794 15.592 13.8978 15.75 13.5 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V4.5C2.25 4.10218 2.40804 3.72064 2.68934 3.43934C2.97064 3.15804 3.35218 3 3.75 3H8.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 2.25H15.75V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.5 10.5L15.75 2.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            새 프로젝트 업로드
          </button>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
