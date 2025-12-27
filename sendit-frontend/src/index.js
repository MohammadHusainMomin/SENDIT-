import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


<GoogleOAuthProvider clientId="473711996237-u83qd6jjv1c8ikf5sbm92vgd61i01rcr.apps.googleusercontent.com">
  <AuthProvider>
  <App />
  </AuthProvider>
</GoogleOAuthProvider>



);

