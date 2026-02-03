import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CartProvider } from './context/CartContext.jsx'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { UserProvider } from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
      <CartProvider>
        <App />
        <Toaster position='top-right' toastOptions={{duration:2500,style:{fontSize:'14px'}}}/>
      </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)
