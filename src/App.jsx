import React from 'react';
import Planner from './components/Planner';
import Chatbot from './components/Chatbot';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Daily Planner</h1>
        <Planner />
      </div>
      <Chatbot />
    </div>
  );
} 