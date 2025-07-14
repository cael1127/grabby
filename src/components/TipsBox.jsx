import React from 'react';

export default function TipsBox() {
  return (
    <div className="mt-6 bg-gray-900/60 rounded-xl p-5 border border-gray-700 animate-fade-in">
      <h3 className="text-lg font-semibold mb-2">Tips for Best Results</h3>
      <ul className="space-y-2 text-gray-300 text-sm">
        <li>Use clear, well-structured input text for better output</li>
        <li>For academic use, review content for accuracy after conversion</li>
        <li>You can run the same text through multiple times for different variations</li>
      </ul>
    </div>
  );
} 