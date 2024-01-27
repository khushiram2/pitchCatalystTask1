import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ProvideContext } from './contextApi/provideContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ProvideContext>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </ProvideContext>
  </BrowserRouter>
)
