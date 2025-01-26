class Game extends Phaser.Scene {
    constructor() {
        super({ key: "game" });
    }

    timeEventCallback() {
        this.seconds--;
        this.timerText.setText("Time Left: " + this.seconds);
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
        this.load.image('sea', 'assets/orig_big.png');
        colors.forEach((color) => {
            this.load.image(`${color} bubble`, `assets/${color}_bubble.png`);
        });
        this.load.json('shapes', 'assets/physics_shapes.json');
    }

    create() {

        background(this);

        this.pufferfish = new Pufferfish(this, 0, 0);

        this.seconds = 10
        this.timerText = this.add.text(window.innerWidth - 200, 10, 'Time Left: ' + this.seconds)
            .setStyle({ fontSize: 25 });
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.timeEventCallback, callbackScope: this, repeat: -1 });

        this.pauseButton = this.add.text(window.innerWidth - 200, 40, 'Pause', { fontSize: 25 }).setInteractive();


        this.scoreLabel = this.add
            .text(10, 40, "Update-function-call-counter")
            .setOrigin(0)
            .setStyle({ fontSize: 25 });

        this.highScoreLabel = this.add
            .text(10, 10, "Update-function-call-counter")
            .setOrigin(0)
            .setStyle({ fontSize: 25 });

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

            if (bodyAIsBubble && bodyB.label === "pufferfish") {
                scene.pop(bodyA);
            } else if (bodyA.label === "pufferfish" && bodyBIsBubble) {
                scene.pop(bodyB);
            } else {
                if (bodyAIsBubble){
                    scene.bounce(bodyA);
                }
                if (bodyBIsBubble) {
                    scene.bounce(bodyB);
                }
            }
        });

        this.pauseButton.on('pointerdown', function () {
            this.scene.launch('pause')
            this.scene.pause();
        }, this)

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
    }

    score() {
        return this.correctPopCount * 10 - this.incorrectPopCount * 3;
    }

    update(time, delta) {
      this.timeStamp = time;
        this.highScoreLabel.setText(`High Score: ${this.highScore}`);
        this.scoreLabel.setText(`Score: ${this.score()}\nCurrent color: ${this.targetColor}`);

        this.timer -= delta / 1000;
        if (this.timer < 0 && this.seconds > 0) {

            const newBubblePos = new Phaser.Math.Vector2(
                this.width / 4 + Math.random() * this.width / 2,
                this.height + 256
            );

            let problem = false;
            this.bubbles.children.iterate((existingBubble) => {
                if (newBubblePos.distance(existingBubble.body.position) < this.width / 4) {
                    problem = true;
                }
            })

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
                const bubbleVisual = new BubbleVisual(this, newBubblePos.x, newBubblePos.y, bubble);
                this.bubbles.add(bubble);
                this.timer++;
            }
        }
        if (this.seconds == 0) {
            const score = this.score();
            this.scene.start('restart', { currentHighScore: this.highScore, score });
        }
    }

}
