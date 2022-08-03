import React from 'react';
import Logout from '../auth/components/logout/Logout';
import './Settings.css';
const Settings = () => {
  return (
    <div className="container">
      <Logout />
      <button>דווח על בעיה</button>
    </div>
  );
};

export default Settings;
