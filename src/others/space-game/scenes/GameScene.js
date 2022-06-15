import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('game-scene');
    }

    preload() {
        this.load.image('background', 'images/game/bg.png');
        // this.load.pack("pack", "images/game/asset-pack.json");
    }

    create() {
        this.add.image(300, 180, 'background');
    }
}