import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

/* cada HTML del sitio declara su página en <body data-page="..."> */
const pagina = document.body.dataset.page || 'home';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App page={pagina} />
  </React.StrictMode>
);
