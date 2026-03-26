import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Ye line add karni hai
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* App ko BrowserRouter ke andar wrap kar do */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)