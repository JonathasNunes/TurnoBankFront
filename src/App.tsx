import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import Header from './components/Header';
import { AuthProvider } from './contexts/Auth/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
