// src/utils/analysisHelpers.js
// 분석 관련 유틸리티 함수들

/**
 * 점수에 따른 등급 반환
 * @param {number} score - 0~100 점수
 * @returns {string} 등급 (A, B, C, D, F)
 */
export const getGradeFromScore = (score) => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
};

/**
 * 점수에 따른 상태 반환
 * @param {number} score - 0~100 점수
 * @returns {object} 상태 정보 { status, label, color }
 */
export const getScoreStatus = (score) => {
  if (score >= 80) {
    return { status: 'good', label: '양호', color: '#4CAF50' };
  }
  if (score >= 60) {
    return { status: 'warning', label: '주의', color: '#FF9800' };
  }
  return { status: 'danger', label: '위험', color: '#F44336' };
};

/**
 * 등급에 따른 색상 반환
 * @param {string} grade - 등급 (A, B, C, D, F)
 * @returns {string} 색상 코드
 */
export const getGradeColor = (grade) => {
  const colors = {
    'A': '#4CAF50',
    'B': '#8BC34A',
    'C': '#FF9800',
    'D': '#FF5722',
    'F': '#F44336'
  };
  return colors[grade] || '#9E9E9E';
};

/**
 * 메트릭 키에 따른 한글 라벨 반환
 * @param {string} key - 메트릭 키
 * @returns {string} 한글 라벨
 */
export const getMetricLabel = (key) => {
  const labels = {
    complexity: '함수 복잡도',
    variableManagement: '변수 관리',
    eventHandlers: '이벤트 핸들러',
    maintainability: '유지보수 지수',
    performanceRisk: '성능 리스크'
  };
  return labels[key] || key;
};

/**
 * 메트릭에 따른 설명 반환
 * @param {string} key - 메트릭 키
 * @param {number} score - 점수
 * @returns {string} 설명 문구
 */
export const getMetricDescription = (key, score) => {
  const descriptions = {
    complexity: {
      good: '함수들이 적절한 복잡도를 유지하고 있습니다.',
      warning: '일부 함수의 복잡도가 높습니다. 리팩토링을 고려하세요.',
      danger: '많은 함수가 과도한 복잡도를 가지고 있습니다.'
    },
    variableManagement: {
      good: '변수 선언 및 관리가 잘 되어있습니다.',
      warning: '일부 변수 관리에 개선이 필요합니다.',
      danger: '변수 관리에 심각한 문제가 있습니다.'
    },
    eventHandlers: {
      good: '이벤트 핸들러가 효율적으로 구현되어 있습니다.',
      warning: '일부 이벤트 핸들러 최적화가 필요합니다.',
      danger: '이벤트 핸들러에 성능 문제가 있을 수 있습니다.'
    },
    maintainability: {
      good: '코드 유지보수성이 우수합니다.',
      warning: '유지보수성 개선을 위한 리팩토링이 필요합니다.',
      danger: '코드 유지보수가 어려운 상태입니다.'
    },
    performanceRisk: {
      good: '성능 관련 위험 요소가 적습니다.',
      warning: '일부 성능 최적화가 필요한 부분이 있습니다.',
      danger: '심각한 성능 문제가 예상됩니다.'
    }
  };

  const status = getScoreStatus(score).status;
  return descriptions[key]?.[status] || '';
};

/**
 * 메트릭에 따른 아이콘 반환
 * @param {string} key - 메트릭 키
 * @returns {string} 아이콘 SVG
 */
export const getMetricIcon = (key) => {
  const icons = {
    complexity: 'complexity',
    variableManagement: 'variable',
    eventHandlers: 'event',
    maintainability: 'maintenance',
    performanceRisk: 'performance'
  };
  return icons[key] || 'default';
};

/**
 * 경고 심각도에 따른 정보 반환
 * @param {string} severity - 심각도 (error, warning, info)
 * @returns {object} 심각도 정보
 */
export const getSeverityInfo = (severity) => {
  const info = {
    error: { label: '오류', color: '#F44336', icon: 'error' },
    warning: { label: '경고', color: '#FF9800', icon: 'warning' },
    info: { label: '정보', color: '#2196F3', icon: 'info' }
  };
  return info[severity] || info.info;
};

/**
 * 숫자 포맷팅 (천 단위 콤마)
 * @param {number} num - 숫자
 * @returns {string} 포맷팅된 문자열
 */
export const formatNumber = (num) => {
  return num?.toLocaleString('ko-KR') || '0';
};

/**
 * JSON 다운로드
 * @param {object} data - 다운로드할 데이터
 * @param {string} filename - 파일명
 */
export const downloadJSON = (data, filename = 'analysis-result.json') => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
