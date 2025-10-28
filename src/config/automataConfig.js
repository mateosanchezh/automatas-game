export const STATES = {
  IDLE: 'IDLE',
  WALKING: 'WALKING',
  RUNNING: 'RUNNING',
  JUMPING: 'JUMPING'
};

export const STATE_COLORS = {
  [STATES.IDLE]: '#3b82f6',
  [STATES.WALKING]: '#10b981',
  [STATES.RUNNING]: '#f59e0b',
  [STATES.JUMPING]: '#ef4444'
};

export const STATE_DESCRIPTIONS = {
  [STATES.IDLE]: 'El jugador está quieto, esperando una acción',
  [STATES.WALKING]: 'Movimiento normal con las flechas',
  [STATES.RUNNING]: 'Movimiento rápido manteniendo Shift',
  [STATES.JUMPING]: 'El jugador está en el aire'
};

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