// components/ControlsPanel.jsx
import React, { useState } from 'react';

const ControlsPanel = () => {
  const [hoveredControl, setHoveredControl] = useState(null);

  const controls = [
    { 
      key: '← →', 
      action: 'Caminar', 
      icon: '🚶',
      emoji: '➡️',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      shadow: 'shadow-blue-500/50',
      description: 'Movimiento básico'
    },
    { 
      key: 'Shift + ← →', 
      action: 'Correr', 
      icon: '🏃',
      emoji: '⚡',
      color: 'bg-gradient-to-r from-green-500 to-emerald-600',
      shadow: 'shadow-green-500/50',
      description: 'Velocidad aumentada'
    },
    { 
      key: 'Espacio', 
      action: 'Saltar', 
      icon: '⬆️',
      emoji: '🦘',
      color: 'bg-gradient-to-r from-purple-500 to-violet-600',
      shadow: 'shadow-purple-500/50',
      description: 'Salto vertical'
    },
    { 
      key: 'Soltar', 
      action: 'Detener', 
      icon: '⏸️',
      emoji: '🛑',
      color: 'bg-gradient-to-r from-gray-500 to-slate-600',
      shadow: 'shadow-gray-500/50',
      description: 'Volver a QUIETO'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50 animate-pulse"></div>
        <h3 className="text-2xl font-bold text-white tracking-tight">
          🎮 Controles
        </h3>
      </div>
      
      <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-2xl">
        <div className="space-y-3">
          {controls.map((control, idx) => (
            <div 
              key={idx}
              onMouseEnter={() => setHoveredControl(idx)}
              onMouseLeave={() => setHoveredControl(null)}
              className={`
                bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl 
                flex justify-between items-center 
                transition-all duration-300 
                border border-slate-700/50
                hover:border-slate-600
                hover:shadow-lg
                hover:-translate-y-1
                cursor-pointer
                ${hoveredControl === idx ? 'scale-[1.02]' : ''}
              `}
              style={{
                boxShadow: hoveredControl === idx 
                  ? '0 10px 30px rgba(0, 0, 0, 0.3)' 
                  : '0 4px 10px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="flex items-center gap-4">
                {/* Icono con gradiente */}
                <div className={`
                  w-14 h-14 ${control.color} ${control.shadow}
                  rounded-xl flex items-center justify-center 
                  transition-transform duration-300 shadow-lg
                  ${hoveredControl === idx ? 'scale-110 rotate-6' : ''}
                `}>
                  <span className="text-2xl">{control.icon}</span>
                </div>
                
                {/* Información del control */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-yellow-300 font-bold text-sm bg-slate-900/50 px-2 py-1 rounded">
                      {control.key}
                    </span>
                    <span className="text-lg">{control.emoji}</span>
                  </div>
                  <div className="text-white font-semibold text-sm">
                    {control.action}
                  </div>
                  {hoveredControl === idx && (
                    <div className="text-slate-400 text-xs animate-fadeInUp">
                      {control.description}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Flecha indicadora */}
              <div className={`
                transition-all duration-300
                ${hoveredControl === idx ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}
              `}>
                <div className="text-slate-400 text-xl">→</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Info adicional */}
        <div className="mt-6 space-y-3">
          <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">💡</span>
              <span className="text-sm text-blue-300 font-semibold">Tip</span>
            </div>
            <p className="text-xs text-blue-200/80 leading-relaxed">
              Usa las teclas para ver las transiciones en tiempo real en el diagrama del autómata
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">⚡</span>
              <span className="text-sm text-purple-300 font-semibold">Combo</span>
            </div>
            <p className="text-xs text-purple-200/80 leading-relaxed">
              Combina Shift + Espacio mientras corres para un súper salto
            </p>
          </div>
        </div>
        
        {/* Leyenda de teclado */}
        <div className="mt-6 pt-4 border-t border-slate-700/50">
          <div className="text-xs text-slate-400 text-center mb-3 font-semibold">
            Leyenda de teclas
          </div>
          <div className="flex justify-center gap-2 flex-wrap">
            {['←', '→', 'Shift', 'Space'].map((key) => (
              <div
                key={key}
                className="px-3 py-1.5 bg-slate-800 border border-slate-600 rounded-lg text-xs font-mono text-slate-300 shadow-inner"
              >
                {key}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlsPanel;