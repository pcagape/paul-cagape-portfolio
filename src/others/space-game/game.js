import Background from "./components/Background";
import Player from "./components/Player";
import Asteroid from "./components/Asteroid";

const _ASTEROID_COUNT = 5;
const _ASTEROID_SPAWN_CHANCE = 0.012;

function Game(canvas, requestAnimFrame) {

    // Get the canvas element
    this.canvas = canvas;
    this.bgContext = this.canvas.getContext('2d');

    this.keysDown = [];
    this.asteroids = [];

    this.init = function () {
        // Initialize objects to contain their context and canvas
        // information
        Background.prototype.context = this.bgContext;
        Player.prototype.context = this.bgContext;
        Asteroid.prototype.context = this.bgContext;

        // Initialize assets
        this.background = new Background(0, 0);
        this.background.init(0, 0);
        this.player = new Player();
        this.player.init(this.canvas.width / 2 - this.player.width / 2, this.canvas.height / 2 - this.player.height / 2);
        this.spawnAsteroid();
        
        // Start animation
        this.animate();
    };

    this.animate = function () {
        if(!requestAnimFrame)
            return setTimeout(this.animate.bind(this), 100);
        
        requestAnimFrame(this.animate.bind(this));
        this.draw();
    };

    // Game update
    this.update = function () {
        this.keyHandler();
        this.trySpawnAsteroids();
    };

    // Game draw
    this.draw = function () {
        this.update();

        this.background.draw();

        // Astroids
        for (var i = 0; i < this.asteroids.length; i++)
            if (this.asteroids[i] && !this.asteroids[i].isDead)
                this.asteroids[i].draw();


        this.player.draw();
    };

    this.addKeyDown = function (key, keyCode) {
        key = key || keyCode;
        if (this.keysDown.indexOf(key) > -1) return;
        this.keysDown.push(key);
    };
    this.removeKeyUp = function (key, keyCode) {
        key = key || keyCode;
        if (this.keysDown.indexOf(key) < 0) return;
        this.keysDown.splice(this.keysDown.indexOf(key), 1);
    };
    this.keysDownHas = function (key, keyCode) {
        key = key || keyCode;
        return this.keysDown.indexOf(key) > -1 ? true : false;
    };
    this.keyHandler = function () {
        // Pressed UP
        if (this.keysDownHas('w') || this.keysDownHas(119)) {

            // move player up
            this.player.moveUp();

            // Move DOWN
        } else if (this.keysDownHas('s') || this.keysDownHas(115)) {

            // move player down
            this.player.moveDown();


        }
        // Pressed LEFT
        if (this.keysDownHas('a') || this.keysDownHas(97)) {

            // Move left
            this.player.moveLeft();

            // Pressed RIGHT
        } else if (this.keysDownHas('d') || this.keysDownHas(100)) {

            // Move left
            this.player.moveRight();
        }
    };

    this.trySpawnAsteroids = function () {

        if (Math.random() > _ASTEROID_SPAWN_CHANCE) return;

        let astroid = this.checkThereIsDeadAstroid();

        // respawn dead astroid
        if (typeof astroid != 'boolean' && astroid.isDead) {
            // respawn dead astroid
            astroid.respawnRight();
            // spawn new astroid
        } else if (typeof astroid != 'boolean') {
            this.asteroids.push(this.spawnAsteroid());
        }
    }

    this.checkThereIsDeadAstroid = function () {
        for (var i = 0; i < this.asteroids.length; i++)
            if (this.asteroids[i] && this.asteroids[i].isDead)
                return this.asteroids[i];

        if (this.asteroids.length < _ASTEROID_COUNT) return this.asteroids.length;
        return false;
    }

    this.spawnAsteroid = function () {
        let newAstroid = new Asteroid();
        newAstroid.respawnRight();

        return newAstroid;
    }

    this.onWindowResize = function() {
        console.log("has resize!",this.bgContext.canvas.width, this.bgContext.height);
    }


}

export default Game;