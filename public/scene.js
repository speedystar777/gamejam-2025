class Example extends Phaser.Scene {
  preload() {

    this.load.image('sky', 'assets/orig_big.png');
    this.load.image('bubble', 'assets/bubble.svg');
  }

  create() {
    this.add.image(400, 300, 'sky');

    const bubble = this.physics.add.image(500, 700, 'bubble');

    bubble.setVelocity(-100, -100);

  }
}

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: Example,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: -100 }
    }
  }
};

const game = new Phaser.Game(config);