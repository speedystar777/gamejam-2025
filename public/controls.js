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