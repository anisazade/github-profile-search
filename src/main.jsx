import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './css/icon-font.css'
import './css/reset.css'
import './css/base.css'
import './css/blocks.css'
import './css/utilities.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
