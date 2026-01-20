// import Phaser from "phaser";
import BaseScene from "./BaseScene";

interface Data {
    score: number;
    combo: number
}

export default class MainScene extends BaseScene {
  constructor() {
    super({ key: "ResultScene" });
  }

  preload() {
    super.preload();
  }

  create(data: Data) {
    this.createBackground();

    this.add.text(300, 300, `점수: ${data.score}`, {font: "32px ClipArtKorea"});
    this.add.text(300, 250, `최고 콤보: ${data.combo}`, {font: "32px ClipArtKorea"});

    const startButton = this.add.text(300, 400, "다시 시작하기", {font: "16px ClipArtKorea"});
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
