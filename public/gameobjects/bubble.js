class Bubble extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, velocityX, velocityY, number, color) {
        super(
            scene.matter.world,
            x,
            y,
            `${color} bubble`,
            null,
            {
                shape: "circle",
                label: "bubble " + number + ` (${color})`
            }
        );
        //this.setScale(0.5, 1);
        this.scene = scene;
        this.scene.add.existing(this);
        this.setVelocity(velocityX, velocityY);
        this.setFrictionAir(0);
        this.setBounce(1);
        this.addToUpdateList();
        this.setFixedRotation();
        this.setFriction(0);
        this.setFrictionStatic(1);
        this.setIgnoreGravity(true);

        this.bounceAnim = 9999;
    }

    startBounceAnim(){
        this.bounceAnim = 0;
    }

    preUpdate(time, delta) {
        if (this.y < -128) {
            this.destroy();
        } else {
            this.setIgnoreGravity(this.getVelocity().y < -1);
        }

        this.bounceAnim += delta;

        const scaleX = (0.1 * Math.sin(this.bounceAnim)) / this.bounceAnim + 1;
        const scaleY = 1 / scaleX;

        console.log(this, {scaleX, scaleY});
        this.setScale(scaleX, scaleY);
    }
}