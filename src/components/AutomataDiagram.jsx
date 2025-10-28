import React from 'react';
import { STATES, STATE_COLORS, TRANSITIONS } from '../config/automataConfig';

const AutomataDiagram = ({ currentState }) => {
  const statePositions = {
    [STATES.IDLE]: { x: 150, y: 80 },
    [STATES.WALKING]: { x: 350, y: 80 },
    [STATES.RUNNING]: { x: 550, y: 80 },
    [STATES.JUMPING]: { x: 350, y: 200 }
  };

  const transitions = [
    { from: STATES.IDLE, to: STATES.WALKING, label: '←/→' },
    { from: STATES.WALKING, to: STATES.RUNNING, label: 'Shift' },
    { from: STATES.RUNNING, to: STATES.WALKING, label: 'Release' },
    { from: STATES.WALKING, to: STATES.IDLE, label: 'Release' },
    { from: STATES.IDLE, to: STATES.JUMPING, label: 'Space' },
    { from: STATES.WALKING, to: STATES.JUMPING, label: 'Space' },
    { from: STATES.RUNNING, to: STATES.JUMPING, label: 'Space' },
    { from: STATES.JUMPING, to: STATES.IDLE, label: 'Land' }
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-4">
        Diagrama del Autómata
      </h2>
      
      <svg width="700" height="280" className="mx-auto">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
          </marker>
        </defs>

        {/* Transiciones */}
        {transitions.map((trans, idx) => {
          const from = statePositions[trans.from];
          const to = statePositions[trans.to];
          const isActive = currentState === trans.from;

          return (
            <g key={idx}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isActive ? STATE_COLORS[trans.from] : '#475569'}
                strokeWidth={isActive ? 3 : 2}
                markerEnd="url(#arrowhead)"
                opacity={isActive ? 1 : 0.4}
              />
              <text
                x={(from.x + to.x) / 2}
                y={(from.y + to.y) / 2 - 10}
                fill={isActive ? STATE_COLORS[trans.from] : '#cbd5e1'}
                fontSize="12"
                fontWeight={isActive ? 'bold' : 'normal'}
                textAnchor="middle"
              >
                {trans.label}
              </text>
            </g>
          );
        })}

        {/* Estados */}
        {Object.values(STATES).map((state) => {
          const pos = statePositions[state];
          const isActive = currentState === state;
          const color = STATE_COLORS[state];

          return (
            <g key={state}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isActive ? 35 : 30}
                fill={isActive ? color : '#1e293b'}
                stroke={color}
                strokeWidth={isActive ? 4 : 2}
              />
              <text
                x={pos.x}
                y={pos.y + 5}
                textAnchor="middle"
                fill="white"
                fontSize={isActive ? 14 : 12}
                fontWeight="bold"
              >
                {state}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default AutomataDiagram;