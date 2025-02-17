import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'swiper/css'
// import {tailwindcss} from '../node_modules/tailwindcss'
import  '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
// import '../node_modules/tailwindcss'
createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>
)
