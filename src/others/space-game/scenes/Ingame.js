import Phaser from 'phaser';
// You can write more code here

/* START OF COMPILED CODE */

class Ingame extends Phaser.Scene {

	constructor() {
		super("Ingame");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// dino
		const dino = this.add.image(5, 5, "background");

		// text_1
		const text_1 = this.add.text(400, 408, "", {});
		text_1.setOrigin(0.5, 0.5);
		text_1.text = "Phaser 3 + Phaser Editor 2D";
		text_1.setStyle({"fontFamily":"Arial","fontSize":"30px"});

		// dino (components)
		// new PushOnClick(dino);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write more your code here

	create() {
		console.log("at Ingame!");
		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export default Ingame;