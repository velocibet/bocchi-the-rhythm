// import Phaser from "phaser";
import BaseScene from "./BaseScene";

export default class MainScene extends BaseScene {
  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
    super.preload();
  }

  create() {
    this.createBackground();

    this.add.text(300, 200, "Bocchi the rhythm!", {font: "64px ClipArtKorea"});

    const startButton = this.add.text(300, 400, "시작하기", {font: "16px ClipArtKorea"});
    startButton.setInteractive();

    startButton.on('pointerdown', () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);

      this.cameras.main.once('camerafadeoutcomplete', () => {
          this.scene.start('GameScene');
      });

    });
  }

  update() {
    
  }
}
