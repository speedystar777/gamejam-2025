class BubbleVisual extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, target) {
        super(
            scene,
            x,
            y,
            `${target.getData("color")} bubble`
        );
        console.log(target.getData("color"));
        this.scene.add.existing(this);
        this.setData("target", target);
        this.addToUpdateList();
    }

    preUpdate(time, delta) {

        const target = this.getData("target");

        if (!target.body) {
            this.destroy();
            return;
        }

        this.x = target.body.position.x;
        this.y = target.body.position.y;

        console.log(target, this);

        const lastBounceTime = target.getData("lastBounceTime");

        if (lastBounceTime === undefined) {
            return;
        }

        //const scaleX = (1000 * Math.cos(this.bounceAnim)) / this.bounceAnim + 1;
        const scaleX = 1 + Math.sin(time) * 0.25;
        //const scaleY = 1 / scaleX;

        //console.log(this, {scaleX, scaleY});
        if (this.body) {
            //console.log("yes");
            this.setScale(scaleX, scaleY);
        } else {
            //console.log("no");
        }
    }
}