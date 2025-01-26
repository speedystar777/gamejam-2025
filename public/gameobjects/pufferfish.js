class Pufferfish extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, "pufferfish", null, { isStatic: true, shape: 'circle', circleRadius: 50, label: 'pufferfish' });
        const puffer = this;
        puffer.setScale(0.50);
        this.scene = scene;
        this.scene.add.existing(this);

        scene.input.on('pointermove', function (pointer) {
            if (controller == "mouse") {
                puffer.x = pointer.position.x;
                puffer.y = pointer.position.y;
            }
        }, this);

        this.addToUpdateList();
    }

    preUpdate(time, delta) {
        if (controller === "camera" && debugPoints != null) {
            this.x = getOffset(debugPoints[RIGHT_INDEX]).left;
            this.y = getOffset(debugPoints[RIGHT_INDEX]).top;
        }
    }
}