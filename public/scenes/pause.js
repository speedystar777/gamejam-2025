class Pause extends Phaser.Scene {
  constructor() {
    super({ key: "pause" });
  }
  preload() {
    this.load.image('sky', 'assets/orig_big.png');
    this.load.image('resume', 'assets/resume.png');
    this.load.image('restart', 'assets/restart.png');
  }

  init(data) {
    this.currentHighScore = data.currentHighScore;
  }

  create() {
    background(this);
    this.blackFade = this.add.rectangle(0, 0, window.innerWidth * 2, window.innerHeight * 2, 0);
    this.blackFade.setAlpha(0.5);
    controlsSelectionCreate(this);
    title(this, 'PAUSED');

    const pauseScene = this.scene;
    button(this, "resume", () => {
      pauseScene.resume('game');
      pauseScene.stop();
    });

    button(this, "restart", () => {
      pauseScene.start("game", { highScore: this.currentHighScore });
    }, 1);
  }

  update() {
    controlsSelectionUpdate(this);
  }
}