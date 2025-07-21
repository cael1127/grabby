import React from 'react';

export default function Hero() {
  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-400 to-red-400 bg-clip-text text-transparent">
          AI Humanizer & Detector
        </h1>
        <p className="text-xl md:text-2xl text-on-background mb-8 max-w-3xl mx-auto">
          Transform AI-generated content into natural human writing and detect AI-generated text.
        </p>
      </div>
    </div>
  );
}