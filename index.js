const app = new DrawingApp();

const buttons = [
    new Button(
        'eraser_tool',
        10,
        10,
        100,
        50,
        '#f00',
        'Eraser',
        function () {
            CONSTANTS.btnToggled = this.name;
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
            CONSTANTS.btnToggled = this.name;
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
    new Button(
        'save_artwork',
        10,
        250,
        100,
        50,
        '#ff0',
        'Save',
        function () {
            const name = prompt('Save as (name):');
            console.log(name);
            artworkManager.saveArtwork(app.canvas, name);
        }
    ),
    new Button(
        'load_artwork',
        10,
        310,
        100,
        50,
        '#ff0',
        'Load',
        function () {
            const name = prompt('Name of canvas to load:');
            artworkManager.loadArtwork(app.canvas, app.ctx, name);
        }
    ),
    new Button(
        'clear-localstorage',
        10,
        370,
        100,
        50,
        '#ff0',
        'Clear LS',
        function () {
            artworkManager.clearLS();
        }
    ),
];

app.buttons = buttons;
app.drawButtons();