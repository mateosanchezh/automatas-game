export const STATES = {
  IDLE: 'QUIETO',
  WALKING: 'CAMINANDO',
  RUNNING: 'CORRIENDO',
  JUMPING: 'SALTANDO'
};

// Colores vibrantes y modernos para cada estado
export const STATE_COLORS = {
  [STATES.IDLE]: '#60a5fa',      // Azul brillante
  [STATES.WALKING]: '#34d399',   // Verde esmeralda
  [STATES.RUNNING]: '#fbbf24',   // Amarillo dorado
  [STATES.JUMPING]: '#a78bfa'    // Púrpura suave
};

// Colores secundarios para gradientes
export const STATE_GRADIENTS = {
  [STATES.IDLE]: ['#60a5fa', '#3b82f6'],
  [STATES.WALKING]: ['#34d399', '#10b981'],
  [STATES.RUNNING]: ['#fbbf24', '#f59e0b'],
  [STATES.JUMPING]: ['#a78bfa', '#8b5cf6']
};

// Descripciones detalladas de cada estado
export const STATE_DESCRIPTIONS = {
  [STATES.IDLE]: 'El jugador está quieto, esperando una acción. Estado de reposo inicial.',
  [STATES.WALKING]: 'Movimiento normal con las flechas direccionales. Velocidad estándar.',
  [STATES.RUNNING]: 'Movimiento rápido manteniendo Shift presionado. Velocidad aumentada.',
  [STATES.JUMPING]: 'El jugador está en el aire después de presionar la barra espaciadora.'
};


export const STATE_ICONS = {
};

// Configuración de transiciones del autómata
export const TRANSITIONS = {
  [STATES.IDLE]: {
    allowedNext: [STATES.WALKING, STATES.JUMPING],
    triggers: {
      move: STATES.WALKING,
      jump: STATES.JUMPING
    }
  },
  [STATES.WALKING]: {
    allowedNext: [STATES.IDLE, STATES.RUNNING, STATES.JUMPING],
    triggers: {
      stop: STATES.IDLE,
      sprint: STATES.RUNNING,
      jump: STATES.JUMPING
    }
  },
  [STATES.RUNNING]: {
    allowedNext: [STATES.WALKING, STATES.IDLE, STATES.JUMPING],
    triggers: {
      release: STATES.WALKING,
      stop: STATES.IDLE,
      jump: STATES.JUMPING
    }
  },
  [STATES.JUMPING]: {
    allowedNext: [STATES.IDLE],
    triggers: {
      land: STATES.IDLE
    }
  }
};

// Metadatos adicionales para visualización
export const STATE_METADATA = {
  [STATES.IDLE]: {
    priority: 1,
    category: 'estático',
    duration: 'indefinido'
  },
  [STATES.WALKING]: {
    priority: 2,
    category: 'movimiento',
    duration: 'continuo'
  },
  [STATES.RUNNING]: {
    priority: 3,
    category: 'movimiento',
    duration: 'continuo'
  },
  [STATES.JUMPING]: {
    priority: 4,
    category: 'especial',
    duration: 'temporal'
  }
};