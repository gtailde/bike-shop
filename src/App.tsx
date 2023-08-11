import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/app.scss';
import AppRouter from 'components/AppRouter';

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AppRouter></AppRouter>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
