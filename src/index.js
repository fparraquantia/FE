import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
// For release, remove strict mode to stop double rendering.
root.render(
    <App />
);