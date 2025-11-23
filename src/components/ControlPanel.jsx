import React from 'react';
import { STATE_COLORS, STATE_DESCRIPTIONS } from '../config/automataConfig';
import './TransitionsPanel.css';

const TransitionsPanel = ({ currentState, transitionHistory = [], stateInfo = {} }) => {
  const allowedTransitions = stateInfo.allowedTransitions || [];

  return (
    <div className="transitionspanel-container">
      <h3 className="transitionspanel-title">
        📊 Estado Actual
      </h3>

      {/* Estado actual */}
      <div 
        className="current-state-box"
        style={{ 
          backgroundColor: (STATE_COLORS[currentState] || '#888') + '20',
          borderLeft: `4px solid ${STATE_COLORS[currentState] || '#888'}`
        }}
      >
        <div className="current-state-name">
          {currentState}
        </div>
        <p className="current-state-description">
          {STATE_DESCRIPTIONS[currentState] || 'Sin descripción disponible.'}
        </p>
      </div>

      {/* Transiciones permitidas */}
      <div className="allowed-transitions-section">
        <h4 className="section-subtitle">
          Transiciones permitidas:
        </h4>
        {allowedTransitions.length > 0 ? (
          <div className="transitions-list">
            {allowedTransitions.map((state) => (
              <div
                key={state}
                className="transition-badge"
                style={{ 
                  backgroundColor: (STATE_COLORS[state] || '#888') + '30',
                  color: STATE_COLORS[state] || '#fff',
                  borderColor: STATE_COLORS[state] || '#888'
                }}
              >
                {state}
              </div>
            ))}
          </div>
        ) : (
          <p className="no-transitions-text">
            No hay transiciones definidas.
          </p>
        )}
      </div>

      {/* Historial */}
      <div className="history-section">
        <h4 className="section-subtitle">
          Historial de transiciones:
        </h4>
        {transitionHistory.length === 0 ? (
          <p className="no-history-text">
            Aún no hay transiciones registradas.
          </p>
        ) : (
          <div className="history-list">
            {transitionHistory.slice().reverse().slice(0, 8).map((trans, idx) => (
              <div 
                key={trans.timestamp || idx} 
                className="history-item"
              >
                {trans.from ? (
                  <>
                    <span style={{ color: STATE_COLORS[trans.from] || '#fff' }}>
                      {trans.from}
                    </span>
                    {' → '}
                    <span style={{ color: STATE_COLORS[trans.to] || '#fff' }}>
                      {trans.to}
                    </span>
                  </>
                ) : (
                  <span style={{ color: STATE_COLORS[trans.to] || '#fff' }}>
                    🚀 Inicio: {trans.to}
                  </span>
                )}
                {trans.reason && (
                  <span className="history-item-reason">
                    ({trans.reason})
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransitionsPanel;