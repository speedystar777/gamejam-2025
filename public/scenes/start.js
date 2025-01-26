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
    this.load.image("sky", "assets/textures/orig_big.png");
    this.load.image("start", "assets/textures/start.png");
    this.load.audio("bg-loop", "assets/audio/backgroundAmbianceSong1.mp3");
  }

  create() {
    background(this);
    var bgLoop = this.sound.add("bg-loop");
    bgLoop.setLoop(true);
    bgLoop.play();
    title(this, "Bubble Burst!");
    const startScene = this.scene;
    button(this, "start", () => startScene.start("instructions"));
  }
}
