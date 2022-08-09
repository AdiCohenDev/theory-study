import React, { useState } from 'react';
import './ReportProblem.css';
import HomeButton from '../../../../shared/components/home-button/HomeButton';

const ReportProblem = () => {
  const [userProblem, setUserProblem] = useState('');
  const sendUserProblem = () => {};

  const handleMessageChange = (event: any) => {
    setUserProblem(event.target.value);
  };

  return (
    <div className="container">
      <div className="report-problem-container">
        <h2 className="report-title">מה תרצה לדווח לנו?</h2>
        <textarea
          id="story"
          name="story"
          rows={6}
          cols={40}
          placeholder="כתוב כאן"
          value={userProblem}
          onChange={handleMessageChange}
        ></textarea>
        <button className="send-problem-btn" onClick={sendUserProblem}>
          שלח
        </button>
      </div>
      <HomeButton />
    </div>
  );
};

export default ReportProblem;
