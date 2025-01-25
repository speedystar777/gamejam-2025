console.log("uhm")

posenet.load().then(function (net) {
    // posenet model loaded
    console.log("posenet model loaded");
});

const mouseControlsCheckbox = document.getElementById("mouse-controls");
function mouseControlsEnabled() {
    return mouseControlsCheckbox.checked;
}

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
    };
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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