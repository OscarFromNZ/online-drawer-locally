class DrawingApp {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.buttons = [];
        this.isDrawing = false;

        this.setupCanvas();
        this.setupEventListeners();
        this.drawButtons();

        this.btnToggled = 'pen_tool';
    }

    setupCanvas() {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;

        // Fill the canvas with black for background colour
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    setupEventListeners() {
        this.canvas.addEventListener('mousedown', this.onClick.bind(this));
        this.canvas.addEventListener('mousemove', this.draw.bind(this));
        this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
        this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));
    }

    onClick(event) {
        const x = event.offsetX;
        const y = event.offsetY;

        for (const button of this.buttons) {
            if (this.isButtonClicked(button, x, y)) {
                button.action();
                return;
            }
        }

        this.isDrawing = true;
        this.draw(event);
    }

    draw(event) {
        if (!this.isDrawing) return;

        const x = event.offsetX;
        const y = event.offsetY;

        this.ctx.lineWidth = CONSTANTS.DRAW_WIDTH;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = this.btnToggled === 'eraser_tool' ? 'white' : CONSTANTS.DRAW_COLOR;

        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
    }

    stopDrawing() {
        this.isDrawing = false;
        this.ctx.beginPath();
    }

    isButtonClicked(button, x, y) {
        return (
            x > button.x &&
            x < button.x + button.width &&
            y >

            button.y &&
            y < button.y + button.height
        );
    }

    drawButtons() {
        for (const button of this.buttons) {
            button.draw(this.ctx);
        }
    }
}