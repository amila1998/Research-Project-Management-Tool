import "core-js";
import "regenerator-runtime";
import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { AuthContextProvider } from "./context/AuthContext";
const container = document.getElementById('root');
const root = createRoot(container);
root.render(

<React.StrictMode>
     <AuthContextProvider>
<App/>
</AuthContextProvider>
  </React.StrictMode>,



);