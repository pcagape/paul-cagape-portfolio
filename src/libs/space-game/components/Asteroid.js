import images from '../assets';
import Drawable from "./_Drawable";

const _ASTEROID_MIN_SPEED = 0.5;
const _ASTEROID_MAX_SPEED = 2.5;
const _ASTEROID_MIN_ROTATE = -2.5;
const _ASTEROID_MAX_ROTATE = 2.5;

function Asteroid() {
    this.image = Math.random() < 0.5 ? images.asteroid1 : images.asteroid2;
    this.width = this.image.width;
    this.height = this.image.height;
    this.rotationSpeed = Math.random() * (_ASTEROID_MAX_ROTATE - _ASTEROID_MIN_ROTATE) + _ASTEROID_MIN_ROTATE;
    this.xSpeed = Math.random() * (_ASTEROID_MAX_SPEED - _ASTEROID_MIN_SPEED) + _ASTEROID_MIN_SPEED;
    this.ySpeed = Math.random() * (_ASTEROID_MAX_SPEED - -_ASTEROID_MAX_SPEED) + -_ASTEROID_MAX_SPEED;
    this.rotate = Math.random() * (360 - 0) + 0;

    this.update = function () {
        this.x -= this.xSpeed;
        this.rotate += this.rotationSpeed;

        if (this.x + this.width < 0 && !this.isDead) {
            this.isDead = true;
        } else this.x -= this.xSpeed;
    };

    this.draw = function () {
        this.update();

        // Don't render when image is not yet loaded
        if(!this.image.hasLoaded) return;

        this.context.save();

        // asteroid
        // this.context.rotate(this.rotate * Math.PI / 180);
        this.context.translate(this.x, this.y);
        this.context.rotate(this.rotate * Math.PI / 180);
        this.context.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);

        this.context.restore();
    };

    this.respawnRight = function () {
        this.isDead = false;
        // randomly spawn on the right
        this.init(this.context.canvas.width * 1.2, Math.random() * (this.context.canvas.height * 0.95 - this.context.canvas.height * -0.1) + this.context.canvas.height * -0.1);
    }
}

Asteroid.prototype = new Drawable();

export default Asteroid;