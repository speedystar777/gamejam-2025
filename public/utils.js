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

    const screenCenterX =
        scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
    const screenCenterY =
        scene.cameras.main.worldView.y + scene.cameras.main.height / 2;

    scene.mouseControls = scene.add.text(screenCenterX - 150, screenCenterY + 50, 'mouse controls', {
        fontSize: 25,
        stroke: 'black',
        strokeThickness: 2
    }).setInteractive().setOrigin(0.5);

    scene.cameraControls = scene.add.text(screenCenterX+ 150, screenCenterY + 50, 'camera controls', {
        fontSize: 25,
        stroke: 'black',
        strokeThickness: 2
    }).setInteractive().setOrigin(0.5);

    if (controller === "mouse") {
        scene.mouseControls.setTint(0xfc49dc);
        scene.cameraControls.clearTint();
    } else {
        scene.cameraControls.setTint(0xfc49dc);
        scene.mouseControls.clearTint();
    }
}

function controlsSelectionUpdate(scene) {
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

function title(scene, text) {

    const screenCenterX =
        scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
    const screenCenterY =
        scene.cameras.main.worldView.y + scene.cameras.main.height / 2;

    scene.add
        .text(screenCenterX, screenCenterY - 150,
            text, {
            fontSize: 100,
            stroke: 'black',
            strokeThickness: 2,
        })
        .setOrigin(0.5);
}

function content(scene, text, fontSize = 25) {

    const screenCenterX =
        scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
    const screenCenterY =
        scene.cameras.main.worldView.y + scene.cameras.main.height / 2;

    scene.add
        .text(screenCenterX, screenCenterY - 37.5,
            text, {
            wordWrap: { width: scene.cameras.main.width / 2 },
            stroke: 'black',
            strokeThickness: 2,
            fontSize
        })
        .setOrigin(0.5);
}

function button(scene, texture, pointerDown, num = 0) {

    const screenCenterX =
        scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
    const screenCenterY =
        scene.cameras.main.worldView.y + scene.cameras.main.height / 2;

    const image = scene.add.image(0, 0, texture);
    const container = scene.add.container(screenCenterX, screenCenterY + 150 + num * 100, [
        image,
    ]);

    container.setSize(image.width, image.height);
    container.setInteractive();

    container.on("pointerover", () => {
        image.setTint(0x83d2e6);
    });
    container.on("pointerout", () => {
        image.clearTint();
    });
    container.on("pointerdown", pointerDown);
}