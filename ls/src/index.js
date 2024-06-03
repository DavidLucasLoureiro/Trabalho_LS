import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './App';

// Criação do ponto de entrada principal para a aplicação React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza a aplicação dentro do elemento com o id 'root' no HTML
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
