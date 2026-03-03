// src/hooks/useAnalysis.js
// 분석 상태 관리를 위한 커스텀 훅

import { useState, useCallback } from 'react';
import { analyzeCodeMock } from '../services/analysisApi';

/**
 * 분석 상태 관리 커스텀 훅
 * @returns {object} 분석 관련 상태 및 함수
 */
export const useAnalysis = () => {
  // 상태 정의
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [analysisStatus, setAnalysisStatus] = useState('idle'); // idle, loading, success, error

  // 분석 단계 정의
  const analysisSteps = [
    { id: 'extracting', label: '압축 해제', description: 'ZIP 파일 압축 해제 중...' },
    { id: 'scanning', label: '파일 스캔', description: '프로젝트 파일 스캔 중...' },
    { id: 'parsing', label: 'AST 파싱', description: '코드 구문 분석 중...' },
    { id: 'calculating', label: '메트릭 계산', description: '품질 메트릭 계산 중...' },
    { id: 'scoring', label: '점수 산출', description: '최종 점수 산출 중...' },
  ];

  /**
   * 진행 상태 업데이트 핸들러
   */
  const handleProgress = useCallback((stepInfo) => {
    setProgress(stepInfo.progress);
    setCurrentStep(stepInfo.step);

    if (stepInfo.step !== 'complete') {
      setCompletedSteps(prev => {
        const stepIndex = analysisSteps.findIndex(s => s.id === stepInfo.step);
        return analysisSteps.slice(0, stepIndex).map(s => s.id);
      });
    } else {
      setCompletedSteps(analysisSteps.map(s => s.id));
    }
  }, []);

  /**
   * 분석 시작
   * @param {File} file - 분석할 ZIP 파일
   */
  const startAnalysis = useCallback(async (file) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setProgress(0);
    setCurrentStep(null);
    setCompletedSteps([]);
    setAnalysisStatus('loading');

    try {
      // 실제 API 호출 또는 목업 사용
      // const data = await analyzeCode(file, handleProgress);
      const data = await analyzeCodeMock(handleProgress);

      setResult(data);
      setAnalysisStatus('success');
      return data;
    } catch (err) {
      const errorMessage = err.message || '분석 중 오류가 발생했습니다.';
      setError(errorMessage);
      setAnalysisStatus('error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [handleProgress]);

  /**
   * 상태 초기화
   */
  const resetAnalysis = useCallback(() => {
    setLoading(false);
    setProgress(0);
    setCurrentStep(null);
    setCompletedSteps([]);
    setError(null);
    setResult(null);
    setAnalysisStatus('idle');
  }, []);

  return {
    // 상태
    loading,
    progress,
    currentStep,
    completedSteps,
    error,
    result,
    analysisStatus,
    analysisSteps,

    // 함수
    startAnalysis,
    resetAnalysis,
  };
};

export default useAnalysis;
