import React from 'react';
import ReactDOM from 'react-dom';

import ResearchProvider from './context/ResearchContext';
import AuthProvider from './context/AuthContext';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ResearchProvider>
        <App />
      </ResearchProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
