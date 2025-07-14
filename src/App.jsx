import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import HumanizerPage from './pages/HumanizerPage';
import DetectorPage from './pages/DetectorPage';

export default function App() {
  // --- State Management ---
  const [activePage, setActivePage] = useState('humanizer');
  const [humanizerInput, setHumanizerInput] = useState('');
  const [humanizerOutput, setHumanizerOutput] = useState('');
  const [humanizeLevel, setHumanizeLevel] = useState(2); // 1: subtle, 2: balanced, 3: aggressive
  const [detectorInput, setDetectorInput] = useState('');
  const [aiScore, setAiScore] = useState(null);
  const [aiBreakdown, setAiBreakdown] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [humanizerHistory, setHumanizerHistory] = useState([]);
  const [detectorHistory, setDetectorHistory] = useState([]);

  useEffect(() => {
    const handleHashChange = () => {
      const page = window.location.hash.replace('#', '');
      if (page === 'detector') {
        setActivePage('detector');
      } else {
        setActivePage('humanizer');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page) => {
    window.location.hash = page;
  };

  // --- AI Humanizer Logic ---
  const { humanizeText } = require('./utils/ai');
  const handleHumanize = (text) => {
    if (!text.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      const result = humanizeText(text, humanizeLevel);
      setHumanizerOutput(result);
      setIsProcessing(false);
      setHumanizerHistory((prev) => [{ input: text, output: result, level: humanizeLevel, timestamp: Date.now() }, ...prev].slice(0, 5));
    }, 1200);
  };

  // --- AI Detector Logic ---
  const { detectAIContent } = require('./utils/ai');
  const handleDetect = (text) => {
    const { score, breakdown } = detectAIContent(text);
    setAiScore(score);
    setAiBreakdown(breakdown);
    setDetectorHistory((prev) => [{ input: text, score, breakdown, timestamp: Date.now() }, ...prev].slice(0, 5));
  };
  const handleResetDetector = () => {
    setAiScore(null);
    setAiBreakdown(null);
    setDetectorInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans">
      <Hero activePage={activePage} navigateTo={navigateTo} />
      <main className="container mx-auto px-4 pb-16">
        {activePage === 'humanizer' ? (
          <HumanizerPage
            input={humanizerInput}
            setInput={setHumanizerInput}
            level={humanizeLevel}
            setLevel={setHumanizeLevel}
            isProcessing={isProcessing}
            onHumanize={handleHumanize}
            onClear={() => { setHumanizerOutput(''); setHumanizerInput(''); }}
            output={humanizerOutput}
            history={humanizerHistory}
            setHumanizerInput={setHumanizerInput}
          />
        ) : (
          <DetectorPage
            input={detectorInput}
            setInput={setDetectorInput}
            isProcessing={false}
            onDetect={handleDetect}
            onReset={handleResetDetector}
            aiScore={aiScore}
            aiBreakdown={aiBreakdown}
            history={detectorHistory}
            setDetectorInput={setDetectorInput}
          />
        )}
      </main>
      <footer className="py-8 border-t border-gray-700 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} AI Humanizer & Detector. All rights reserved.
        </div>
      </footer>
      <style>{`
        .animate-fade-in { animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1) both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
} 