import React from 'react';

export default function HumanizerForm({ input, setInput, level, setLevel, isProcessing, onHumanize, onClear }) {
  return (
    <>
      <div className="mb-6">
        <label htmlFor="input-text" className="block text-sm font-medium text-gray-300 mb-2">Paste your AI-generated text below</label>
        <textarea
          id="input-text"
          rows={7}
          className="w-full p-4 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y text-white placeholder-gray-500 shadow-inner"
          placeholder="Paste your AI-generated content here..."
          value={input}
          onChange={e => setInput(e.target.value)}
          aria-label="AI-generated text input"
        />
      </div>
      <div className="mb-4 flex items-center gap-4">
        <label htmlFor="humanize-level" className="text-sm text-gray-300">Humanize Level:</label>
        <input
          id="humanize-level"
          type="range"
          min={1}
          max={3}
          value={level}
          onChange={e => setLevel(Number(e.target.value))}
          className="w-40 accent-blue-500"
        />
        <span className="text-xs text-blue-300">{['Subtle', 'Balanced', 'Aggressive'][level-1]}</span>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
        <button
          onClick={() => onHumanize(input)}
          disabled={!input.trim() || isProcessing}
          className={`px-6 py-3 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${!input.trim() || isProcessing ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-900/25'}`}
        >
          {isProcessing ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Processing...
            </span>
          ) : (
            'Humanize Text'
          )}
        </button>
        <button
          onClick={onClear}
          className="px-6 py-3 rounded-lg font-medium bg-gray-700 hover:bg-gray-600 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Clear
        </button>
      </div>
    </>
  );
}