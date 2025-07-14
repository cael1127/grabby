import React from 'react';

export default function Hero({ activePage, navigateTo }) {
  return (
    <section className="w-full bg-gradient-to-br from-blue-900 via-gray-900 to-gray-800 py-16 px-4 text-center rounded-b-3xl shadow-xl mb-12 animate-fade-in">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg">AI Humanizer & Detector</h1>
      <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8">Transform AI-generated text into natural, human-like writing and detect AI content with confidence. Now with instant history and a beautiful new look.</p>
      <div className="flex justify-center gap-4 mt-6">
        <button onClick={() => navigateTo('humanizer')} className={`px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition-all ${activePage === 'humanizer' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-blue-200 hover:bg-blue-700 hover:text-white'}`}>Humanizer</button>
        <button onClick={() => navigateTo('detector')} className={`px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition-all ${activePage === 'detector' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-blue-200 hover:bg-blue-700 hover:text-white'}`}>Detector</button>
      </div>
    </section>
  );
} 