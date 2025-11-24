import { useEffect, useRef } from 'react';

/**
 * Hook personalizado para manejar un bucle de juego con control de FPS.
 * @param {Function} callback - Función que se ejecuta en cada frame.
 * @param {number} fps - Cuadros por segundo (por defecto 60).
 */
export const useGameLoop = (callback, fps = 60) => {
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);
  const fpsIntervalRef = useRef(1000 / fps);

  useEffect(() => {
    fpsIntervalRef.current = 1000 / fps;

    const animate = (time) => {
      if (!previousTimeRef.current) {
        previousTimeRef.current = time;
      }

      const elapsed = time - previousTimeRef.current;

      // Solo ejecuta el callback cuando ha pasado el intervalo del FPS
      if (elapsed >= fpsIntervalRef.current) {
        previousTimeRef.current = time - (elapsed % fpsIntervalRef.current);
        callback(elapsed);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    // Limpieza cuando el componente se desmonta
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      requestRef.current = null;
      previousTimeRef.current = null;
    };
  }, [callback, fps]);
};
