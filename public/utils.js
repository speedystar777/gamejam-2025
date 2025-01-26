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

function existsFmt(a) {
    if (a === undefined || a == null) {
        return a;
    } else {
        return "exists";
    }
}

function controlsSelectionCreate(scene) {
    scene.mouseControls = scene.add.text(window.innerWidth / 2 - 150, window.innerHeight / 2, 'mouse controls', { fontSize: 20 }).setInteractive();
    scene.cameraControls = scene.add.text(window.innerWidth / 2 + 150, window.innerHeight / 2, 'camera controls', { fontSize: 20 }).setInteractive();

    if (controller === "mouse") {
        scene.mouseControls.setTint(0xfc49dc);
        scene.cameraControls.clearTint();
    } else {
        scene.cameraControls.setTint(0xfc49dc);
        scene.mouseControls.clearTint();
    }
}

function controlselectionUpdate(scene) {
    scene.mouseControls.on('pointerdown', function () {
        setController("mouse");
        scene.mouseControls.setTint(0xfc49dc);
        scene.cameraControls.clearTint();
    }, this);

    scene.cameraControls.on('pointerdown', function () {
        setController("camera");
        scene.cameraControls.setTint(0xfc49dc);
        scene.mouseControls.clearTint();
    }, this);
}