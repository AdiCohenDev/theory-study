import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './app/app';
import Login from './app/features/auth/components/login/Login';
import Logout from './app/features/auth/components/logout/Logout';
import store from './stores/store';
import { Provider } from 'react-redux';
import Practice from './app/features/practice/Practice';
import Navbar from './app/features/navbar/navbar';

const root = ReactDOMClient.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="practice" element={<Practice />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
