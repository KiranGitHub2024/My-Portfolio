import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { initGA, trackPageView } from "./analytics";
import App from './App.tsx'

// 🔥 Initialize Google Analytics
initGA();

// 🔥 Track initial page load
trackPageView();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)