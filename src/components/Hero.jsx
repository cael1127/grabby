import React from 'react';

export default function Hero() {
  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent">
          Advanced AI Humanizer & Detector
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Transform AI-generated content into natural human writing and detect AI-generated text 
          with sophisticated algorithms inspired by ZeroGPT and Grubby AI.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800/60 rounded-lg p-6 border border-gray-700">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="text-lg font-semibold mb-2 text-blue-300">Advanced AI Detection</h3>
            <p className="text-gray-300 text-sm">
              Multi-layered analysis using perplexity, burstiness, pattern recognition, and 
              vocabulary sophistication to accurately identify AI-generated content.
            </p>
          </div>
          
          <div className="bg-gray-800/60 rounded-lg p-6 border border-gray-700">
            <div className="text-3xl mb-3">✨</div>
            <h3 className="text-lg font-semibold mb-2 text-green-300">Sophisticated Humanizer</h3>
            <p className="text-gray-300 text-sm">
              Advanced NLP techniques including natural typos, conversational elements, 
              personal touches, and tone adjustments to make AI text indistinguishable from human writing.
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className="bg-blue-900/40 text-blue-200 px-3 py-1 rounded-full">ZeroGPT-style Detection</span>
          <span className="bg-green-900/40 text-green-200 px-3 py-1 rounded-full">Grubby AI Humanization</span>
          <span className="bg-purple-900/40 text-purple-200 px-3 py-1 rounded-full">Advanced NLP</span>
          <span className="bg-red-900/40 text-red-200 px-3 py-1 rounded-full">Privacy First</span>
          <span className="bg-yellow-900/40 text-yellow-200 px-3 py-1 rounded-full">Real-time Analysis</span>
        </div>
      </div>
    </div>
  );
} 