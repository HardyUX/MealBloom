import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CalendarProvider } from './context/CalendarContext.jsx'
import { TemplateProvider } from './context/TemplateContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CalendarProvider>
      <TemplateProvider>
        <App />
      </TemplateProvider>
    </CalendarProvider>
  </StrictMode>,
)
