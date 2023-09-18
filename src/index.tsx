import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { commercetoolsAPI } from 'API/CommercetoolsAPI';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

reportWebVitals();

commercetoolsAPI
  .startAPI()
  .then(() => {
    console.log('API started successfully');
  })
  .catch((error) => {
    console.error('Error starting API:', error);
  });
