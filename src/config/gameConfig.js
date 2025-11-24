export const GAME_CONFIG = {
  canvas: {
    width: 800,
    height: 400,
    backgroundColor: '#0f172a', // Fondo oscuro elegante
    gridColor: '#1e293b',
    gridSize: 40
  },
  player: {
    width: 40,
    height: 60,
    initialX: 100,
    initialY: 310,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    outlineWidth: 3,
    eyeSize: 6,
    eyeOffset: { x: 8, y: 15 }
  },
  physics: {
    walkSpeed: 4,
    runSpeed: 8,
    jumpForce: -15,
    gravity: 0.8,
    groundY: 310,
    friction: 0.95,
    maxVelocity: 12
  },
  visual: {
    // Colores del entorno
    groundColor: '#1e293b',
    groundLineColor: '#475569',
    groundGradient: ['#1e293b', '#0f172a'],
    
    // Efectos visuales
    shadowBlur: 15,
    glowIntensity: 20,
    particleCount: 8,
    
    // Grid de fondo
    showGrid: true,
    gridOpacity: 0.1
  },
  ui: {
    fontSize: {
      state: 20,
      info: 14,
      debug: 12
    },
    fontFamily: 'Inter, system-ui, sans-serif',
    padding: 20,
    infoSpacing: 25
  },
  performance: {
    targetFPS: 60,
    enableParticles: true,
    enableShadows: true,
    enableGlow: true
  }
};

// Configuración de partículas para efectos
export const PARTICLE_CONFIG = {
  jump: {
    count: 8,
    speed: 3,
    lifetime: 20,
    colors: ['#60a5fa', '#3b82f6', '#2563eb']
  },
  land: {
    count: 12,
    speed: 4,
    lifetime: 15,
    colors: ['#34d399', '#10b981', '#059669']
  },
  run: {
    count: 3,
    speed: 2,
    lifetime: 10,
    colors: ['#fbbf24', '#f59e0b', '#d97706']
  }
};