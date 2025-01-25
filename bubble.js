class Bubble extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, velocityX, velocityY) {
        super(scene.matter.world, x, y, "bubble");
        this.scene = scene;
        this.scene.add.existing(this);
        //this.addCollisions();
        this.setVelocity(velocityX, velocityY);
        this.setScale(0.25);
    }
}