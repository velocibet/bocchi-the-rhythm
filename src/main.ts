import './style.css'
import Phaser from "phaser";

import MainScene from "./scenes/MainScene";
import GameScene from "./scenes/GameScene";
import ResultScene from "./scenes/ResultScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: [
    MainScene,
    GameScene,
    ResultScene
  ]
};

new Phaser.Game(config);