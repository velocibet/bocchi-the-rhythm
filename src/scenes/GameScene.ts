import Phaser from "phaser";
import BaseScene from "./BaseScene";

import { testChart } from "../charts/testChart";

const LANES_X = [200, 300, 400, 500];
const HIT_Y = 600;
const MISS_WINDOW = 150;

interface Note {
  line: number;
  hitTime: number;
  hit: boolean;
  circle: Phaser.GameObjects.Arc;
}

const KEY_TO_LINE: Record<string, number> = {
  KeyD: 0,
  KeyF: 1,
  KeyJ: 2,
  KeyK: 3,
};

export default class MainScene extends BaseScene {
  private startTime = 0;
  private notes: Note[] = [];
  private evaluateText!: Phaser.GameObjects.Text;
  private judgeTimer?: Phaser.Time.TimerEvent;
  private combo = 0;
  private highCombo = 0;
  private score = 0;
  private comboText!: Phaser.GameObjects.Text;
  private music!: Phaser.Sound.BaseSound;

  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.audio("song", "/audio/song01.mp3");;
    this.load.audio("sound01", "/audio/sound01.mp3");
    this.load.image('burst01', '/images/burst01.png');

    super.preload();
  }

  create() {
    this.createBackground();
    const graphics01 = this.add.graphics();

    const Keys: Record<string, Phaser.GameObjects.Graphics> = {
      graphicsKey1: this.add.graphics(),
      graphicsKey2: this.add.graphics(),
      graphicsKey3: this.add.graphics(),
      graphicsKey4: this.add.graphics()
    };
    
    LANES_X.forEach((LANE_X: number) => {
      graphics01.lineStyle(4, 0xffffff, 1);
      graphics01.strokeCircle(LANE_X, HIT_Y, 40);
    })

    for (let i = 1; i <= 4; i++) {
      const graphics = Keys[`graphicsKey${i}`]

      graphics.setVisible(false);
      graphics.fillStyle(0x00ffff, 1);
      graphics.fillCircle(LANES_X[i-1], HIT_Y, 40);
    }

    this.evaluateText = this.add.text(350, 300, "", {
      font: "16px ClipArtKorea"
    });

    this.comboText = this.add.text(350, 200, "", {
      font: "32px ClipArtKorea"
    });

    this.input.keyboard!.on("keydown", (event: KeyboardEvent) => {
      const line = KEY_TO_LINE[event.code];
      if (line === undefined) return;

      const graphics = Keys[`graphicsKey${line + 1}`];
      graphics.setVisible(true);
      
      this.handleHit(line);

      if ((graphics as any).hideTimer) {
          (graphics as any).hideTimer.remove(false);
      }

      (graphics as any).hideTimer = this.time.delayedCall(200, () => {
          graphics.setVisible(false);
      });

    });

    this.time.delayedCall(3000, () => {
      this.startGame();
    });
  }

  update(time: number) {
    const currentTime = time - this.startTime;
    const SPEED = 1.2;

    this.notes.forEach((note) => {
      if (note.hit) return;

      const timeToHit = note.hitTime - currentTime;
      note.circle.y = HIT_Y - timeToHit * SPEED;

      if (currentTime > note.hitTime + MISS_WINDOW) {
        note.hit = true;
        note.circle.destroy();
        this.showJudge("Miss");
        this.combo = 0;
      }

      this.checkGameEnd();
    });
  }

  private startGame() {
    this.startTime = this.time.now;
    
    testChart.forEach(note => {
      this.createNote(note.line, note.time);
    });

    this.music = this.sound.add("song");
    this.music.play();
  }

  private createNote(noteLine: number, hitTime: number) {
    const x = LANES_X[noteLine];
    const y = -50;

    const circleNote = this.add.circle(x, y, 38, 0x00ffff);

    this.notes.push({
      line: noteLine,
      hitTime: hitTime,
      hit: false,
      circle: circleNote
    });
  }

  private handleHit(line: number) {
    const currentTime = this.time.now - this.startTime;

    const candidates = this.notes.filter(
      n => !n.hit && n.line === line
    );

    if (candidates.length === 0) return;

    const note = candidates.reduce((prev, curr) => {
      const prevDiff = Math.abs(prev.hitTime - currentTime);
      const currDiff = Math.abs(curr.hitTime - currentTime);
      return currDiff < prevDiff ? curr : prev;
    });

    const diff = Math.abs(currentTime - note.hitTime);

    if (diff <= 50) {
      this.combo++;
      this.showJudge("Perfect");
      this.score += 1000
      note.hit = true;
      note.circle.destroy();
    } else if (diff <= 120) {
      this.combo++;
      this.showJudge("Good");
      this.score += 500;
      note.hit = true;
      note.circle.destroy();
    } else {
      this.combo = 0;
      this.showJudge("Miss");
    }

    this.checkGameEnd();
  }

  private showJudge(text: string) {
    this.evaluateText.setText(text);
    this.showCombo();

    this.judgeTimer?.remove(false);

    this.judgeTimer = this.time.delayedCall(1000, () => {
      this.evaluateText.setText("");
    });
  }

  private showCombo() {
    if (this.combo > this.highCombo) this.highCombo = this.combo;
    if (this.combo <= 1) {
      this.comboText.setText("");
      return;
    }

    this.comboText.setText(`${this.combo} Combo`);
    if (this.combo % 50 === 0) {
        this.createComboBurst();
    }
  }

  private createComboBurst() {
    const burstImage = this.add.image(800, 300, 'burst01').setAlpha(0.5);;
    const burstAudio = this.sound.add("sound01");
    burstAudio.play();

    this.time.delayedCall(3000, () => {
      burstImage.destroy();
    })
  }

  private checkGameEnd() {
    const allDone = this.notes.every(n => n.hit);

    if (!allDone) return;

    setTimeout(() => {
      this.endGame();
    }, 3000);
  }

  private endGame() {
    this.cameras.main.fadeOut(800, 0, 0, 0);

    this.time.delayedCall(800, () => {
      this.music?.stop();
      this.scene.start("ResultScene", {
        score: this.score,
        combo: this.highCombo
      });

      this.score = 0;
      this.combo = 0;
      this.highCombo = 0;
    });
  }
}
