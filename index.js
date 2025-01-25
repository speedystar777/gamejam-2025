const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Game],
    physics: {
        default: "matter",
        matter: {
            gravity: {
                x: 0,
                y: -1,
            },
            debug: true,
            restingThresh: 0.004
        },
    },
    
};
const game = new Phaser.Game(config);