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
    const getConfidenceLevel = (score) => {
      if (score >= 80) return { level: 'Very High', color: 'text-red-500', bgColor: 'bg-red-600' };
      if (score >= 60) return { level: 'High', color: 'text-orange-500', bgColor: 'bg-orange-600' };
      if (score >= 40) return { level: 'Moderate', color: 'text-yellow-500', bgColor: 'bg-yellow-600' };
      if (score >= 20) return { level: 'Low', color: 'text-green-500', bgColor: 'bg-green-600' };
      return { level: 'Very Low', color: 'text-green-400', bgColor: 'bg-green-500' };
    };
    
    const confidence = getConfidenceLevel(aiScore);
    
    return (
      <div className="mb-8 animate-fade-in">
        <h3 className="text-lg font-semibold mb-3">AI Detection Analysis</h3>
        
        {/* Score Overview */}
        <div className="bg-gray-800/80 rounded-lg p-4 border border-gray-700 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">AI Probability Score</span>
            <span className={`text-lg font-bold ${confidence.color}`}>{aiScore}%</span>
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-3 text-xs flex rounded bg-gray-700">
              <div
                style={{ width: `${aiScore}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${confidence.bgColor} transition-all duration-500`}
              ></div>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-400">
            Confidence Level: <span className={confidence.color}>{confidence.level}</span>
          </div>
        </div>
        
        {/* Detailed Analysis */}
        {aiBreakdown && aiBreakdown.length > 0 && (
          <div className="bg-gray-800/80 rounded-lg p-4 border border-gray-700 mb-4">
            <h4 className="text-sm font-semibold mb-3 text-blue-300 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Detailed Analysis Breakdown
            </h4>
            <div className="space-y-2">
              {aiBreakdown.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-xs">
                  <span className="text-gray-300">{item.label}</span>
                  <span className={`font-semibold ${item.value.startsWith('+') ? 'text-red-400' : 'text-green-400'}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Interpretation */}
        <div className="bg-gray-800/60 rounded-lg p-4 border border-gray-700">
          <h4 className="text-sm font-semibold mb-2 text-blue-300">Interpretation</h4>
          <div className="text-sm text-gray-300">
            {aiScore >= 80 ? (
              <p>This text shows <strong className="text-red-400">very strong indicators</strong> of AI generation. Multiple detection signals suggest automated content creation.</p>
            ) : aiScore >= 60 ? (
              <p>This text shows <strong className="text-orange-400">strong indicators</strong> of AI generation. Several patterns typical of automated content were detected.</p>
            ) : aiScore >= 40 ? (
              <p>This text shows <strong className="text-yellow-400">moderate indicators</strong> of AI generation. Some patterns suggest automated content creation.</p>
            ) : aiScore >= 20 ? (
              <p>This text shows <strong className="text-green-400">weak indicators</strong> of AI generation. Most patterns appear human-written.</p>
            ) : (
              <p>This text shows <strong className="text-green-300">very weak indicators</strong> of AI generation. The content appears to be human-written.</p>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  return null;
} 