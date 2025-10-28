import React from 'react';
import { STATE_COLORS, STATE_DESCRIPTIONS } from '../config/automataConfig';

const TransitionsPanel = ({ currentState, transitionHistory = [], stateInfo = {} }) => {
  const allowedTransitions = stateInfo.allowedTransitions || [];

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-4">
        📊 Estado Actual
      </h3>

      {/* Estado actual */}
      <div 
        className="p-4 rounded-lg mb-4"
        style={{ 
          backgroundColor: (STATE_COLORS[currentState] || '#888') + '20',
          borderLeft: `4px solid ${STATE_COLORS[currentState] || '#888'}`
        }}
      >
        <div className="text-2xl font-bold text-white mb-2">
          {currentState}
        </div>
        <p className="text-gray-300 text-sm">
          {STATE_DESCRIPTIONS[currentState] || 'Sin descripción disponible.'}
        </p>
      </div>

      {/* Transiciones permitidas */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-white mb-2">
          Transiciones permitidas:
        </h4>
        {allowedTransitions.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {allowedTransitions.map((state) => (
              <div
                key={state}
                className="px-3 py-1 rounded-full text-sm font-bold"
                style={{ 
                  backgroundColor: (STATE_COLORS[state] || '#888') + '30',
                  color: STATE_COLORS[state] || '#fff',
                  border: `2px solid ${STATE_COLORS[state] || '#888'}`
                }}
              >
                {state}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">
            No hay transiciones definidas.
          </p>
        )}
      </div>

      {/* Historial */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-2">
          Historial de transiciones:
        </h4>
        {transitionHistory.length === 0 ? (
          <p className="text-gray-400 text-sm">Aún no hay transiciones registradas.</p>
        ) : (
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {transitionHistory.slice().reverse().slice(0, 8).map((trans, idx) => (
              <div 
                key={trans.timestamp || idx} 
                className="text-sm bg-slate-700 p-2 rounded hover:bg-slate-600 transition-colors"
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
                  <span className="text-gray-400 text-xs ml-2">
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
