import './app.module.scss';
import './shared/styles.css';
import { Outlet } from 'react-router-dom';
import Navbar from './shared/layout/navbar/Navbar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthLoading, setUser } from '../stores/AuthStore';
import Auth from './shared/firebase/Auth';
import { User } from './features/auth/shared/models/User';
import ProtectedRoutes from './shared/components/Routes/ProtectedRoutes';

export function App() {
  const dispatch = useDispatch();
  const isAuthLoading = useSelector(selectIsAuthLoading);

  useEffect(() => {
    Auth.onAuthStateChanged((user) => {
      const userObject = user ? new User(user).get() : null;
      dispatch(setUser(userObject));
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="container-all">
        {isAuthLoading === false && <ProtectedRoutes />}
        <Outlet />
      </div>
    </>
  );
}

export default App;
