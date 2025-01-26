class Game extends Phaser.Scene {

    constructor() {
        super({ key: "game" });
    }

    timeEventCallback() {
        this.seconds--;
        this.timerText.setText('Time Left: ' + this.seconds);
        if (this.seconds === 0) {
            this.timedEvent.paused = true;
        }
    }

    init() {
        this.timer = 0;
        this.popCount = 0;
        this.bubblesSpawned = 0;
        this.leftWall = null;
        this.rightWall = null;
        this.pufferfish = null;
    }

    preload() {
        this.load.image('sea', 'assets/orig_big.png');
        this.load.image('bubble', 'assets/bubble.svg');
    }

    create() {

        this.add.image(400, 300, 'sea');

        this.pufferfish = new Pufferfish(this, 0, 0);

        this.seconds = 10
        this.timerText = this.add.text(window.innerWidth - 200, 10, 'Time Left: ' + this.seconds)
            .setStyle({ fontSize: 25 });
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.timeEventCallback, callbackScope: this, repeat: -1 });

        this.pauseButton = this.add.text(window.innerWidth - 200, 40, 'Pause', { fontSize: 25 }).setInteractive();

        this.label = this.add
            .text(10, 10, "Update-function-call-counter")
            .setOrigin(0)
            .setStyle({ fontSize: 25 });

        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.bubbles = this.add.group();

        const wallThickness = 20;
        const wallHeight = this.height + 500;

        this.matter.add.rectangle(-wallThickness / 2, wallHeight / 2, wallThickness, wallHeight, {
            restitution: 1,
            isStatic: true
        });

        this.matter.add.rectangle(this.width + wallThickness / 2, wallHeight / 2, wallThickness, wallHeight, {
            restitution: 1,
            isStatic: true
        });

        const scene = this;
        this.matter.world.on("collisionstart", function (event, bodyA, bodyB) {
            if (bodyA.label.startsWith("bubble ") && bodyB.label === "pufferfish") {
                bodyA.gameObject.destroy();
                scene.popCount++;
            } else if (bodyA.label === "pufferfish" && bodyB.label.startsWith("bubble ")) {
                bodyB.gameObject.destroy();
                scene.popCount++;
            }
        });

        this.pauseButton.on('pointerdown', function () {
            this.scene.launch('pause')
            this.scene.pause();
        }, this)

    }

    update(time, delta) {

        this.label.setText(`Pop Count: ${this.popCount}`);

        this.timer -= delta / 1000;
        if (this.timer < 0 && this.seconds > 0) {
            const bubble = new Bubble(
                this,
                Math.random() * this.width,
                this.height + 128,
                Math.random() * 5 - 2.5,
                Math.random() * 1.25 - 2.5,
                this.bubblesSpawned++
            );
            this.bubbles.add(bubble);
            this.timer++;
        }
        if (this.seconds == 0) {
            this.scene.start('restart', { score: this.popCount })
        }
    }

}

