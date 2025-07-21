import React, { useState } from 'react';

const Planner = ({ reminders, setReminders }) => {
  const [newReminder, setNewReminder] = useState('');

  const addReminder = () => {
    if (newReminder.trim()) {
      setReminders([...reminders, { id: Date.now(), text: newReminder, completed: false }]);
      setNewReminder('');
    }
  };

  const toggleReminder = (id) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
      )
    );
  };

  const removeReminder = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Today's Plan</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newReminder}
          onChange={(e) => setNewReminder(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-gray-900"
          placeholder="Add a new reminder"
        />
        <button onClick={addReminder} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
          Add
        </button>
      </div>
      <ul>
        {reminders.map((reminder) => (
          <li
            key={reminder.id}
            className={`flex items-center justify-between p-2 rounded-lg ${
              reminder.completed ? 'bg-gray-700' : 'bg-gray-800'
            }`}
          >
            <span
              className={`cursor-pointer ${reminder.completed ? 'line-through' : ''}`}
              onClick={() => toggleReminder(reminder.id)}
            >
              {reminder.text}
            </span>
            <button
              onClick={() => removeReminder(reminder.id)}
              className="px-2 py-1 bg-red-600 text-white rounded-lg"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Planner;
