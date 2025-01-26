class Instructions extends Phaser.Scene {
  constructor() {
    super({ key: "instructions" });
  }

  init(data) {
    this.highScore = data.highScore;
  }

  preload() {
    this.load.image("sky", "assets/orig_big.png");
    this.load.image("start", "assets/start.png");
  }

  create() {
    background(this);
    title(this, "How to play");
    content(this, "Move your mouse (mouse controls) or your head (camera controls) to pop bubbles that match the specified color. Avoid bubbles of other colors.");
    controlsSelectionCreate(this);
    const insctructionsScene = this.scene;
    button(this, "start", () => insctructionsScene.start("game", { highScore: this.highScore }));
  }
  update() {
    controlsSelectionUpdate(this);
  }
}
