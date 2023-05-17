class Button {
    constructor(name, x, y, width, height, color, text, action) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.text = text;
        this.action = action;
        this.offsetY = 0;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y + this.offsetY, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(this.text, this.x + 10, this.y + 30 + this.offsetY);
    }
}