import React from 'react';

const ControlsPanel = () => {
  const controls = [
    { key: '← →', action: 'Caminar', icon: '🚶' },
    { key: 'Shift + ← →', action: 'Correr', icon: '🏃' },
    { key: 'Espacio', action: 'Saltar', icon: '⬆️' },
    { key: 'Soltar teclas', action: 'Volver a IDLE', icon: '⏸️' }
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-4">
        🎮 Controles
      </h3>
      
      <div className="space-y-3">
        {controls.map((control, idx) => (
          <div 
            key={idx} 
            className="bg-slate-700 p-3 rounded-lg flex justify-between items-center hover:bg-slate-600 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{control.icon}</span>
              <span className="font-mono text-yellow-300 font-bold">
                {control.key}
              </span>
            </div>
            <span className="text-gray-300">{control.action}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <p className="text-sm text-blue-300 text-center">
          💡 Usa las teclas para ver las transiciones en tiempo real
        </p>
      </div>
    </div>
  );
};

export default ControlsPanel;