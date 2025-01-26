class BubbleVisual extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, target) {
        super(
            scene,
            x,
            y,
            `${target.getData("color")} bubble`
        );
        this.scene.add.existing(this);
        this.setData("target", target);
        this.setData("offset",
            new Phaser.Math.Vector2(target.body.centerOffset.x, target.body.centerOffset.y).subtract(
                new Phaser.Math.Vector2(this._displayOriginX, this._displayOriginY)
            ));
        this.addToUpdateList();
    }

    preUpdate(time, delta) {

        const target = this.getData("target");
        const offset = this.getData("offset");

        if (!target.body) {
            this.destroy();
            return;
        }

        const lastBounceTime = target.getData("lastBounceTime");

        if (lastBounceTime !== undefined) {
            const t = (time - lastBounceTime) / 1000;

            console.log(t);

            const scaleX = (0.1 * Math.sin(10 * t)) / (t * t * t + 1) + 1;
            const scaleY = 1 / scaleX;

            this.setScale(scaleX, scaleY);
        }

        this.x = target.body.position.x - offset.x;
        this.y = target.body.position.y - offset.y;
    }
}