class Pause extends Phaser.Scene {
  constructor() {
    super({ key: "pause" });
  }
  preload() {
    this.load.image('sky', 'assets/orig_big.png');
  }
  create() {
    this.add.image(400, 300, 'sky');
    this.blackFade = this.add.rectangle(0, 0, window.innerWidth * 2, window.innerHeight * 2, 0);
    this.blackFade.setAlpha(0.5);
    this.add.text(window.innerWidth / 2 - 75, window.innerHeight / 2 - 100, 'PAUSED', { fontSize: 50, fontStyle: "bold" });
    this.resumeButton = this.add.text(window.innerWidth / 2 - 75, window.innerHeight / 2 + 200, 'click to resume', { fontSize: 20 })
  }

  update() {
    this.input.on('pointerdown', function () {
      this.scene.resume('game');
      this.scene.stop();
    }, this)
  }
}