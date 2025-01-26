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
    title(this, "Bubble Burst!");
    const startScene = this.scene;
    button(this, "start", () => startScene.start("instructions"));
  }
}
