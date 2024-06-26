import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './components/Router/Router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router />
);

