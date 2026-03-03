// src/services/analysisApi.js
// API 서비스 - 백엔드와의 통신을 담당

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * 코드 분석 API 호출
 * @param {File} file - 업로드된 ZIP 파일
 * @param {Function} onProgress - 진행 상태 콜백
 * @returns {Promise<Object>} 분석 결과
 */
export const analyzeCode = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    // 진행 단계 시뮬레이션 (실제 백엔드에서 SSE나 WebSocket으로 전송 가능)
    const steps = [
      { step: 'extracting', label: '압축 해제', progress: 10 },
      { step: 'scanning', label: '파일 스캔', progress: 30 },
      { step: 'parsing', label: 'AST 파싱', progress: 55 },
      { step: 'calculating', label: '메트릭 계산', progress: 80 },
      { step: 'scoring', label: '점수 산출', progress: 95 },
    ];

    // 진행 상태 시뮬레이션
    for (const stepInfo of steps) {
      onProgress?.(stepInfo);
      await new Promise(resolve => setTimeout(resolve, 600));
    }

    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`분석 실패: ${response.status}`);
    }

    const result = await response.json();
    onProgress?.({ step: 'complete', label: '완료', progress: 100 });

    return result;
  } catch (error) {
    console.error('Analysis API Error:', error);
    throw error;
  }
};

/**
 * 목업 데이터를 반환하는 함수 (개발/테스트용)
 * @param {Function} onProgress - 진행 상태 콜백
 * @returns {Promise<Object>} 목업 분석 결과
 */
export const analyzeCodeMock = async (onProgress) => {
  const steps = [
    { step: 'extracting', label: '압축 해제', progress: 10 },
    { step: 'scanning', label: '파일 스캔', progress: 30 },
    { step: 'parsing', label: 'AST 파싱', progress: 55 },
    { step: 'calculating', label: '메트릭 계산', progress: 80 },
    { step: 'scoring', label: '점수 산출', progress: 95 },
  ];

  // 진행 상태 시뮬레이션
  for (const stepInfo of steps) {
    onProgress?.(stepInfo);
    await new Promise(resolve => setTimeout(resolve, 800));
  }

  onProgress?.({ step: 'complete', label: '완료', progress: 100 });

  // 목업 데이터 반환
  return {
    summary: {
      overallScore: 78,
      grade: 'B',
      analysisTime: 1.2,
      totalFiles: 12,
      totalFunctions: 48,
      totalASTNodes: 8234,
      averageFunctionLength: 24
    },
    scores: {
      complexity: 62,
      variableManagement: 74,
      eventHandlers: 91,
      maintainability: 80,
      performanceRisk: 70
    },
    warnings: [
      {
        type: 'missing_key',
        file: 'UserList.tsx',
        line: 45,
        message: 'List rendering without key prop',
        severity: 'warning'
      },
      {
        type: 'complexity',
        file: 'DataProcessor.tsx',
        line: 128,
        message: 'Function complexity exceeds threshold (15)',
        severity: 'error'
      },
      {
        type: 'unused_variable',
        file: 'utils/helpers.ts',
        line: 67,
        message: 'Variable "tempData" is declared but never used',
        severity: 'info'
      }
    ],
    fileBreakdown: [
      { fileName: 'App.tsx', loc: 145, complexity: 8, hooks: 3, score: 85 },
      { fileName: 'UserList.tsx', loc: 234, complexity: 12, hooks: 5, score: 72 },
      { fileName: 'DataProcessor.tsx', loc: 312, complexity: 18, hooks: 2, score: 58 },
      { fileName: 'Header.tsx', loc: 87, complexity: 4, hooks: 1, score: 92 },
      { fileName: 'Footer.tsx', loc: 45, complexity: 2, hooks: 0, score: 95 },
      { fileName: 'Dashboard.tsx', loc: 189, complexity: 10, hooks: 4, score: 78 },
      { fileName: 'Settings.tsx', loc: 156, complexity: 7, hooks: 3, score: 81 },
      { fileName: 'utils/api.ts', loc: 98, complexity: 6, hooks: 0, score: 84 },
      { fileName: 'utils/helpers.ts', loc: 124, complexity: 5, hooks: 0, score: 88 },
      { fileName: 'hooks/useAuth.ts', loc: 67, complexity: 4, hooks: 2, score: 90 },
      { fileName: 'hooks/useData.ts', loc: 89, complexity: 6, hooks: 3, score: 82 },
      { fileName: 'context/AppContext.tsx', loc: 112, complexity: 5, hooks: 2, score: 86 }
    ]
  };
};

export default {
  analyzeCode,
  analyzeCodeMock
};
