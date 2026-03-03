// src/components/analysis/FileTable.jsx
// 파일별 분석 결과 테이블 컴포넌트

import { useState, useMemo } from 'react';
import { getScoreStatus } from '../../utils/analysisHelpers';
import './FileTable.css';

/**
 * 파일 테이블 컴포넌트
 * @param {object} props
 * @param {object[]} props.files - 파일 목록
 */
const FileTable = ({ files = [] }) => {
  const [sortConfig, setSortConfig] = useState({
    key: 'score',
    direction: 'asc'
  });

  // 정렬된 데이터
  const sortedFiles = useMemo(() => {
    const sorted = [...files].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sorted;
  }, [files, sortConfig]);

  // 정렬 핸들러
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // 정렬 아이콘
  const SortIcon = ({ columnKey }) => {
    const isActive = sortConfig.key === columnKey;

    return (
      <span className={`sort-icon ${isActive ? 'active' : ''}`}>
        {isActive && sortConfig.direction === 'asc' ? (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2L10 7H2L6 2Z" fill="currentColor"/>
          </svg>
        ) : isActive && sortConfig.direction === 'desc' ? (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 10L2 5H10L6 10Z" fill="currentColor"/>
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2L9 5H3L6 2Z" fill="currentColor" opacity="0.3"/>
            <path d="M6 10L3 7H9L6 10Z" fill="currentColor" opacity="0.3"/>
          </svg>
        )}
      </span>
    );
  };

  const columns = [
    { key: 'fileName', label: '파일명', sortable: true },
    { key: 'loc', label: 'LOC', sortable: true },
    { key: 'complexity', label: '복잡도', sortable: true },
    { key: 'hooks', label: 'Hook 수', sortable: true },
    { key: 'score', label: '점수', sortable: true },
  ];

  if (files.length === 0) {
    return (
      <div className="file-table-card">
        <h3 className="file-table-title">파일별 분석 결과</h3>
        <div className="table-empty">
          <p>분석된 파일이 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="file-table-card">
      <div className="file-table-header">
        <h3 className="file-table-title">파일별 분석 결과</h3>
        <span className="file-count">{files.length}개 파일</span>
      </div>

      <div className="table-wrapper">
        <table className="file-table">
          <thead>
            <tr>
              {columns.map(column => (
                <th
                  key={column.key}
                  className={column.sortable ? 'sortable' : ''}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="th-content">
                    {column.label}
                    {column.sortable && <SortIcon columnKey={column.key} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedFiles.map((file, index) => {
              const scoreStatus = getScoreStatus(file.score);

              return (
                <tr key={index}>
                  <td className="cell-filename">
                    <span className="filename">{file.fileName}</span>
                  </td>
                  <td className="cell-number">{file.loc}</td>
                  <td className="cell-number">
                    <span className={`complexity-badge ${file.complexity > 10 ? 'high' : file.complexity > 5 ? 'medium' : 'low'}`}>
                      {file.complexity}
                    </span>
                  </td>
                  <td className="cell-number">{file.hooks}</td>
                  <td className="cell-score">
                    <div className="score-cell">
                      <span
                        className="score-value"
                        style={{ color: scoreStatus.color }}
                      >
                        {file.score}
                      </span>
                      <div className="score-bar">
                        <div
                          className="score-bar-fill"
                          style={{
                            width: `${file.score}%`,
                            backgroundColor: scoreStatus.color
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileTable;
