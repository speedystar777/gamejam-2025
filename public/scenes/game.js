class Game extends Phaser.Scene {

    constructor() {
        super({ key: "game" });
    }

    init() {
        this.targetColor = selectRandom(colors);
        this.timer = 0;
        this.correctPopCount = 0;
        this.incorrectPopCount = 0;
        this.bubblesSpawned = 0;
        this.leftWall = null;
        this.rightWall = null;
        this.pufferfish = null;
    }

    preload() {
        this.load.image('sky', 'assets/orig_big.png');
        colors.forEach((color) => {
            this.load.image(`${color} bubble`, `assets/${color} bubble.svg`);
        });
    }

    create() {

        this.add.image(400, 300, 'sky');

        this.pufferfish = new Pufferfish(this, 0, 0);

        this.label = this.add
            .text(10, 10, "Update-function-call-counter")
            .setScale(1.5)
            .setOrigin(0)
            .setStyle({ fontStyle: "bold", fontFamily: "Arial" });

        

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
                scene.pop(bodyA);
            } else if (bodyA.label === "pufferfish" && bodyB.label.startsWith("bubble ")) {
                scene.pop(bodyB);
            } else {
                if (bodyA.label.startsWith("bubble ")){
                    bodyA.gameObject.startBounceAnim();
                }
                if (bodyB.label.startsWith("bubble ")) {
                    bodyB.gameObject.startBounceAnim();
                }
            }
        });
          
    }

    pop(bubble){
        console.log(bubble);
        if (bubble.label.endsWith(` (${this.targetColor})`)) {
            this.correctPopCount++;
        } else {
            this.incorrectPopCount++;
        }
        bubble.gameObject.destroy();
    }

    update(time, delta) {

        this.label.setText(`Target color: ${this.targetColor}; Correct bubbles popped: ${this.correctPopCount}; Incorrect bubbles popped: ${this.incorrectPopCount}`);

        this.timer -= delta / 1000;
        if (this.timer < 0) {

            const newBubblePos = new Phaser.Math.Vector2(Math.random() * this.width, this.height + 128);

            let problem = false;
            this.bubbles.children.iterate((existingBubble) => {
                console.log(existingBubble);
                if (newBubblePos.distance(existingBubble.body.position) < 256) {
                    problem = true;
                }
            })
            
            if (!problem){
                const bubble = new Bubble(
                    this,
                    newBubblePos.x,
                    newBubblePos.y,
                    Math.random() * 5 - 2.5,
                    Math.random() * 1.25 - 2.5,
                    this.bubblesSpawned++,
                    selectRandom(colors)
                );
                this.bubbles.add(bubble);
                this.timer++;
            }
        }
    }
}

