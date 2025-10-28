import React from 'react';
import { useAutomata } from './hooks/useAutomata';
import AutomataDiagram from './components/AutomataDiagram';
import GameCanvas from './components/GameCanvas';
import ControlsPanel from './components/ControlPanel';
import TransitionsPanel from './components/TransitionsPanel';

function App() {
  const { 
    currentState, 
    transition, 
    getCurrentStateInfo, 
    transitionHistory 
  } = useAutomata();

  const handleStateChange = (newState, reason) => {
    transition(newState, reason);
  };

  const stateInfo = getCurrentStateInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-3">
            🎮 Autómata Finito
          </h1>
          <p className="text-gray-400 text-lg">
            Visualización interactiva de estados y transiciones
          </p>
        </header>

        {/* Diagrama del Autómata */}
        <div className="mb-6">
          <AutomataDiagram currentState={currentState} />
        </div>

        {/* Canvas del Juego */}
        <div className="mb-6">
          <GameCanvas 
            currentState={currentState} 
            onStateChange={handleStateChange}
          />
        </div>

        {/* Paneles de información */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ControlsPanel />
          <TransitionsPanel 
            currentState={currentState}
            transitionHistory={transitionHistory}
            stateInfo={stateInfo}
          />
        </div>

        {/* Footer */}
        <footer className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            💻 Proyecto educativo de teoría de autómatas
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;