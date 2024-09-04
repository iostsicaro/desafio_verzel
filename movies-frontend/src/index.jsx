import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './AppRoutes';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
