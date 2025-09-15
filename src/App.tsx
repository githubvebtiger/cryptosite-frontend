import React from 'react';
import Navigation from './components/Navigation';
import { ModalProvider } from './provider/ModalContext';
import { useTheme } from './provider/ThemeProvider';
import { AuthProvider } from './provider/AuthProvider';

function App() {
  const {theme} = useTheme()
  return (
    <div className={theme}>
      <AuthProvider>
        <ModalProvider>
          <Navigation/>
        </ModalProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
