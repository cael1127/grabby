import React from 'react';

export default function TipsBox() {
  const tips = [
    {
      title: "Advanced Detection",
      description: "Our AI detector uses multiple algorithms including perplexity analysis, burstiness detection, and pattern recognition to provide accurate results.",
      icon: "🔍"
    },
    {
      title: "Humanization Levels",
      description: "Choose from 1-3 levels of humanization. Higher levels apply more transformations but may change meaning more significantly.",
      icon: "⚙️"
    },
    {
      title: "Natural Variations",
      description: "The humanizer adds natural typos, conversational phrases, and personal touches to make text sound more human-written.",
      icon: "✨"
    },
    {
      title: "Detailed Analysis",
      description: "Get comprehensive breakdowns of detection signals with confidence levels and explanations for each indicator.",
      icon: "📊"
    },
    {
      title: "History Tracking",
      description: "All your inputs and outputs are automatically saved for easy reference and comparison.",
      icon: "📝"
    },
    {
      title: "Privacy First",
      description: "All processing happens locally in your browser. No text is sent to external servers.",
      icon: "🔒"
    }
  ];

  return (
    <div className="bg-gray-800/60 rounded-lg p-6 border border-gray-700 mb-8">
      <h3 className="text-lg font-semibold mb-4 text-blue-300 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Pro Tips & Features
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-gray-700/50 rounded-lg">
            <span className="text-2xl">{tip.icon}</span>
            <div>
              <h4 className="font-medium text-white text-sm">{tip.title}</h4>
              <p className="text-gray-300 text-xs mt-1">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}