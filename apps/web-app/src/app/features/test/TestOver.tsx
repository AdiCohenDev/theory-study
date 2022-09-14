import './TestOver.css';
import { useNavigate } from 'react-router-dom';

import React from 'react';

interface IProps {
  testResult: string;
  testReveal(): void;
  startNewTest(): void;
}
const TestOver = ({ testResult, testReveal, startNewTest }: IProps) => {
  const navigate = useNavigate();

  return (
    <div className="test-over-background">
      <div className="test-over-container">
        <div>
          <h3 className="test-over-title">תוצאות המבחן:</h3>
          <p className="test-results">{testResult}</p>
        </div>
        <div>
          <button className="btn" onClick={testReveal}>
            לתשובות
          </button>
          <button className="btn" onClick={startNewTest}>
            למבחן חדש
          </button>
          <button className="btn" onClick={() => navigate('/')}>
            לעמוד הבית
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestOver;
