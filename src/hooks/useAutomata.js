// src/hooks/useAutomata.js
import { useState } from 'react';
import { STATES } from '../config/automataConfig';

/**
 * Hook personalizado para manejar el autómata de estados del jugador.
 */
export const useAutomata = () => {
  const [currentState, setCurrentState] = useState(STATES.IDLE);
  const [transitionHistory, setTransitionHistory] = useState([]);

  const transition = (newState, reason) => {
    setTransitionHistory((prev) => [
      ...prev,
      { from: currentState, to: newState, reason, timestamp: Date.now() }
    ]);
    setCurrentState(newState);
  };

  const getCurrentStateInfo = () => {
    return {
      state: currentState,
      description: getDescriptionForState(currentState)
    };
  };

  const getDescriptionForState = (state) => {
    switch (state) {
      case STATES.IDLE:
        return 'El jugador está quieto.';
      case STATES.WALKING:
        return 'El jugador camina.';
      case STATES.RUNNING:
        return 'El jugador corre.';
      case STATES.JUMPING:
        return 'El jugador está saltando.';
      default:
        return 'Estado desconocido.';
    }
  };

  return {
    currentState,
    transition,
    getCurrentStateInfo,
    transitionHistory
  };
};
