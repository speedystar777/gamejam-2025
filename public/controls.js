let controller = "mouse"; // "mouse" | "camera"
let cameraPending = false;

const video = document.getElementById('webcam');

if (!video) {
    throw "Video element not found";
}

function setController(newController) {
    if (controller === newController) {
        return;
    }

    controller = newController;

    if (controller === "camera" && !cameraPending && !cameraAvailable()) {
        if (navigator.mediaDevices.getUserMedia) {
            cameraPending = true;
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    console.log("Webcam setup successful");
                    video.srcObject = stream;
                })
                .catch(function (error) {
                    console.error(error, "\nSomething went wrong!");
                })
                .finally(function() {
                    cameraPending = false;
                });
        }
    }

    video.style.display = (controller === "mouse") ? "none" : null;
}

function cameraAvailable() {
    return !cameraPending && video.srcObject?.active && video.videoWidth && video.videoHeight;
}

function controlsSelectionCreate(scene, y = null){
    scene.mouseControls = scene.add.text(window.innerWidth / 2 - 150, y ?? (window.innerHeight / 2), 'mouse controls', { fontSize: 20 }).setInteractive().setOrigin(0.5);
    scene.cameraControls = scene.add.text(window.innerWidth / 2 + 150, y ?? (window.innerHeight / 2), 'camera controls\n(use right hand)', { fontSize: 20 }).setInteractive().setOrigin(0.5);

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