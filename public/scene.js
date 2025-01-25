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
    this.add.image(400, 300, "sky");

    const bubble = this.physics.add.image(500, 700, "bubble");

    bubble.setVelocity(-100, -100);
    this.test = this.add.sprite(200, 200, "bubble");

    this.label = this.add
      .text(10, 10, "Update-function-call-counter")
      .setScale(1.5)
      .setOrigin(0)
      .setStyle({ fontStyle: "bold", fontFamily: "Arial" });

    let graphics = this.make.graphics();
    graphics.fillStyle(0xff0000);
    graphics.fillRect(0, 0, 10, 10);
    graphics.generateTexture("red-box", 10, 10);

    this.group = this.add.group({
      defaultKey: "red-box",
      classType: CustomSprite,
      maxSize: 100,
      // activate update calls
      runChildUpdate: true,
    });

    this.group.create(Phaser.Math.RND.between(50, 200), 0);
  }

  update() {
    Phaser.Actions.IncY(this.group.getChildren(), 1);

    this.label.setText(`Pop Count: ${this.group.getChildren()[0].count}`);

    this.group.children.iterate((child) => {
      child.x = getOffset(debugPoints[RIGHT_INDEX]).left;
      child.y = getOffset(debugPoints[RIGHT_INDEX]).top;
    });
  }
}

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: Example,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: -100 },
    },
  },
};

const game = new Phaser.Game(config);
