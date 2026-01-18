import './style.css'
import Phaser from "phaser";

import MainScene from "./scenes/MainScene";
import GameScene from "./scenes/GameScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: [
    MainScene,
    GameScene
  ]
};

new Phaser.Game(config);