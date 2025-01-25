class Game extends Phaser.Scene {

    constructor() {
        super({ key: "game" });
    }

    init() {
        this.timer = 0;
        this.leftWall = null;
        this.rightWall = null;
    }

    preload() {
        this.load.image("bubble", "assets/bubble.png");
    }

    create() {
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
    }

    update(time, delta) {
        this.timer -= delta / 1000;
        if (this.timer < 0) {
            const bubble = new Bubble(
                this,
                Math.random() * this.width,
                this.height + 128,
                Math.random() * 10 - 5,
                Math.random() * 2.5 - 5
            );
            this.bubbles.add(bubble);
            this.timer++;
        }
    }

    onBubbleBubbleCollision(bubbleA, bubbleB) {
        console.log("hit");
    }

    onBubbleWallCollision(bubble, wall) {
        console.log("hit");
    }
}

