import React, { useRef, useState } from 'react';
import { GAME_CONFIG } from '../config/gameConfig';
import { STATE_COLORS, STATES, STATE_ICONS } from '../config/automataConfig';
import { clearCanvas, drawPlayer, drawGround } from '../utils/canvaUtils';
import { useGameLoop } from '../hooks/useGameLoop';
import { useKeyboard } from '../hooks/useKeyboard';
import './GameCanvas.css';

const GameCanvas = ({ currentState, onStateChange }) => {
  const canvasRef = useRef(null);
  const [playerPos, setPlayerPos] = useState({
    x: GAME_CONFIG.player.initialX,
    y: GAME_CONFIG.player.initialY,
    velocityY: 0
  });
  const [keysPressed, setKeysPressed] = useState([]);

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

    // Actualizar teclas presionadas
    const currentKeys = [];
    if (keys.ArrowLeft) currentKeys.push('←');
    if (keys.ArrowRight) currentKeys.push('→');
    if (keys.Shift) currentKeys.push('Shift');
    if (keys[' ']) currentKeys.push('Space');
    setKeysPressed(currentKeys);

    // Transiciones de estado
    if (currentState === STATES.IDLE) {
      if (isSpacePressed && playerPos.y >= groundY) onStateChange(STATES.JUMPING, 'Presionó espacio');
      else if (isMoving) onStateChange(STATES.WALKING, 'Presionó flecha');
    } else if (currentState === STATES.WALKING) {
      if (isSpacePressed && playerPos.y >= groundY) onStateChange(STATES.JUMPING, 'Presionó espacio');
      else if (!isMoving) onStateChange(STATES.IDLE, 'Soltó teclas');
      else if (isShiftPressed) onStateChange(STATES.RUNNING, 'Presionó Shift');
    } else if (currentState === STATES.RUNNING) {
      if (isSpacePressed && playerPos.y >= groundY) onStateChange(STATES.JUMPING, 'Presionó espacio');
      else if (!isMoving) onStateChange(STATES.IDLE, 'Soltó teclas');
      else if (!isShiftPressed) onStateChange(STATES.WALKING, 'Soltó Shift');
    } else if (currentState === STATES.JUMPING) {
      if (playerPos.y >= groundY && playerPos.velocityY >= 0) onStateChange(STATES.IDLE, 'Aterrizó');
    }

    // Actualizar física
    setPlayerPos(prev => {
      let newX = prev.x;
      let newY = prev.y;
      let newVelocityY = prev.velocityY;

      const speed = currentState === STATES.RUNNING ? runSpeed : walkSpeed;
      if ((currentState === STATES.WALKING || currentState === STATES.RUNNING) && isMoving) {
        if (keys.ArrowLeft) newX -= speed;
        if (keys.ArrowRight) newX += speed;
        newX = Math.max(0, Math.min(width - GAME_CONFIG.player.width, newX));
      }

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

    // Dibujar escena
    clearCanvas(ctx, width, height, backgroundColor, true);
    drawGround(ctx, groundY, width, height);
    drawPlayer(
      ctx,
      playerPos.x,
      playerPos.y,
      GAME_CONFIG.player.width,
      GAME_CONFIG.player.height,
      STATE_COLORS[currentState],
      isMoving
    );

    // Texto informativo
    ctx.save();
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(15, 15, 220, 50);
    ctx.fillStyle = STATE_COLORS[currentState];
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.fillText(`${currentState}`, 25, 40); // Se eliminó el emoji
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText(`X: ${Math.round(playerPos.x)} Y: ${Math.round(playerPos.y)}`, 25, 56);
    ctx.restore();
  }, 60);

  return (
    <div className="gamecanvas-container">
      <div className="gamecanvas-header">
        <div className="gamecanvas-header-light"></div>
        <h2>Canvas del Juego</h2>
      </div>

      <div className="gamecanvas-wrapper">
        <div className="canvas-area">
          <div className="canvas-container">
            <canvas
              ref={canvasRef}
              width={GAME_CONFIG.canvas.width}
              height={GAME_CONFIG.canvas.height}
              className="game-canvas"
              style={{
                boxShadow: `0 0 30px ${STATE_COLORS[currentState]}30`
              }}
            />
            {/* Overlay de teclas presionadas */}
            {keysPressed.length > 0 && (
              <div className="key-overlay">
                {keysPressed.map((key, idx) => (
                  <div
                    key={idx}
                    className="key-item"
                    style={{
                      backgroundColor: STATE_COLORS[currentState] + '90',
                      boxShadow: `0 4px 15px ${STATE_COLORS[currentState]}50`
                    }}
                  >
                    {key}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Indicador de estado */}
        <div className="state-indicator">
          <div
            className="state-box"
            style={{
              backgroundColor: STATE_COLORS[currentState] + '20',
              color: STATE_COLORS[currentState],
              border: `3px solid ${STATE_COLORS[currentState]}`,
              boxShadow: `0 0 30px ${STATE_COLORS[currentState]}50, inset 0 0 20px ${STATE_COLORS[currentState]}10`
            }}
          >
            <div className="pulse-dot"></div>
            <span className="state-icon"></span> {/* Emoji eliminado */}
            <span>{currentState}</span>
          </div>

          {/* Velocímetro */}
          <div className="speed-indicator">
            <div className="speed-label">Velocidad</div>
            <div className="speed-bars">
              {[1, 2, 3, 4, 5].map((bar) => (
                <div
                  key={bar}
                  className="speed-bar"
                  style={{
                    backgroundColor:
                      (currentState === STATES.RUNNING && bar <= 5) ||
                      (currentState === STATES.WALKING && bar <= 3) ||
                      (currentState === STATES.JUMPING && bar <= 4)
                        ? STATE_COLORS[currentState]
                        : '#334155',
                    opacity:
                      (currentState === STATES.RUNNING && bar <= 5) ||
                      (currentState === STATES.WALKING && bar <= 3) ||
                      (currentState === STATES.JUMPING && bar <= 4)
                        ? 1
                        : 0.3
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-label">Posición X</div>
            <div className="stat-value blue">{Math.round(playerPos.x)}px</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Posición Y</div>
            <div className="stat-value purple">{Math.round(playerPos.y)}px</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">En tierra</div>
            <div className="stat-value green">
              {playerPos.y >= GAME_CONFIG.physics.groundY ? '✓ Sí' : '✗ No'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCanvas;
