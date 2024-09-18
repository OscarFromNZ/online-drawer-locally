class DrawingApp {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.buttons = [];
        this.isDrawing = false;

        // zoom stuff
        this.scale = 1;
        this.offsetX = 0;
        this.offsetY = 0;

        this.setupCanvas();
        this.setupEventListeners();
        this.drawButtons();
    }

    setupCanvas() {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    setupEventListeners() {
        this.canvas.addEventListener('mousedown', this.onClick.bind(this));
        this.canvas.addEventListener('mousemove', this.moveMouse.bind(this));
        this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
        this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));
        this.canvas.addEventListener('wheel', this.zoom.bind(this));
    }

    onClick(event) {
        const { offsetX, offsetY } = this.getAdjustedCoords(event);

        for (const button of this.buttons) {
            if (this.isOnButton(button, offsetX, offsetY)) {
                button.action();
                return;
            }
        }

        this.isDrawing = true;
    }

    // for button clicking and drawing as of now, maybe for panning later
    moveMouse(event) {
        const { offsetX, offsetY } = this.getAdjustedCoords(event);
    
        for (const button of this.buttons) {
            if (this.isOnButton(button, offsetX, offsetY)) {
                button.dark = true;
            } else {
                button.dark = false;
                button.confetti = []; // don't ask questions you don't wanna know the answers to
            }
        }
    
        this.drawButtons();
    
        if (this.isDrawing) {
            // If it is drawing, do drawing stuff
            this.ctx.lineWidth = CONSTANTS.DRAW_WIDTH;
            this.ctx.lineCap = 'round';
            this.ctx.strokeStyle = CONSTANTS.btnToggled === 'eraser_tool' ? 'black' : CONSTANTS.DRAW_COLOR;
    
            this.ctx.lineTo(offsetX, offsetY);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(offsetX, offsetY);
        }
    }
    
    stopDrawing() {
        this.isDrawing = false;
        this.ctx.beginPath();
    }

    isOnButton(button, x, y) {
        return (
            x > button.x &&
            x < button.x + button.width &&
            y > button.y &&
            y < button.y + button.height
        );
    }

    drawButtons() {
        for (const button of this.buttons) {
            button.draw(this.ctx);
        }
    }

    // Function to handle zoom
    zoom(event) {
        event.preventDefault(); // Prevent the page from scrolling
        const zoomIntensity = 0.1; // Adjust zoom sensitivity
        const wheel = event.deltaY < 0 ? 1 : -1; // Determine zoom direction

        this.scale += wheel * zoomIntensity; // Update scale factor
        this.scale = Math.max(this.scale, 0.1); // Prevent scale from going below 0.1

        this.ctx.setTransform(this.scale, 0, 0, this.scale, this.offsetX, this.offsetY); // Set canvas transform
        this.redrawCanvas(); // Redraw the canvas
    }

    // Function to redraw the canvas
    redrawCanvas() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // Redraw all buttons and saved drawings here
        this.drawButtons();
        // Implement logic to redraw shapes/lines if you have a stored drawing state
    }

    // Function to adjust coordinates based on scale
    getAdjustedCoords(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left - this.offsetX) / this.scale;
        const y = (event.clientY - rect.top - this.offsetY) / this.scale;
        return { offsetX: x, offsetY: y };
    }
}
