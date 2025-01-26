const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [Start, Instructions, Game, Restart, Pause],
    physics: {
        default: "matter",
        matter: {
            gravity: {
                x: 0,
                y: -1,
            },
            restingThresh: 0.004,
            debug: true
        },
    }
};
const game = new Phaser.Game(config);