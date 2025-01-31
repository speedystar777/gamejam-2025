class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }

  timeEventCallback() {
    this.seconds--;
    this.timerText.setText(
      "Time Left: " +
        (lang === "english" ? this.seconds : convertToSanskrit(this.seconds))
    );
    if (this.seconds === 0) {
      this.timedEvent.paused = true;
    }
  }

  init(data) {
    this.targetColor = selectRandom(colors);
    this.timer = 0;
    this.correctPopCount = 0;
    this.incorrectPopCount = 0;
    this.highScore = data?.highScore || 0;
    this.bubblesSpawned = 0;
    this.leftWall = null;
    this.rightWall = null;
    this.pufferfish = null;
  }

  preload() {
    this.load.image("sea", "assets/textures/orig_big.png");
    colors.forEach((color) => {
      this.load.image(`${color} bubble`, `assets/textures/${color}_bubble.png`);
    });
    this.load.json("shapes", "assets/physics_shapes.json");
    this.load.image("pufferfish", "assets/pufferfish.png");
    this.load.audio("bubblePop", "assets/audio/bubblePop.mp3");
    this.load.audio("bubbleSpawn", "assets/audio/bubbleSpawn.mp3");
    this.load.audio("gameEnding", "assets/audio/gameEnding.mp3");
    this.load.audio(
      "gameStart",
      "assets/audio/potentialGameStart_fupicat__congrats.mp3"
    );
  }

  create() {
    background(this);

    this.sound.play("gameStart");

    this.pufferfish = new Pufferfish(this, 0, 0);

    this.seconds = 45;
    this.timerText = this.add
      .text(window.innerWidth - 200, 10, "Time Left: " + this.seconds)
      .setStyle({
        ...textFormat,
        fontSize: 25,
      });

    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.timeEventCallback,
      callbackScope: this,
      repeat: -1,
    });

    this.pauseButton = this.add
      .text(window.innerWidth - 200, 40, "Pause", {
        ...textFormat,
        fontSize: 25,
      })
      .setInteractive();

    this.scoreLabel = this.add
      .text(10, 40, "Update-function-call-counter")
      .setOrigin(0)
      .setStyle({
        ...textFormat,
        fontSize: 25,
      });

    this.highScoreLabel = this.add
      .text(10, 10, "Update-function-call-counter")
      .setOrigin(0)
      .setStyle({
        ...textFormat,
        fontSize: 25,
      });

    this.colorLabel = this.add
      .text(
        screen.width / 2,
        10,
        `Pop ${
          lang == "english"
            ? this.targetColor
            : convertToSanskrit(
                sanskritColors[colors.indexOf(this.targetColor)]
              )
        } bubbles!`,
        {
          ...textFormat,
          fontSize: 25,
          stroke: this.targetColor,
        }
      )
      .setOrigin(0.5, 0);

    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    this.bubbles = this.add.group();

    const wallThickness = 20;
    const wallHeight = this.height + 500;

    this.matter.add.rectangle(
      -wallThickness / 2,
      wallHeight / 2,
      wallThickness,
      wallHeight,
      {
        restitution: 1,
        isStatic: true,
      }
    );

    this.matter.add.rectangle(
      this.width + wallThickness / 2,
      wallHeight / 2,
      wallThickness,
      wallHeight,
      {
        restitution: 1,
        isStatic: true,
      }
    );

    const scene = this;
    this.matter.world.on("collisionstart", function (event, bodyA, bodyB) {
      const bodyAIsBubble = bodyA.gameObject?.getData("bubble");
      const bodyBIsBubble = bodyB.gameObject?.getData("bubble");

      const bodyAIsPuffer = bodyA.gameObject?.getData("pufferfish");
      const bodyBIsPuffer = bodyB.gameObject?.getData("pufferfish");

      if (bodyAIsBubble && bodyBIsPuffer) {
        scene.pop(bodyA);
      } else if (bodyAIsPuffer && bodyBIsBubble) {
        scene.pop(bodyB);
      } else {
        if (bodyAIsBubble) {
          scene.bounce(bodyA);
        }
        if (bodyBIsBubble) {
          scene.bounce(bodyB);
        }
      }
    });

    this.pauseButton.on(
      "pointerdown",
      function () {
        this.scene.launch("pause", { currentHighScore: this.highScore });
        this.scene.pause();
      },
      this
    );
  }

  bounce(bubble) {
    bubble.gameObject.setData("lastBounceTime", this.timeStamp);
  }

  pop(bubble) {
    if (bubble.gameObject.getData("color") === this.targetColor) {
      this.correctPopCount++;
    } else {
      this.incorrectPopCount++;
    }
    bubble.gameObject.destroy();
    this.sound.play("bubblePop");
  }

  score() {
    return this.correctPopCount * 10 - this.incorrectPopCount * 3;
  }

  update(time, delta) {
    this.timeStamp = time;
    this.highScoreLabel.setText(
      `High Score: ${
        lang === "english" ? this.highScore : convertToSanskrit(this.highScore)
      }`
    );
    this.scoreLabel.setText(
      `Score: ${
        lang === "english" ? this.score() : convertToSanskrit(this.score())
      }`
    );
    this.colorLabel.setText(
      `Pop ${
        lang == "english"
          ? this.targetColor
          : convertToSanskrit(sanskritColors[colors.indexOf(this.targetColor)])
      } bubbles!`
    );

    this.timer -= delta / 1000;
    if (this.timer < 0 && this.seconds > 0) {
      const newBubblePos = new Phaser.Math.Vector2(
        this.width / 4 + (Math.random() * this.width) / 2,
        this.height + 256
      );

      let problem = false;
      this.bubbles.children.iterate((existingBubble) => {
        if (
          newBubblePos.distance(existingBubble.body.position) <
          this.width / 4
        ) {
          problem = true;
        }
      });

      if (!problem) {
        const bubble = new Bubble(
          this,
          newBubblePos.x,
          newBubblePos.y,
          Math.random() * 5 - 2.5,
          Math.random() * 1.25 - 2.5,
          this.bubblesSpawned++,
          Math.random() < 0.5 ? selectRandom(colors) : this.targetColor
        );
        const bubbleVisual = new BubbleVisual(
          this,
          newBubblePos.x,
          newBubblePos.y,
          bubble
        );
        this.sound.play("bubbleSpawn");
        this.bubbles.add(bubble);
        this.timer++;
      }
    }
    if (this.seconds == 0) {
      const score = this.score();
      this.sound.play("gameEnding");
      this.scene.start("restart", { currentHighScore: this.highScore, score });
    }

    //console.log(1 / (delta / 1000), "fps");
  }
}
