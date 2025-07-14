import React from 'react';
import DetectorForm from '../components/DetectorForm';
import OutputBox from '../components/OutputBox';
import TipsBox from '../components/TipsBox';
import History from '../components/History';

export default function DetectorPage({
  input, setInput, isProcessing, onDetect, onClear, aiScore, aiBreakdown, history, setDetectorInput
}) {
  return (
    <section className="max-w-3xl mx-auto animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center gap-2">
          <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          AI Detector
        </h2>
        <p className="text-gray-300 max-w-xl mx-auto">
          Advanced AI content detection using sophisticated algorithms including perplexity analysis, 
          burstiness detection, and pattern recognition. Our multi-layered approach provides 
          detailed analysis with confidence levels and breakdown explanations.
          <span className="inline-block bg-red-900/40 rounded px-2 py-0.5 ml-1 text-xs text-red-200">ZeroGPT-style</span>
        </p>
      </div>
      <DetectorForm
        input={input}
        setInput={setInput}
        isProcessing={isProcessing}
        onDetect={onDetect}
        onClear={onClear}
      />
      <OutputBox type="detector" aiScore={aiScore} aiBreakdown={aiBreakdown} />
      <TipsBox />
      <History items={history} type="detector" setDetectorInput={setDetectorInput} />
    </section>
  );
} 