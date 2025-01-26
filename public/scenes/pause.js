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
    this.add.text(window.innerWidth / 2 - 150, window.innerHeight / 2, 'use mouse controls?', { fontSize: 20 })
    this.mouseYes = this.add.text(window.innerWidth / 2 + 100, window.innerHeight / 2, 'y', { fontSize: 20 }).setInteractive();
    this.mouseNo = this.add.text(window.innerWidth / 2 + 155, window.innerHeight / 2, 'n', { fontSize: 20 }).setInteractive();
    this.resumeButton = this.add.text(window.innerWidth / 2 - 125, window.innerHeight / 2 + 100, 'click to resume', { fontSize: 30 }).setInteractive();
    this.restartButton = this.add.text(window.innerWidth / 2 - 50, window.innerHeight / 2 + 200, 'restart', { fontSize: 25 }).setInteractive();
  }

  update() {
    this.mouseYes.on('pointerdown', function () {
      mouseControlsCheckbox.checked = true;
    }, this);

    this.mouseNo.on('pointerdown', function () {
      mouseControlsCheckbox.checked = false;
    }, this);

    this.resumeButton.on('pointerdown', function () {
      this.scene.resume('game');
      this.scene.stop();
    }, this)

    this.restartButton.on('pointerdown', function () {
      this.scene.start('game');
      this.scene.stop();
    }, this)
  }
}