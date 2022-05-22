import React from 'react';
import { signOut } from 'firebase/auth';
import Auth from '../../../../../../../../api/firebase/auth';

const LogoutButton = () => {
  const logout = async () => {
    try {
      await signOut(Auth);
    } catch (error) {
      console.log(error);
    }
  };
  return <button onClick={() => logout()}>Log Out</button>;
};

export default LogoutButton;
