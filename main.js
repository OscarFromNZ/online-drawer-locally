const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Canvas dimensions
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let isDrawing = false;

// Event listeners
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(event) {
  isDrawing = true;
  draw(event);
}

function draw(event) {
  if (!isDrawing) return;
  
  const x = event.offsetX;
  const y = event.offsetY;
  
  ctx.lineWidth = CONSTANTS.DEFAULT_DRAW_WIDTH;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black';
  
  if (event.shiftKey) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
}

function stopDrawing() {
  isDrawing = false;
  ctx.beginPath();
}
