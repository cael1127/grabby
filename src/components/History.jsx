import React from 'react';

export default function History({ items, type, setHumanizerInput, setDetectorInput }) {
  return (
    <div className="mt-8 bg-gray-900/80 rounded-xl p-6 border border-gray-700 animate-fade-in">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        Recent {type === 'humanizer' ? 'Humanizations' : 'Detections'}
      </h3>
      {items.length === 0 ? (
        <div className="text-gray-500 text-sm">No history yet.</div>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.timestamp} className="bg-gray-800 rounded-lg p-4 border border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-400 mb-1">{new Date(item.timestamp).toLocaleString()}</div>
                <div className="text-sm text-gray-300 truncate"><span className="font-semibold">Input:</span> {item.input}</div>
                {type === 'humanizer' ? (
                  <div className="text-sm text-blue-200 truncate"><span className="font-semibold">Output:</span> {item.output}</div>
                ) : (
                  <div className="text-sm text-blue-200"><span className="font-semibold">AI Score:</span> {item.score}%</div>
                )}
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                {type === 'humanizer' ? (
                  <>
                    <button onClick={() => setHumanizerInput(item.input)} className="px-3 py-1 rounded bg-blue-700 text-white text-xs hover:bg-blue-800" aria-label="Re-use input">Re-use</button>
                    <button onClick={() => navigator.clipboard.writeText(item.output)} className="px-3 py-1 rounded bg-gray-700 text-blue-300 text-xs hover:bg-gray-600" aria-label="Copy output">Copy Output</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setDetectorInput(item.input)} className="px-3 py-1 rounded bg-blue-700 text-white text-xs hover:bg-blue-800" aria-label="Re-use input">Re-use</button>
                    <button onClick={() => navigator.clipboard.writeText(item.input)} className="px-3 py-1 rounded bg-gray-700 text-blue-300 text-xs hover:bg-gray-600" aria-label="Copy input">Copy Text</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}