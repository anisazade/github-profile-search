import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './style/reset.css';
import './style/fonts.css';
import './style/base.css';
import './style/blocks.css';
import './style/utilities.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
