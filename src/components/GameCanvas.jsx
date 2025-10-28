import React, { useRef, useState } from 'react';
import { GAME_CONFIG } from '../config/gameConfig';
import { STATE_COLORS, STATES } from '../config/automataConfig';
import { clearCanvas, drawPlayer, drawGround } from '../utils/canvaUtils';
import { useGameLoop } from '../hooks/usegameLoop';
import { useKeyboard } from '../hooks/useKeyboard';

const GameCanvas = ({ currentState, onStateChange }) => {
  const canvasRef = useRef(null);
  const [playerPos, setPlayerPos] = useState({
    x: GAME_CONFIG.player.initialX,
    y: GAME_CONFIG.player.initialY,
    velocityY: 0
  });

  const keys = useKeyboard();

  useGameLoop(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { width, height, backgroundColor } = GAME_CONFIG.canvas;
    const { walkSpeed, runSpeed, jumpForce, gravity, groundY } = GAME_CONFIG.physics;

    // Lógica del autómata
    const isMoving = keys.ArrowLeft || keys.ArrowRight;
    const isShiftPressed = keys.Shift;
    const isSpacePressed = keys[' '];

    if (currentState === STATES.IDLE) {
      if (isSpacePressed && playerPos.y >= groundY) {
        onStateChange(STATES.JUMPING, 'Presionó espacio');
      } else if (isMoving) {
        onStateChange(STATES.WALKING, 'Presionó flecha');
      }
    } else if (currentState === STATES.WALKING) {
      if (isSpacePressed && playerPos.y >= groundY) {
        onStateChange(STATES.JUMPING, 'Presionó espacio');
      } else if (!isMoving) {
        onStateChange(STATES.IDLE, 'Soltó teclas');
      } else if (isShiftPressed) {
        onStateChange(STATES.RUNNING, 'Presionó Shift');
      }
    } else if (currentState === STATES.RUNNING) {
      if (isSpacePressed && playerPos.y >= groundY) {
        onStateChange(STATES.JUMPING, 'Presionó espacio');
      } else if (!isMoving) {
        onStateChange(STATES.IDLE, 'Soltó teclas');
      } else if (!isShiftPressed) {
        onStateChange(STATES.WALKING, 'Soltó Shift');
      }
    } else if (currentState === STATES.JUMPING) {
      if (playerPos.y >= groundY && playerPos.velocityY >= 0) {
        onStateChange(STATES.IDLE, 'Aterrizó');
      }
    }

    // Actualizar física
    setPlayerPos(prev => {
      let newX = prev.x;
      let newY = prev.y;
      let newVelocityY = prev.velocityY;

      // Movimiento horizontal
      const speed = currentState === STATES.RUNNING ? runSpeed : walkSpeed;
      if ((currentState === STATES.WALKING || currentState === STATES.RUNNING) && isMoving) {
        if (keys.ArrowLeft) newX -= speed;
        if (keys.ArrowRight) newX += speed;
        newX = Math.max(0, Math.min(width - GAME_CONFIG.player.width, newX));
      }

      // Salto y gravedad
      if (currentState === STATES.JUMPING && prev.y >= groundY && prev.velocityY === 0) {
        newVelocityY = jumpForce;
      }

      newY += newVelocityY;
      newVelocityY += gravity;

      if (newY >= groundY) {
        newY = groundY;
        newVelocityY = 0;
      }

      return { x: newX, y: newY, velocityY: newVelocityY };
    });

    // Dibujar usando utilidades
    clearCanvas(ctx, width, height, backgroundColor);
    drawGround(ctx, groundY, width, height, GAME_CONFIG.player.height);
    drawPlayer(
      ctx,
      playerPos.x,
      playerPos.y,
      GAME_CONFIG.player.width,
      GAME_CONFIG.player.height,
      STATE_COLORS[currentState]
    );

    // Texto del estado
    ctx.fillStyle = STATE_COLORS[currentState];
    ctx.font = 'bold 20px Arial';
    ctx.fillText(`Estado: ${currentState}`, 20, 30);

  }, 60);

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-4">
        Canvas del Juego
      </h2>
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={GAME_CONFIG.canvas.width}
          height={GAME_CONFIG.canvas.height}
          className="border-2 border-slate-600 rounded-lg"
        />
      </div>
      
      {/* Indicador de estado */}
      <div className="mt-4 text-center">
        <span 
          className="inline-block px-4 py-2 rounded-full font-bold text-sm"
          style={{ 
            backgroundColor: STATE_COLORS[currentState] + '30',
            color: STATE_COLORS[currentState],
            border: `2px solid ${STATE_COLORS[currentState]}`
          }}
        >
          {currentState}
        </span>
      </div>
    </div>
  );
};

export default GameCanvas;