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
  }
  create() {
    this.add.image(400, 300, "sky");
    this.add.text(
      window.innerWidth / 2 - 250,
      window.innerHeight / 2 - 200,
      "Game Over!",
      { fontSize: 100, fontStyle: "bold" }
    );
    this.add.text(
      window.innerWidth / 2 - 250,
      window.innerHeight / 2 - 60,
      "High Score: " + `${
          this.finalScore > this.currentHighScore
            ? this.finalScore
            : this.currentHighScore
        }`,
      { fontSize: 50, fontStyle: "bold" }
    );
    this.add.text(
      window.innerWidth / 2 - 250,
      window.innerHeight / 2 - 15,
      "Your score was: " + this.finalScore,
      { fontSize: 50, fontStyle: "bold" }
    );
    this.add.text(
      window.innerWidth / 2 - 250,
      window.innerHeight / 2 + 60,
      "Click to restart",
      { fontSize: 30 }
    );
  }

  update() {
    let newHighScore = this.currentHighScore;
    if (this.currentHighScore < this.finalScore) {
      newHighScore = this.finalScore;
    }
    this.input.on(
      "pointerdown",
      function () {
        this.scene.start("game", { highScore: newHighScore });
      },
      this
    );
  }
}
