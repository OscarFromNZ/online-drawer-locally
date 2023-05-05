/* Get canvas element and set up 2D context */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

/* Set canvas dimensions */
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

/* Initialize drawing state */
let isDrawing = false;

/* Add event listeners for drawing and button interaction */
canvas.addEventListener('mousedown', onClick);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

/* 
 * Handle click events on the canvas,
 * including button clicks and starting drawing
 */
function onClick(event) {
  /* Get click coordinates */
  const x = event.offsetX;
  const y = event.offsetY;

  /* Check if a button was clicked */
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    if (
      x > button.x && x < button.x + button.width &&
      y > button.y && y < button.y + button.height
    ) {
      button.action();
      return;
    }
  }

  /* If no button was clicked, begin drawing */
  isDrawing = true;
  draw(event);
}

/* 
 * Handle drawing on the canvas
 */
function draw(event) {
  /* Return early if not in drawing state */
  if (!isDrawing) return;

  /* Get drawing coordinates */
  const x = event.offsetX;
  const y = event.offsetY;

  /* Set drawing attributes */
  ctx.lineWidth = CONSTANTS.DEFAULT_DRAW_WIDTH;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black';

  /* Draw a line on the canvas */
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

/* 
 * Stop drawing when the mouse is released or leaves the canvas
 */
function stopDrawing() {
  isDrawing = false;
  ctx.beginPath();
}

/* 
 * Draw the buttons on the sidebar
 */
function drawButtons() {
  buttons.forEach(button => {
    ctx.fillStyle = button.color;
    ctx.fillRect(button.x, button.y + button.offsetY, button.width, button.height);
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';

    ctx.fillText(button.text, button.x + 10, button.y + 30 + button.offsetY);
  });
}

drawButtons();