export default function Drawable() {
    this.init = function (x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    this.speed = 0;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    // Define abstract function to be implemented in child objects
    this.draw = function () { };
}