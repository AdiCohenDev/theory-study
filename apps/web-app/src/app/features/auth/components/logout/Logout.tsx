import React from 'react';
import { signOut } from 'firebase/auth';
import Auth from '../../../../shared/firebase/Auth';

const LogoutButton = () => {
  const logout = async () => {
    await signOut(Auth);
  };
  return (
    <>
      <button onClick={() => logout()}>Log Out</button>
    </>
  );
};

export default LogoutButton;
