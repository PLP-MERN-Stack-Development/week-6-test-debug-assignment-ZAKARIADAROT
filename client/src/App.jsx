import React from 'react';
import { BugProvider } from './context/BugContext';
import Dashboard from './pages/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <BugProvider>
        <Dashboard />
      </BugProvider>
    </ErrorBoundary>
  );
}

export default App;
