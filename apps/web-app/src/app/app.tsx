import './app.module.scss';
import './shared/styles.css';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Navbar from './shared/layout/navbar/navbar';
import Login from './features/auth/components/login/Login';
import Logout from './features/auth/components/logout/Logout';
import Practice from './features/practice/Practice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../stores/AuthStore';
import Auth from './shared/firebase/auth';
import { User } from './features/auth/shared/models/user';
import ProtectedRoutes from './shared/components/Routes/ProtectedRoutes';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    Auth.onAuthStateChanged((user) => {
      const userObject = user ? new User(user).get() : null;
      dispatch(setUser(userObject));
    });
  }, []);

  return (
    <>
      <Navbar />
      <ProtectedRoutes />
      <Outlet />
    </>
  );
}

export default App;
