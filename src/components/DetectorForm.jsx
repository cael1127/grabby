import React from 'react';

export default function DetectorForm({ input, setInput, onDetect, onReset, isProcessing }) {
  return (
    <>
      <div className="mb-6">
        <label htmlFor="input-text-detector" className="block text-sm font-medium text-gray-300 mb-2">Paste text to analyze</label>
        <textarea
          id="input-text-detector"
          rows={7}
          className="w-full p-4 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y text-white placeholder-gray-500 shadow-inner"
          placeholder="Paste text for AI analysis..."
          value={input}
          onChange={e => setInput(e.target.value)}
          aria-label="Text to analyze for AI detection"
        />
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
        <button
          onClick={() => onDetect(input)}
          disabled={!input.trim() || isProcessing}
          className={`px-6 py-3 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${!input.trim() || isProcessing ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-900/25'}`}
        >
          Analyze Text
        </button>
        <button
          onClick={onReset}
          className="px-6 py-3 rounded-lg font-medium bg-gray-700 hover:bg-gray-600 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Reset
        </button>
      </div>
    </>
  );
} 