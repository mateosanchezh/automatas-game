// utils/canvaUtils.js

/**
 * Limpia el canvas y dibuja el fondo con grid opcional
 */
export const clearCanvas = (ctx, width, height, backgroundColor, showGrid = false) => {
  // Fondo principal
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);
  
  // Grid opcional para profundidad
  if (showGrid) {
    drawGrid(ctx, width, height);
  }
};

/**
 * Dibuja un grid sutil en el fondo
 */
const drawGrid = (ctx, width, height, gridSize = 40, opacity = 0.08) => {
  ctx.strokeStyle = `rgba(148, 163, 184, ${opacity})`;
  ctx.lineWidth = 1;
  
  // Líneas verticales
  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  
  // Líneas horizontales
  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
};

/**
 * Dibuja el jugador con efectos visuales mejorados
 */
export const drawPlayer = (ctx, x, y, width, height, color, isMoving = false) => {
  const groundY = 310;
  
  // Sombra realista
  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.filter = 'blur(8px)';
  ctx.beginPath();
  const shadowScale = 1 - ((groundY - y) / 200);
  ctx.ellipse(
    x + width / 2, 
    groundY + height + 5, 
    (width / 2) * Math.max(0.3, shadowScale), 
    6, 
    0, 0, Math.PI * 2
  );
  ctx.fill();
  ctx.restore();
  
  // Brillo detrás del jugador (efecto glow)
  if (isMoving) {
    ctx.save();
    ctx.shadowBlur = 20;
    ctx.shadowColor = color;
    ctx.fillStyle = color + '40';
    ctx.fillRect(x - 5, y - 5, width + 10, height + 10);
    ctx.restore();
  }
  
  // Cuerpo principal con gradiente
  const gradient = ctx.createLinearGradient(x, y, x, y + height);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, adjustColor(color, -40));
  
  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, width, height);
  
  // Borde brillante
  ctx.strokeStyle = adjustColor(color, 60);
  ctx.lineWidth = 3;
  ctx.strokeRect(x, y, width, height);
  
  // Detalles del personaje
  drawPlayerDetails(ctx, x, y, width, height, color);
};

/**
 * Dibuja detalles del jugador (ojos, brazos, etc)
 */
const drawPlayerDetails = (ctx, x, y, width, height, color) => {
  // Ojos
  const eyeSize = 6;
  const eyeY = y + 15;
  
  // Fondo blanco de ojos
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x + 8, eyeY, eyeSize, eyeSize);
  ctx.fillRect(x + width - 14, eyeY, eyeSize, eyeSize);
  
  // Pupilas
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(x + 10, eyeY + 2, 3, 3);
  ctx.fillRect(x + width - 12, eyeY + 2, 3, 3);
  
  // Boca simple
  ctx.strokeStyle = adjustColor(color, -60);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + 12, y + height - 15);
  ctx.lineTo(x + width - 12, y + height - 15);
  ctx.stroke();
  
  // Brazos (líneas laterales)
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x, y + 20);
  ctx.lineTo(x - 8, y + 35);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(x + width, y + 20);
  ctx.lineTo(x + width + 8, y + 35);
  ctx.stroke();
};

/**
 * Dibuja el suelo con gradiente y línea de horizonte
 */
export const drawGround = (ctx, groundY, width, height) => {
  const groundHeight = height - groundY;
  
  // Gradiente del suelo
  const gradient = ctx.createLinearGradient(0, groundY, 0, height);
  gradient.addColorStop(0, '#1e293b');
  gradient.addColorStop(0.5, '#0f172a');
  gradient.addColorStop(1, '#020617');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, groundY + 60, width, groundHeight);
  
  // Línea del horizonte con brillo
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, groundY + 60);
  ctx.lineTo(width, groundY + 60);
  ctx.stroke();
  
  // Línea de brillo
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, groundY + 61);
  ctx.lineTo(width, groundY + 61);
  ctx.stroke();
  
  // Detalles decorativos en el suelo
  drawGroundDetails(ctx, groundY, width, height);
};

/**
 * Dibuja detalles decorativos en el suelo
 */
const drawGroundDetails = (ctx, groundY, width, height) => {
  ctx.fillStyle = 'rgba(71, 85, 105, 0.3)';
  
  // Marcas horizontales decorativas
  for (let i = 0; i < width; i += 100) {
    ctx.fillRect(i, groundY + 65, 40, 2);
    ctx.fillRect(i + 60, groundY + 75, 30, 2);
  }
};

/**
 * Ajusta el brillo de un color
 */
export const adjustColor = (color, amount) => {
  const num = parseInt(color.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
};

/**
 * Dibuja información de debug en el canvas
 */
export const drawDebugInfo = (ctx, playerPos, state, fps = 60) => {
  ctx.save();
  ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
  ctx.fillRect(10, 10, 180, 90);
  
  ctx.font = 'bold 12px monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText(`Estado: ${state}`, 20, 30);
  ctx.fillText(`X: ${Math.round(playerPos.x)}`, 20, 50);
  ctx.fillText(`Y: ${Math.round(playerPos.y)}`, 20, 70);
  ctx.fillText(`FPS: ${fps}`, 20, 90);
  ctx.restore();
};

/**
 * Crea y dibuja partículas para efectos visuales
 */
export class ParticleSystem {
  constructor() {
    this.particles = [];
  }
  
  emit(x, y, count, color, speed = 3) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        life: 30,
        maxLife: 30,
        color,
        size: Math.random() * 3 + 2
      });
    }
  }
  
  update() {
    this.particles = this.particles.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      return p.life > 0;
    });
  }
  
  draw(ctx) {
    this.particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.life / p.maxLife;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }
}