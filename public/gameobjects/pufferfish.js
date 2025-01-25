class Pufferfish extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, "bubble", null, { isStatic: true, shape: 'circle', label: 'pufferfish' });
        const puffer = this;
        this.scene = scene;
        this.scene.add.existing(this);

        scene.input.on('pointermove', function (pointer) {
            if (mouseControlsEnabled()) {
                puffer.x = pointer.position.x;
                puffer.y = pointer.position.y;
            }
        }, this);

        this.addToUpdateList();
    }

    preUpdate(time, delta) {
        if (!mouseControlsEnabled() && debugPoints != null) {
            this.x = getOffset(debugPoints[RIGHT_INDEX]).left;
            this.y = getOffset(debugPoints[RIGHT_INDEX]).top;
        }
    }
}