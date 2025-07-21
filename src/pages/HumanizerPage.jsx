import React from 'react';
import HumanizerForm from '../components/HumanizerForm';
import OutputBox from '../components/OutputBox';
import History from '../components/History';
import TipsBox from '../components/TipsBox';

export default function HumanizerPage({
  input,
  setInput,
  level,
  setLevel,
  isProcessing,
  onHumanize,
  onClear,
  output,
  history,
  setHumanizerInput
}) {
  return (
    <div className="space-y-8">
      <HumanizerForm
        input={input}
        setInput={setInput}
        level={level}
        setLevel={setLevel}
        isProcessing={isProcessing}
        onHumanize={onHumanize}
        onClear={onClear}
      />
      <OutputBox output={output} input={input} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <History
          title="Humanizer History"
          history={history}
          onSelect={(item) => setHumanizerInput(item.input)}
        />
        <TipsBox />
      </div>
    </div>
  );
}