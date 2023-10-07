/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { hydrate, render } from "react-dom";


const rootElement: HTMLElement | null = document.getElementById("root")
if (rootElement.hasChildNodes()) { 
  hydrate(<Provider store={store}>
     <BrowserRouter>
       <React.StrictMode>
    
         <App />
       </React.StrictMode>
       </BrowserRouter>
       </Provider>, rootElement); 
} else { 
  render(<Provider store={store}>
     <BrowserRouter>
       <React.StrictMode>
    
         <App />
       </React.StrictMode>
       </BrowserRouter>
       </Provider>, rootElement);
}