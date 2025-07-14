import React from 'react';

export default function OutputBox({ type, output, aiScore, aiBreakdown }) {
  if (type === 'humanizer' && output) {
    return (
      <div className="mb-8 animate-fade-in">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-300">Humanized Text Output</label>
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="text-sm text-blue-400 hover:text-blue-300 flex items-center"
            aria-label="Copy output to clipboard"
          >
            <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" /><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" /></svg>
            Copy
          </button>
        </div>
        <div className="p-4 rounded-lg bg-gray-900 border border-gray-700 min-h-[120px] whitespace-pre-wrap text-white shadow-inner">{output}</div>
      </div>
    );
  }
  if (type === 'detector' && aiScore !== null) {
    return (
      <div className="mb-8 animate-fade-in">
        <h3 className="text-lg font-semibold mb-3">AI Detection Analysis</h3>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-blue-200 text-blue-800">AI Probability</span>
            </div>
            <div className="text-right">
              <span className={`text-xs font-semibold inline-block text-${aiScore > 60 ? 'red' : aiScore > 30 ? 'yellow' : 'green'}-600`}>{aiScore}%</span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
            <div
              style={{ width: `${aiScore}%` }}
              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${aiScore > 60 ? 'bg-red-600' : aiScore > 30 ? 'bg-yellow-500' : 'bg-green-600'}`}
            ></div>
          </div>
          <div className="text-sm text-gray-400">
            {aiScore > 60 ? 'High likelihood of AI-generated content' : aiScore > 30 ? 'Moderate likelihood of AI-generated content' : 'Likely human-written content'}
          </div>
          {aiBreakdown && aiBreakdown.length > 0 && (
            <div className="mt-4 bg-gray-800/80 rounded-lg p-4 border border-gray-700">
              <h4 className="text-sm font-semibold mb-2 text-blue-300">Score Breakdown</h4>
              <ul className="text-xs text-gray-300 space-y-1">
                {aiBreakdown.map((b, i) => (
                  <li key={i} className="flex justify-between"><span>{b.label}</span><span>{b.value}</span></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
} 