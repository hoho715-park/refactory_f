// src/pages/AnalysisPage.jsx
// 분석 진행 및 결과 표시 페이지

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnalysisLoader, Dashboard } from '../components/analysis';
import useAnalysis from '../hooks/useAnalysis';

/**
 * 분석 페이지 컴포넌트
 * 로딩 → 결과 대시보드 전환을 관리
 */
const AnalysisPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDashboard, setShowDashboard] = useState(false);

  const {
    loading,
    progress,
    currentStep,
    completedSteps,
    error,
    result,
    analysisStatus,
    analysisSteps,
    startAnalysis,
    resetAnalysis,
  } = useAnalysis();

  // 파일 정보 가져오기 (ZipUpload 페이지에서 전달)
  const uploadedFile = location.state?.file;

  // 페이지 로드 시 분석 시작
  useEffect(() => {
    if (analysisStatus === 'idle') {
      handleStartAnalysis();
    }
  }, []);

  // 분석 완료 시 대시보드 표시
  useEffect(() => {
    if (analysisStatus === 'success' && result) {
      // 약간의 딜레이 후 대시보드 표시 (완료 애니메이션을 위해)
      const timer = setTimeout(() => {
        setShowDashboard(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [analysisStatus, result]);

  // 분석 시작 핸들러
  const handleStartAnalysis = async () => {
    try {
      await startAnalysis(uploadedFile);
    } catch (err) {
      console.error('Analysis failed:', err);
    }
  };

  // 재분석 핸들러
  const handleReanalyze = () => {
    setShowDashboard(false);
    resetAnalysis();
    // 약간의 딜레이 후 재분석 시작
    setTimeout(() => {
      handleStartAnalysis();
    }, 100);
  };

  // 새 프로젝트 업로드 핸들러
  const handleNewProject = () => {
    resetAnalysis();
    navigate('/code-insight');
  };

  // 에러 발생 시 재시도 핸들러
  const handleRetry = () => {
    resetAnalysis();
    handleStartAnalysis();
  };

  // 대시보드 표시
  if (showDashboard && result) {
    return (
      <Dashboard
        data={result}
        onReanalyze={handleReanalyze}
        onNewProject={handleNewProject}
      />
    );
  }

  // 로딩/에러 화면
  return (
    <div className="analysis-page">
      <AnalysisLoader
        progress={progress}
        currentStep={currentStep}
        completedSteps={completedSteps}
        steps={analysisSteps}
        error={error}
      />

      {/* 에러 시 재시도 버튼 */}
      {error && (
        <div className="analysis-error-actions">
          <button className="retry-btn" onClick={handleRetry}>
            다시 시도
          </button>
          <button className="back-btn" onClick={handleNewProject}>
            돌아가기
          </button>
        </div>
      )}
    </div>
  );
};

export default AnalysisPage;
