const images = [
    { name: "background", url: "images/game/bg.png" },
    { name: "player", url: "images/game/player.png" },
    { name: "exhaust", url: "images/game/exhaust.png" },
    { name: "asteroid1", url: "images/game/asteroid1.png" },
    { name: "asteroid2", url: "images/game/asteroid2.png" }
]

var assets = new function () {

    // All images
    images.map(image => {
        const newImage = new Image();
        
        newImage.src = image.url
        newImage.onload = function() {
            this.hasLoaded = true;
        }.bind(newImage);
        newImage.onerror = function() {
            this.hasLoaded = true;
        }.bind(newImage);
        
        this[image.name] = newImage;
    });
}

export default assets;