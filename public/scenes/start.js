class Start extends Phaser.Scene {
  constructor() {
    super({ key: "start" });
  }

  // timeEventCallback() {
  //     this.seconds--;
  //     this.timerText.setText('Time Left: ' + this.seconds);
  //     if (this.seconds === 0) {
  //         this.timedEvent.paused = true;
  //     }
  // }

  init() {
    this.timer = 0;
    this.bubblesSpawned = 0;
    this.leftWall = null;
    this.rightWall = null;
    this.pufferfish = null;
  }

  preload() {
    this.load.image("sky", "assets/orig_big.png");
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

    this.startButton = this.add
      .text(screenCenterX, screenCenterY + 30, "Click to Start", {
        fontSize: 50,
      })
      .setOrigin(0.5);
    this.input.on("pointerdown", function () {
      this.scene.start('game');
    }, this);
  }

  // update(time, delta) {

  //     this.label.setText(`Pop Count: ${this.popCount}`);

  //     this.timer -= delta / 1000;
  //     if (this.timer < 0 && this.seconds > 0) {
  //         const bubble = new Bubble(
  //             this,
  //             Math.random() * this.width,
  //             this.height + 128,
  //             Math.random() * 5 - 2.5,
  //             Math.random() * 1.25 - 2.5,
  //             this.bubblesSpawned++
  //         );
  //         this.bubbles.add(bubble);
  //         this.timer++;
  //     }
  // }
}
