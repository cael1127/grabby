import React from 'react';
import DetectorForm from '../components/DetectorForm';
import OutputBox from '../components/OutputBox';
import History from '../components/History';
import TipsBox from '../components/TipsBox';

export default function DetectorPage({
  input,
  setInput,
  isProcessing,
  onDetect,
  onClear,
  aiScore,
  aiBreakdown,
  history,
  setDetectorInput
}) {
  return (
    <div className="space-y-8">
      <DetectorForm
        input={input}
        setInput={setInput}
        isProcessing={isProcessing}
        onDetect={onDetect}
        onClear={onClear}
      />
      <OutputBox
        aiScore={aiScore}
        aiBreakdown={aiBreakdown}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <History
          title="Detector History"
          history={history}
          onSelect={(item) => setDetectorInput(item.input)}
        />
        <TipsBox />
      </div>
    </div>
  );
}