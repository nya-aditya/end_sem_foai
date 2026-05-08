import React from 'react';
import { DashboardProvider } from './context/DashboardContext';
import Navbar from './components/Navbar';
import ISSDashboard from './components/ISSDashboard';
import NewsDashboard from './components/NewsDashboard';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-mission-gradient text-white flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto p-4 lg:p-6 space-y-8">
          <ISSDashboard />
          <NewsDashboard />
        </main>
        <Chatbot />
      </div>
    </DashboardProvider>
  );
}

export default App;
