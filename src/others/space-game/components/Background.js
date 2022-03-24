import images from '../assets';
import Drawable from "./_Drawable";

function Background(x, y) {
    // Background image
    this.image = images.background;
    
    this.speed = 1.5; // Background panning speed

    this.update = function() {
        // Panning
        this.x -= this.speed;
        if (this.x <= -this.context.canvas.width)
            this.x = 0;
    }

    this.draw = function () {
        this.update();

        // Don't render when image is not yet loaded
        if(!this.image.hasLoaded) return;

        this.context.drawImage(this.image, this.x, this.y);
        // Draw another image at the top edge of the first image
        this.context.drawImage(this.image, this.x + this.context.canvas.width, this.y);
    };
}

Background.prototype = new Drawable();

export default Background;