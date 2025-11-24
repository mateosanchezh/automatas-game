// App.jsx
import React, { useEffect } from 'react';
import { useAutomata } from './hooks/useAutomata';
import AutomataDiagram from './components/AutomataDiagram';
import GameCanvas from './components/GameCanvas';
import ControlsPanel from './components/ControlPanel';
import TransitionsPanel from './components/TransitionsPanel';
import './App.css';

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

  // Prevenir scroll con Espacio
  useEffect(() => {
    const preventSpaceScroll = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', preventSpaceScroll);

    return () => {
      window.removeEventListener('keydown', preventSpaceScroll);
    };
  }, []);

  return (
    <div className="app-container">
      <div className="app-content">
        {/* Header */}
        <header className="app-header">
          <h1 className="app-title">
            🎮 Autómata Finito
          </h1>
          <p className="app-subtitle">
            Visualización interactiva de estados y transiciones
          </p>
        </header>

        {/* Diagrama del Autómata */}
        <div className="app-section">
          <AutomataDiagram currentState={currentState} />
        </div>

        {/* Canvas del Juego */}
        <div className="app-section">
          <GameCanvas 
            currentState={currentState} 
            onStateChange={handleStateChange}
          />
        </div>

        {/* Paneles de información */}
        <div className="app-grid">
          <ControlsPanel />
          <TransitionsPanel 
            currentState={currentState}
            transitionHistory={transitionHistory}
            stateInfo={stateInfo}
          />
        </div>

        {/* Footer */}
        <footer className="app-footer">
          <div className="footer-content">
            <p className="footer-title">💻 Proyecto educativo de teoría de autómatas</p>
            <div className="footer-team">
              <h3 className="team-title">Equipo de Desarrollo</h3>
              <ul className="team-list">
                <li className="team-member">Yesid Mateus Sanchez</li>
                <li className="team-member">Christian Ardila Gonzalez</li>
                <li className="team-member">Eliecer Arias Florez</li>
                <li className="team-member">Sergio Olier Meza</li>
                <li className="team-member">Santiago Silva Solar</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;