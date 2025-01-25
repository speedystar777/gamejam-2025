class Pufferfish extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, "bubble", null, {isStatic: true, shape: 'circle'});
        const puffer = this;
        scene.input.on('pointermove', function (pointer) {
            puffer.x = pointer.position.x;
            puffer.y = pointer.position.y;
        }, this);
    }
}