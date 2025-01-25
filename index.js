const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Game],
    physics: {
        default: "matter",
        matter: {
            setBounds: {
                x: 0,
                y: -250,
                width: 640,
                height: 480 + 500,
                thickness: 64,
            },
            gravity: {
                x: 0,
                y: 0,
            }
        },
    },
    
};
const game = new Phaser.Game(config);