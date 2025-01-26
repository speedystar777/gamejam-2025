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
    background(this);
    this.add.text(
      window.innerWidth / 2 - 250,
      window.innerHeight / 2 - 200,
      "Game Over!",
      { fontSize: 100, fontStyle: "bold" }
    );
    this.add.text(
      window.innerWidth / 2 - 250,
      window.innerHeight / 2 - 60,
      "High Score: " + `${this.finalScore > this.currentHighScore
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
    this.restartButton = this.add.text(
      window.innerWidth / 2 - 250,
      window.innerHeight / 2 + 60,
      "Click to restart",
      { fontSize: 30 }
    ).setInteractive();

    this.add.text(window.innerWidth / 2 - 150, window.innerHeight / 2 + 130, 'use mouse controls?', { fontSize: 20 })
    this.mouseYes = this.add.text(window.innerWidth / 2 + 100, window.innerHeight / 2 + 130, 'y', { fontSize: 20 }).setInteractive();
    this.mouseNo = this.add.text(window.innerWidth / 2 + 155, window.innerHeight / 2 + 130, 'n', { fontSize: 20 }).setInteractive();
  }

  update() {
    let newHighScore = this.currentHighScore;
    if (this.currentHighScore < this.finalScore) {
      newHighScore = this.finalScore;
    }
    this.restartButton.on(
      "pointerdown",
      function () {
        this.scene.start("game", { highScore: newHighScore });
      },
      this
    );

    this.mouseYes.on('pointerdown', function () {
      mouseControlsCheckbox.checked = true;
    }, this);

    this.mouseNo.on('pointerdown', function () {
      mouseControlsCheckbox.checked = false;
    }, this);
  }
}
