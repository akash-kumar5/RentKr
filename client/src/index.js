import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core';
import '@fortawesome/react-fontawesome';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './store/auth';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
  <React.StrictMode>
    <GoogleOAuthProvider clientId="416637324816-9lor792ks89srtgsd17ffphr27mpse6p.apps.googleusercontent.com" />
    <App />
  </React.StrictMode>
  </AuthProvider>
);

