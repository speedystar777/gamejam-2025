class Restart extends Phaser.Scene {
  constructor() {
    super({ key: "restart" });
  }
  init(data) {
    this.finalScore = data.score;
  }
  preload() {
    this.load.image('sky', 'assets/orig_big.png');
  }
  create() {
    this.add.image(400, 300, 'sky');
    this.add.text(window.innerWidth / 2 - 250, window.innerHeight / 2 - 100, 'Game Over!', { fontSize: 50, fontStyle: "bold" });
    this.add.text(window.innerWidth / 2 - 250, window.innerHeight / 2 - 50, 'Your score was: ' + this.finalScore, { fontSize: 50, fontStyle: "bold" });
    this.add.text(window.innerWidth / 2 - 250, window.innerHeight / 2 + 50, 'Click to restart', { fontSize: 30 });
  }

  update() {
    this.input.on('pointerdown', function () {
      this.scene.start('game');
    }, this)
  }
}