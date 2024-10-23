import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import any global styles
import App from './App'; // Import the main App component

// Create a root element and render the App component into it
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Measure performance in your app, pass a function to log results
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);