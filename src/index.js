import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './components/Context/AuthContext'
import { AuthUpdataContextProvider } from './components/Context/AuthUpdataContext';
import { Provider } from 'react-redux';
import Store from './components/redux/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
     <AuthContextProvider >
        <AuthUpdataContextProvider>
         <Provider store={Store} >
             <App /> 
          </Provider>
        </AuthUpdataContextProvider>
      </AuthContextProvider>
);
