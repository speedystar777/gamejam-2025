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
    this.add.image(400, 300, 'sky');
    this.blackFade = this.add.rectangle(0, 0, window.innerWidth * 2, window.innerHeight * 2, 0);
    this.blackFade.setAlpha(0.5);
    controlsSelectionCreate(this);

    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;

    this.add.text(screenCenterX - 90, window.innerHeight / 2 - 100, 'PAUSED', { fontSize: 50, fontStyle: "bold" });


    const bg = this.add.image(0, 0, "resume");
    const container = this.add.container(screenCenterX, screenCenterY + 120, [
      bg,
    ]);

    container.setSize(bg.width, bg.height);
    container.setInteractive();

    container.on("pointerover", () => {
      bg.setTint(0x83d2e6);
    });
    container.on("pointerout", () => {
      bg.clearTint();
    });
    container.on("pointerdown", () => {
      this.scene.resume('game');
      this.scene.stop();
    });

    const restart = this.add.image(0, 0, "restart");
    const restartContainer = this.add.container(
      screenCenterX,
      screenCenterY + 250,
      [restart]
    );
    restartContainer.setSize(restart.width, restart.height);
    restartContainer.setInteractive();

    restartContainer.on("pointerover", () => {
      restart.setTint(0x83d2e6);
    });
    restartContainer.on("pointerout", () => {
      restart.clearTint();
    });
    restartContainer.on("pointerdown", () => {
      this.scene.start("game", { highScore: this.currentHighScore });
    });
  }

  update() {
    controlselectionUpdate(this);
  }
}