// src/main.jsx
// Point d'entrée de l'application React — monte App dans le DOM
 
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
 
// Monte l'application dans l'élément #root défini dans index.html
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);