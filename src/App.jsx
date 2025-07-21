import React, { useState, useEffect } from 'react';
import Planner from './components/Planner';
import Chatbot from './components/Chatbot';

export default function App() {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const storedReminders = JSON.parse(localStorage.getItem('reminders'));
    if (storedReminders) {
      setReminders(storedReminders);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = (text) => {
    setReminders([...reminders, { id: Date.now(), text, completed: false }]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Daily Planner</h1>
        <Planner reminders={reminders} setReminders={setReminders} />
      </div>
      <Chatbot addReminder={addReminder} />
    </div>
  );
} 