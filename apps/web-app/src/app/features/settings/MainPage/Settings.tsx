import React from 'react';
import Logout from '../../auth/components/logout/Logout';
import './Settings.css';
import { GrLinkPrevious } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2 className="title">הגדרות</h2>
      <div className="setting-item">
        <div className="item-container" onClick={() => navigate('/report-problem')}>
          <span>דווח על בעיה</span>
          <GrLinkPrevious size={20} />
        </div>
        <span className="line"></span>
      </div>
      <Logout />
    </div>
  );
};

export default Settings;
