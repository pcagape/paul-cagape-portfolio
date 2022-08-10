import SpaceGame from './game.js';

const _CANVAS_ID = 'game-canvas';

function initializeGameBackground(){
    
    // Continue if canvas has loaded
    const canvas = document.getElementById(_CANVAS_ID);
    if (!canvas)
        return setTimeout(initializeGameBackground, 100);

    // Frame render
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    // Space Game
    const game = new SpaceGame(canvas, window.requestAnimFrame);

    // initialize ig
    window.ig = { game };

    // on window resize
    window.onresize = onWindowResize.bind(game);

    // Add eventListeners
    window.addEventListener("keydown", onKeyPressed.bind(game), true)
    window.addEventListener("keyup", onKeyUp.bind(game), true)
    
    // init
    game.init();
}

function onWindowResize() {
    this.onWindowResize();
}

function onKeyPressed(e) {
    let key = e.key || '';
    key = key.toLowerCase();
    const keyCode = e.keyCode || e.which;
    this.addKeyDown(key, keyCode);
}
function onKeyUp(e) {
    let key = e.key || '';
    key = key.toLowerCase();
    const keyCode = e.keyCode || e.which;
    this.removeKeyUp(key, keyCode);
}

export default initializeGameBackground;
