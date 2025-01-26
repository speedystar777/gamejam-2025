class Start extends Phaser.Scene {
  constructor() {
    super({ key: "start" });
  }

  init() {
    this.timer = 0;
    this.bubblesSpawned = 0;
    this.leftWall = null;
    this.rightWall = null;
    this.pufferfish = null;
  }

  preload() {
    this.load.image("sky", "assets/orig_big.png");
    this.load.image("start", "assets/start.png");
  }

  create() {
    background(this);

    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.add
      .text(screenCenterX, screenCenterY - 100, "Bubble Burst!", {
        fontSize: 100,
      })
      .setOrigin(0.5);

    this.add.text(window.innerWidth / 2 - 150, screenCenterY - 15, 'use mouse controls?', { fontSize: 20 })
    this.mouseYes = this.add.text(window.innerWidth / 2 + 105, screenCenterY - 15, 'y', { fontSize: 20 }).setInteractive();
    this.mouseNo = this.add.text(window.innerWidth / 2 + 155, screenCenterY - 15, 'n', { fontSize: 20 }).setInteractive();
    
    const bg = this.add.image(0, 0, "start");
    const container = this.add.container(screenCenterX, screenCenterY + 100, [
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
      this.scene.start("game");
    });
  }
  update(){
    this.mouseYes.on('pointerdown', function () {
      mouseControlsCheckbox.checked = true;
      this.mouseYes.setTint(0xfc49dc);
      this.mouseNo.clearTint();
    }, this);

    this.mouseNo.on('pointerdown', function () {
      mouseControlsCheckbox.checked = false;
      this.mouseNo.setTint(0xfc49dc);
      this.mouseYes.clearTint();
    }, this);
  }
}
