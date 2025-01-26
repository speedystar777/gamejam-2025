class Restart extends Phaser.Scene {
  constructor() {
    super({ key: "restart" });
  }
  init(data) {
    this.finalScore = data.score;
    this.currentHighScore = data.currentHighScore;
  }
  preload() {
    this.load.image("sky", "assets/orig_big.png");
    this.load.image("restart", "assets/restart.png");
  }
  create() {
    background(this);
    title(this, "Game Over");

    let newHighScore = this.currentHighScore;
    if (this.currentHighScore < this.finalScore) {
      newHighScore = this.finalScore;
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
