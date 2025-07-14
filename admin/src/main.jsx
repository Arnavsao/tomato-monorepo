/* eslint-disable no-unused-vars */
import React from 'react';
import { createRoot } from 'react-dom/client';  // Corrected import
import './index.css';
import App from './App.jsx';
import {BrowserRouter} from "react-router-dom"


const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />  
  </BrowserRouter>
);