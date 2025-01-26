const mouseControlsCheckbox = document.getElementById("mouse-controls");
function mouseControlsEnabled() {
    return mouseControlsCheckbox.checked;
}

function getOffset(el) {
    const rect = el?.getBoundingClientRect();
    return {
        left: rect?.left + window.scrollX,
        top: rect?.top + window.scrollY,
    };
}

function selectRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const colors = ["blue", "green", "purple", "red", "yellow"];

function background(scene) {

    const backgroundWidth = 2304;
    const backgroundHeight = 1296;

    scene.background = scene.add.image(scene.sys.canvas.width / 2, scene.sys.canvas.height / 2, "sky");
    scene.background.setOrigin(0.5, 0.5);

    if (scene.sys.canvas.width * backgroundHeight > scene.sys.canvas.height * backgroundWidth) {
        scene.background.displayWidth = scene.sys.canvas.width;
        scene.background.displayHeight = scene.sys.canvas.width * backgroundHeight / backgroundWidth;
    } else {
        scene.background.displayWidth = scene.sys.canvas.height * backgroundWidth / backgroundHeight;
        scene.background.displayHeight = scene.sys.canvas.height;
    }
}
