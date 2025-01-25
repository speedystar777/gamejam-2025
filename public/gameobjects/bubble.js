class Bubble extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, velocityX, velocityY, number) {
        super(scene.matter.world, x, y, "bubble", null, { shape: "circle", label: "bubble " + number });
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
    }

    preUpdate(time, delta) {
        if (this.y < -128) {
            this.destroy();
        } else {
            this.setIgnoreGravity(this.getVelocity().y < -1);
        }
    }
}