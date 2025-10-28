import { useEffect, useRef } from 'react';

export const useGameLoop = (callback, fps = 60) => {
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const fpsInterval = 1000 / fps;

  useEffect(() => {
    const animate = (time) => {
      requestRef.current = requestAnimationFrame(animate);

      if (previousTimeRef.current === undefined) {
        previousTimeRef.current = time;
      }

      const elapsed = time - previousTimeRef.current;

      if (elapsed > fpsInterval) {
        previousTimeRef.current = time - (elapsed % fpsInterval);
        callback(elapsed);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [callback, fpsInterval]);
};