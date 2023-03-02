import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

export const SERVER_URL='https://maysway.bsite.net/';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter basename='/Books_Db_Panel'>
    <App />
  </BrowserRouter>
);
