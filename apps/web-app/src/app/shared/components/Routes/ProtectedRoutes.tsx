import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../../../features/auth/components/login/Login';
import Logout from '../../../features/auth/components/logout/Logout';
import Practice from '../../../features/practice/Practice';
import { selectIsAuth } from '../../../../stores/AuthStore';
import Home from '../../../features/auth/components/home/Home';

const ProtectedRoutes = () => {
  const isAuth = useSelector(selectIsAuth);

  return (
    <Routes>
      {!isAuth && (
        <>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
      {isAuth && (
        <>
          <Route path="logout" element={<Logout />} />
          <Route path="practice" element={<Practice />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};

export default ProtectedRoutes;
