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
    }

    update(time, delta) {
        this.timer -= delta / 1000;
        if (this.timer < 0) {
            const bubble = new Bubble(
                this,
                Math.random() * this.width,
                this.height + 128,
                Math.random() * 20 - 10,
                Math.random() * 5 - 10
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

