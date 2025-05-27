import React from 'react';
import { AppStateProvider } from './context/AppStateContext';

/**
 * Main App component - Only provides global state
 */
function App({ children }) {
  return (
    <AppStateProvider>
      {children}
    </AppStateProvider>
  );
}

export default App;