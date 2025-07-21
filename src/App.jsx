import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import HumanizerPage from './pages/HumanizerPage';
import DetectorPage from './pages/DetectorPage';
import { humanizeText, detectAIContent } from './utils/ai';

export default function App() {
  const [activePage, setActivePage] = useState('humanizer');
  const [humanizerInput, setHumanizerInput] = useState('');
  const [humanizerLevel, setHumanizerLevel] = useState(2);
  const [humanizerOutput, setHumanizerOutput] = useState('');
  const [humanizerHistory, setHumanizerHistory] = useState([]);
  const [detectorInput, setDetectorInput] = useState('');
  const [detectorOutput, setDetectorOutput] = useState(null);
  const [detectorHistory, setDetectorHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleHumanize = async () => {
    if (!humanizerInput.trim()) return;

    setIsProcessing(true);
    try {
      const result = humanizeText(humanizerInput, humanizerLevel);
      setHumanizerOutput(result);

      // Add to history
      const newEntry = {
        id: Date.now(),
        input: humanizerInput,
        output: result,
        level: humanizerLevel,
        timestamp: new Date().toLocaleString()
      };
      setHumanizerHistory(prev => [newEntry, ...prev.slice(0, 9)]);
    } catch (error) {
      console.error('Humanization error:', error);
      setHumanizerOutput('Error processing text. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDetect = async () => {
    if (!detectorInput.trim()) return;

    setIsProcessing(true);
    try {
      const result = detectAIContent(detectorInput);
      setDetectorOutput(result);

      // Add to history
      const newEntry = {
        id: Date.now(),
        input: detectorInput,
        score: result.score,
        breakdown: result.breakdown,
        timestamp: new Date().toLocaleString()
      };
      setDetectorHistory(prev => [newEntry, ...prev.slice(0, 9)]);
    } catch (error) {
      console.error('Detection error:', error);
      setDetectorOutput({ score: 0, breakdown: [] });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = (type) => {
    if (type === 'humanizer') {
      setHumanizerInput('');
      setHumanizerOutput('');
    } else {
      setDetectorInput('');
      setDetectorOutput(null);
    }
  };

  const navigateTo = (page) => {
    setActivePage(page);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <Hero />

        {/* Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => navigateTo('humanizer')}
            className={`px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition-all ${
              activePage === 'humanizer'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-blue-200 hover:bg-blue-700 hover:text-white'
            }`}
          >
            AI Humanizer
          </button>
          <button
            onClick={() => navigateTo('detector')}
            className={`px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition-all ${
              activePage === 'detector'
                ? 'bg-red-600 text-white'
                : 'bg-gray-700 text-red-200 hover:bg-red-700 hover:text-white'
            }`}
          >
            AI Detector
          </button>
        </div>

        {/* Main Content */}
        <main>
          {activePage === 'humanizer' && (
            <HumanizerPage
              input={humanizerInput}
              setInput={setHumanizerInput}
              level={humanizerLevel}
              setLevel={setHumanizerLevel}
              isProcessing={isProcessing}
              onHumanize={handleHumanize}
              onClear={() => handleClear('humanizer')}
              output={humanizerOutput}
              history={humanizerHistory}
              setHumanizerInput={setHumanizerInput}
            />
          )}

          {activePage === 'detector' && (
            <DetectorPage
              input={detectorInput}
              setInput={setDetectorInput}
              isProcessing={isProcessing}
              onDetect={handleDetect}
              onClear={() => handleClear('detector')}
              aiScore={detectorOutput?.score}
              aiBreakdown={detectorOutput?.breakdown}
              history={detectorHistory}
              setDetectorInput={setDetectorInput}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="text-center py-8 text-gray-400 text-sm">
          <p>Advanced AI Humanizer & Detector - Inspired by ZeroGPT and Grubby AI</p>
          <p className="mt-2">Privacy-first, client-side processing</p>
        </footer>
      </div>
    </div>
  );
} 