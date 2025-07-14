import React from 'react';
import HumanizerForm from '../components/HumanizerForm';
import OutputBox from '../components/OutputBox';
import TipsBox from '../components/TipsBox';
import History from '../components/History';

export default function HumanizerPage({
  input, setInput, level, setLevel, isProcessing, onHumanize, onClear, output, history, setHumanizerInput
}) {
  return (
    <section className="max-w-3xl mx-auto animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center gap-2">
          <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4L4 8V16L12 20L20 16V8L12 4Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 4V20" /><path strokeLinecap="round" strokeLinejoin="round" d="M20 16L22 18" /><path strokeLinecap="round" strokeLinejoin="round" d="M4 16L2 18" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8V16" /></svg>
          AI Humanizer
        </h2>
        <p className="text-gray-300 max-w-xl mx-auto">
          Transform AI-generated content into natural, human-like writing using advanced algorithms. 
          Our sophisticated humanization engine applies multiple layers of natural language processing 
          to make AI text indistinguishable from human writing.
          <span className="inline-block bg-blue-900/40 rounded px-2 py-0.5 ml-1 text-xs text-blue-200">Advanced NLP</span>
        </p>
      </div>
      <HumanizerForm
        input={input}
        setInput={setInput}
        level={level}
        setLevel={setLevel}
        isProcessing={isProcessing}
        onHumanize={onHumanize}
        onClear={onClear}
      />
      <OutputBox type="humanizer" output={output} />
      <TipsBox />
      <History items={history} type="humanizer" setHumanizerInput={setHumanizerInput} />
    </section>
  );
} 