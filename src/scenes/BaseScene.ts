import Phaser from "phaser";

export default class BaseScene extends Phaser.Scene {
  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  preload() {
    this.load.image('bg', 'images/background.webp');
  }

  createBackground() {
    this.add.image(0, 0, 'bg')
      .setOrigin(0, 0)
      .setDisplaySize(this.cameras.main.width, this.cameras.main.height)
      .setDepth(-1);
  }
}
