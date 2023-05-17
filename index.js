const buttons = [
    new Button(
        'erase_tool',
        10,
        10,
        100,
        50,
        '#f00',
        'Eraser',
        function () {
            btnToggled = this.name;
            drawButtons();
        }
    ),
    new Button(
        'pen_tool',
        10,
        70,
        100,
        50,
        '#0f0',
        'Pen',
        function () {
            btnToggled = this.name;
            drawButtons();
        }
    ),
    new Button(
        'pen_width',
        10,
        130,
        100,
        50,
        '#00f',
        'Width',
        function () {
            const newWidth = prompt('Enter the new pen width:');
            if (newWidth !== null) {
                CONSTANTS.DRAW_WIDTH = parseInt(newWidth, 10);
            }
        }
    ),
    new Button(
        'pen_color',
        10,
        190,
        100,
        50,
        '#ff0',
        'Color',
        function () {
            const newColor = prompt('Enter color hex code:');
            if (newColor !== null) {
                CONSTANTS.DRAW_COLOR = newColor;
            }
        }
    ),
];

const app = new DrawingApp();
app.buttons = buttons;
app.drawButtons();