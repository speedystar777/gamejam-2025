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
    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.add.text(
      screenCenterX - 280,
      screenCenterY - 200,
      "Game Over!",
      { fontSize: 100, fontStyle: "bold" }
    );
    this.add.text(
      screenCenterX - 275,
      screenCenterY - 75,
      "High Score: " +
      `${this.finalScore > this.currentHighScore
        ? (lang === 'english' ? this.finalScore : convertToSanskrit(this.finalScore))
        : (lang === 'english' ? this.currentHighScore : convertToSanskrit(this.currentHighScore))
      }`,
      { fontSize: 50, fontStyle: "bold" }
    );

    this.add.text(
      screenCenterX - 275,
      screenCenterY - 25,
      "Your score was: " + (lang === 'english' ? this.finalScore : convertToSanskrit(this.finalScore)),
      { fontSize: 50, fontStyle: "bold" }
    );

    controlsSelectionCreate(this, screenCenterY + 50);

    const bg = this.add.image(0, 0, "restart");
    const container = this.add.container(
      screenCenterX,
      screenCenterY + 150,
      [bg]
    );

    let newHighScore = this.currentHighScore;
    if (this.currentHighScore < this.finalScore) {
      newHighScore = this.finalScore;
    }

    container.setSize(bg.width, bg.height);
    container.setInteractive();

    container.on("pointerover", () => {
      bg.setTint(0x83d2e6);
    });
    container.on("pointerout", () => {
      bg.clearTint();
    });
    container.on("pointerdown", () => {
      this.scene.start("game", { highScore: newHighScore });
    });

  }

  update() {
    controlselectionUpdate(this);
  }
}
