import './app.module.scss';
import './shared/styles.css';
import Navbar from './features/navbar/navbar';
import { Link, Outlet } from 'react-router-dom';

export function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Link to="/Login">Login</Link> | <Link to="/Logout">Logout</Link> | <Outlet />
      </div>
    </>
  );
}

export default App;
