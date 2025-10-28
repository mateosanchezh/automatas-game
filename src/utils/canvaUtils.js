export const clearCanvas = (ctx, width, height, backgroundColor) => {
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);
};

export const drawPlayer = (ctx, x, y, width, height, color) => {
  // Cuerpo del jugador
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
  
  // Borde blanco
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);
};

export const drawGround = (ctx, groundY, width, height, playerHeight) => {
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, groundY + playerHeight, width, height - groundY - playerHeight);
};