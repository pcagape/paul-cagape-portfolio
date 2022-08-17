import images from '../assets';
import Drawable from "./_Drawable";

const _PLAYER_MOVESPEED = 5;

function Player() {
    this.image = images.player;
    this.width = this.image.width;
    this.height = this.image.height;

    // Exhaust image
    this.exhaustFrame = 0;
    this.imageExhaust = images.exhaust;

    this.update = function () {

        // Update exhaust frame
        this.now = new Date().getTime();
        if (!this._lastExhaustFrameUpdate || Math.abs(this._lastExhaustFrameUpdate - this.now) > 1000 / 10) {
            this.exhaustFrame++;
            this._lastExhaustFrameUpdate = new Date(this.now).getTime();
        }
        if (this.exhaustFrame >= 2)
            this.exhaustFrame = 0;

        // console.log(this.x, this.y);
    };

    this.draw = function () {
        this.update();

        // main ship
        if(this.image.hasLoaded)
            this.context.drawImage(this.image, this.x, this.y);

        // Exhaust animation
        if(this.imageExhaust.hasLoaded)
            this.context.drawImage(this.imageExhaust, 0 + (this.exhaustFrame * (this.imageExhaust.width / 2)), 0, this.imageExhaust.width / 2, this.imageExhaust.height, this.x - this.width * 0.48, this.y - this.height * 0.18, this.imageExhaust.width / 2, this.imageExhaust.height);

    };

    this.moveUp = function () {
        if (this.y <= 0) return;
        this.y = this.y - _PLAYER_MOVESPEED;
    };
    this.moveLeft = function () {
        if (this.x <= 0) return;
        this.x = this.x - _PLAYER_MOVESPEED;
    };
    this.moveDown = function () {
        if (this.y + this.height >= this.context.canvas.height) return;
        this.y = this.y + _PLAYER_MOVESPEED;
    };
    this.moveRight = function () {
        if (this.x + this.height >= this.context.canvas.width) return;
        this.x = this.x + _PLAYER_MOVESPEED;
    };
}

Player.prototype = new Drawable();

export default Player;