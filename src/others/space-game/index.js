import Phaser from 'phaser';

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
	this.add.image(300, 150, 'background');
}

function initGame() {
    var game = new Phaser.Game({
		type: Phaser.CANVAS,
		width: 600,
		height: 360,
		backgroundColor: "red",
		// scale: {
		// 	mode: Phaser.Scale.,
		// 	// autoCenter: Phaser.Scale.CENTER_BOTH
		// },
		scene: {
			preload: PreloadFn,
			create: CreateFn
		},
        canvas: document.getElementById(_CANVAS_ID)
	});
	
	// game.scene.add("Preload", Preload);
	// game.scene.add("Ingame", Ingame);
	// game.scene.add("Boot", Boot, true);
}

export default initGame;
