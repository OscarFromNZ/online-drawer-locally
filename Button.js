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
        this.dark = false;
        this.scale = 1;
        this.shadowOffset = 0; 
        this.rotation = 0; 
        this.wobbleAngle = 0;
        this.confetti = [];
    }

    draw(ctx) {
        this.scale = this.dark ? Math.sin(Date.now() / 200) * 0.1 + 1 : 1;
        this.shadowOffset = this.dark ? 5 : 0;

        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = this.shadowOffset;
        ctx.shadowOffsetY = this.shadowOffset;

        this.drawGradientBackground(ctx);
        this.drawShinyBorder(ctx);
        
        ctx.fillStyle = this.color;
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);
        ctx.scale(this.scale, this.scale); 
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height); 
        ctx.restore();

        ctx.fillStyle = 'black';
        ctx.font = `${20 * this.scale}px Arial`;
        ctx.fillText(this.text, this.x + 10, this.y + 30);
        
        if (this.dark) {
            this.rotation += 0.05;
            this.wobbleAngle += 0.1;
            this.applyRipple(ctx);
            this.applyTextShadow(ctx);
            this.sparkleEffect(ctx);
            this.updateConfetti(ctx);
        }
    }

    drawGradientBackground(ctx) {
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y + this.height);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
        ctx.fillStyle = gradient;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    drawShinyBorder(ctx) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 5;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    applyRipple(ctx) {
        const rippleRadius = 10 + Math.sin(Date.now() / 200) * 10;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + this.height / 2, rippleRadius, 0, Math.PI * 2);
        ctx.fill();
    }

    applyTextShadow(ctx) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.font = `${20 * this.scale}px Arial`;
        ctx.fillText(this.text, this.x + 10, this.y + 30);
        ctx.fillStyle = 'black';
    }

    sparkleEffect(ctx) {
        for (let i = 0; i < 3; i++) {
            const sparkleX = this.x + Math.random() * this.width;
            const sparkleY = this.y + Math.random() * this.height;
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
            ctx.beginPath();
            ctx.arc(sparkleX, sparkleY, Math.random() * 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    updateConfetti(ctx) {
        if (this.confetti.length < 50) {
            this.confetti.push({ x: this.x + this.width / 2, y: this.y + this.height / 2, angle: Math.random() * Math.PI * 2, speed: Math.random() * 2 + 1 });
        }
        for (let i = 0; i < this.confetti.length; i++) {
            const particle = this.confetti[i];
            particle.x += Math.cos(particle.angle) * particle.speed;
            particle.y += Math.sin(particle.angle) * particle.speed;
            ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
            ctx.fill();
            if (particle.x < 0 || particle.x > ctx.canvas.width || particle.y < 0 || particle.y > ctx.canvas.height) {
                this.confetti.splice(i, 1);
                i--;
            }
        }
    }

    setHover(state) {
        this.dark = state;
    }
}
