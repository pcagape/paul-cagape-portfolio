import Phaser from 'phaser';
import GameScene from './scenes/GameScene';

const _CANVAS_ID = 'game-canvas';

class Boot extends Phaser.Scene {

	preload() {
		console.log("at BOOT!");
		this.load.pack("pack", "images/game/asset-pack.json");
		// this.load.image('background', 'images/game/bg.png');
		// this.scene.start("Preload");
		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Preload"));
	}
}

function PreloadFn() {
	this.load.pack("pack", "images/game/asset-pack.json");
}

function CreateFn() {
	this.add.image(0, 0, 'background');
}

function initGame() {
    var game = new Phaser.Game({
		type: Phaser.CANVAS,
		height: 360,
		width: 600,
		scene: [GameScene],
        canvas: document.getElementById(_CANVAS_ID)
	});
	
	// game.scene.add("Preload", Preload);
	// game.scene.add("Ingame", Ingame);
	// game.scene.add("Boot", Boot, true);
}

export default initGame;
