class CustomSprite extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.setTexture("red-box");
    this.setPosition(x, y);
    this.count = 0;
  }

  update(time, delta) {
    this.count++;
  }
}

class ScoreTracker {
  constructor() {
    this.score = 0;
    this.highScore = 0;
  }

  update() {
    this.score++;
  }
}

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}

class Example extends Phaser.Scene {
  preload() {
    this.load.image("sky", "assets/orig_big.png");
    this.load.image("bubble", "assets/bubble.svg");
  }

  create() {
    this.scoreTracker = new ScoreTracker();
    this.add.image(400, 300, "sky");

    this.bubble = this.physics.add.image(500, 700, "bubble");

    this.bubble.setVelocity(-100, -100);

    this.label = this.add
      .text(10, 10, "Update-function-call-counter")
      .setScale(1.5)
      .setOrigin(0)
      .setStyle({ fontStyle: "bold", fontFamily: "Arial" });

    let graphics = this.make.graphics();
    graphics.fillStyle(0xff0000);
    graphics.fillRect(0, 0, 10, 10);
    graphics.generateTexture("red-box", 10, 10);

    this.popper = this.physics.add.group({
      defaultKey: "red-box",
      classType: CustomSprite,
      maxSize: 100,
      // activate update calls
      runChildUpdate: true,
    });

    this.popper.create(Phaser.Math.RND.between(50, 200), 0);
  }

  update() {
    // Phaser.Actions.IncY(this.popper.getChildren(), 1);

    this.popper.children.iterate((child) => {
      child.x = getOffset(debugPoints[RIGHT_INDEX]).left;
      child.y = getOffset(debugPoints[RIGHT_INDEX]).top;
    });

    this.physics.overlap(this.popper.getChildren()[0], this.bubble, (_, bubble) => {
      bubble.destroy();
      this.scoreTracker.update();
    });

    this.label.setText(`Pop Count: ${this.scoreTracker.score}`);
  }
}

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: "phaser-example",
  physics: {
    default: "arcade",
    arcade: {
      // debug: true,
      gravity: { y: -100 },
    },
  },
  scene: Example,
};

const game = new Phaser.Game(config);
