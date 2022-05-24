import './app.module.scss';
import './shared/styles.css';
import { Link, Outlet } from 'react-router-dom';

export function App() {
  return (
    <>
      <div className="container">
        <Link to="/login">Login</Link> | <Link to="/logout">Logout</Link> | <Link to="/practice">Practice</Link> |{' '}
      </div>
      <Outlet />
    </>
  );
}

export default App;
