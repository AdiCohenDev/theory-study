import React from 'react';
import { signOut } from 'firebase/auth';
import Auth from '../../../../shared/firebase/Auth';
import './Logout.css';

const LogoutButton = () => {
  const logout = async () => {
    await signOut(Auth);
  };
  return (
    <div className="logout-container">
      <div onClick={() => logout()} className="logout-btn">
        התנתק
      </div>
    </div>
  );
};

export default LogoutButton;
