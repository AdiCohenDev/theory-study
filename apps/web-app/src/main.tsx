import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './app/app';
import Login from './app/features/auth/components/login/Login';
import Logout from './app/features/auth/components/logout/Logout';
import store from './stores/store';
import { Provider } from 'react-redux';

const root = ReactDOMClient.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
