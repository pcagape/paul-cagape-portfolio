'Use strict';
var images = new function () {
    
    // Background
    this.background = new Image();
    this.background.src = 'images/bg.png';

    this.player = new Image();
    this.player.src = 'images/player.png';
}

function Drawable() {
    this.init = function (x, y) {
        this.x = x;
        this.y = y;
    }
    this.speed = 0;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    // Define abstract function to be implemented in child objects
    this.draw = function () {
    };
}

function Background(x, y) {
    this.speed = 1.5; // Background panning speed

    this.draw = function () {
        // Panning
        this.x += this.speed;

        this.context.drawImage(images.background, this.x, this.y);
        // Draw another image at the top edge of the first image
        this.context.drawImage(images.background, this.x - this.canvasWidth, this.y);
        
        if (this.x >= this.canvasWidth)
            this.x = 0;
    };
}

function Player() {

    this.draw = function () {
        this.context.drawImage(images.player, this.x, this.y);
    };
}

Background.prototype = new Drawable();
Player.prototype = new Drawable();


function SpaceGame() {

    this.init = function () {
        // Get the canvas element
        this.bgCanvas = document.getElementById('background');
        // Test to see if canvas is supported
        if (this.bgCanvas.getContext) {
            this.bgContext = this.bgCanvas.getContext('2d');
            // Initialize objects to contain their context and canvas
            // information
            Background.prototype.context = this.bgContext;
            Background.prototype.canvasWidth = this.bgCanvas.width;
            Background.prototype.canvasHeight = this.bgCanvas.height;
            Player.prototype.context = this.bgContext;
            
            // Initialize assets
            this.background = new Background(0, 0);
            this.background.init(0, 0);
            return true;
        } else {
            return false;
        }
    };
    // Start the animation loop
    this.start = function () {
        animate();
    };
}

function animate() {
    requestAnimFrame(animate);
    theGame.background.draw();
}

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

var theGame = null;
setTimeout(()=>{
    theGame = new SpaceGame();
    theGame.init();
    theGame.start();
}, 100);
