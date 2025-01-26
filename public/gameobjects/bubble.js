class Bubble extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, velocityX, velocityY, number, color) {
        super(
            scene.matter.world,
            x,
            y,
            `${color} bubble`,
            null,
            {
                shape: scene.cache.json.get('shapes')[`${color}_bubble`]
            }
        );

        this.setData("bubble", true);
        this.setData("color", color);

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
        this.setVisible(false);

        this.bounceAnim = 9999;
    }
    
    preUpdate(time, delta) {
        if (this.y < -256) {
            this.destroy();
        } else {
            this.setIgnoreGravity(this.getVelocity().y < -1);
        }
    }
}