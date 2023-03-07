import React from 'react';
import ReactDOM from 'react-dom/client';
import 'animate.css/animate.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './components/GlobalStyles';
import 'aos/dist/aos.css';
import AuthProvider from './context/userContext';
import CartProvider from './context/CartContext';
import AppProvider from './context/AppContext';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <CartProvider>
                <GlobalStyles>
                    <AppProvider>
                        <App />
                    
                    </AppProvider>
                </GlobalStyles>
            </CartProvider>
        </AuthProvider>
        <Toaster />
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
