class Restart extends Phaser.Scene {
  constructor() {
    super({ key: "restart" });
  }
  init(data) {
    this.finalScore = data.score;
    this.currentHighScore = data.currentHighScore;
  }
  preload() {
    this.load.image("sky", "assets/textures/orig_big.png");
    this.load.image("restart", "assets/textures/restart.png");
    this.load.audio("highScore", "assets/audio/highScore1__nomiqbomi__congrats-1.mp3");
  }
  create() {
    background(this);
    title(this, "Game Over");

    let newHighScore = this.currentHighScore;
    if (this.currentHighScore < this.finalScore) {
      newHighScore = this.finalScore;
      this.sound.play("highScore", {delay: 1});
    }

    content(this, `High Score: ${newHighScore}\nYour score was: ${this.finalScore}`, 50);
    controlsSelectionCreate(this);

    const restartScene = this.scene;
    button(this, "restart", () => restartScene.start("instructions", { highScore: newHighScore }));
  }

  update(){
    controlsSelectionUpdate(this);
  }
}
