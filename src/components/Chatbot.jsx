import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [continuousListening, setContinuousListening] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const toggleContinuousListening = () => {
    setContinuousListening(!continuousListening);
    if (!continuousListening) {
      SpeechRecognition.startListening({ continuous: true });
    } else {
      SpeechRecognition.stopListening();
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={toggleChatbot}
        className="bg-blue-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-lg shadow-lg">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Chatbot</h3>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Continuous Listening</span>
              <button
                onClick={toggleContinuousListening}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  continuousListening ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                    continuousListening ? 'translate-x-6' : ''
                  }`}
                ></div>
              </button>
            </div>
          </div>
          <div className="p-4 h-64 overflow-y-auto">
            {/* Chat messages will go here */}
          </div>
          <div className="p-4 border-t flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              value={transcript}
              onChange={(e) => resetTranscript()}
              className="w-full px-3 py-2 border rounded-lg text-gray-900"
            />
            <button
              onClick={listening ? SpeechRecognition.stopListening : SpeechRecognition.startListening}
              className="ml-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${listening ? 'text-red-500' : 'text-gray-500'} ${continuousListening && listening ? 'animate-pulse' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
