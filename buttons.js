/* 
 * Define an array of buttons with their properties,
 * actions, and initial states
 */
const buttons = [
    {
        name: 'erase_tool',
        x: 10,
        y: 10,
        offsetY: 0,
        width: 100,
        height: 50,
        color: '#f00',
        text: 'Eraser',
        toggled: false,
        /* 
         * Action performed when the 'eraser' button is clicked:
         * log to the console and toggle the button state
         */
        action: function () {
            console.log('Button "eraser" was clicked!');
            animateButton(this);
            toggleButton(this);
        }
    },
    {
        name: 'pen_tool',
        x: 10,
        y: 70,
        offsetY: 0,
        width: 100,
        height: 50,
        color: '#0f0',
        text: 'Pen',
        toggled: false,
        /* 
         * Action performed when the 'pen tool' button is clicked:
         * animate the button, log to the console, and toggle the button state
         */
        action: function () {
            console.log('Button "pen tool" was clicked!');
            animateButton(this);
            toggleButton(this);
        }
    },
];

/* 
 * Toggle the state of the clicked button
 * and reset the state of all other buttons
 */
function toggleButton(clickedButton) {
    buttons.forEach(button => {
        button.toggled = (button === clickedButton);
    });

    /* Redraw the buttons with their updated states */
    drawButtons();
}

/* 
 * Animate a button by changing its offsetY over time,
 * creating a visual effect of the button moving down and up
 */
function animateButton(button) {
    /* Set initial animation settings */
    const startOffsetY = 0;
    const endOffsetY = 5;
    const duration = 100; // Animation duration in milliseconds

    /* Store the animation start time */
    const startTime = performance.now();

    /* 
     * Update the animation based on the current time,
     * applying an easing function to create a smooth effect
     */
    function step(currentTime) {
        /* Calculate the animation progress (value between 0 and 1) */
        const progress = Math.min((currentTime - startTime) / duration, 1);

        /* Calculate the easing (ease in and out) */
        const easing = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        /* Update the button's offsetY based on easing */
        button.offsetY = startOffsetY + (endOffsetY - startOffsetY) * easing;

        /* Redraw the buttons */
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawButtons();

        /* Continue animating if progress is not complete */
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            /* Reset the offsetY and redraw the buttons one last time */
            button.offsetY = startOffsetY;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawButtons();
        }
    }

    /* Start the animation */
    requestAnimationFrame(step);
}
