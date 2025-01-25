// helpful doc: https://github.com/llSourcell/pose_estimation/blob/master/README.md
console.log("Loading PoseNet")

const imageScaleFactor = 0.2;
const flipHorizontal = false;
const outputStride = 32;
const imageElement = document.getElementById('webcam');
const debugPos = document.getElementById('debugPos');

if (imageElement) { // imageelement is falsey when there is no webcam
    var debugPoints = []
    for (var i = 0; i < 17; i++) {
        debugPoints[i] = debugPos.cloneNode(false);
        if (i == 9) {
            debugPoints[i].style.backgroundColor = "#f00";
        }
        else if (i == 10) {
            debugPoints[i].style.backgroundColor = "#00f";
        }
        debugPos.parentNode.appendChild(debugPoints[i]);
    }
    debugPos.remove();

    posenet.load().then(function (net) {
        // posenet model loaded
        console.log("PoseNet model loaded");
        var intervalID = setInterval(myCallback, 33);

        function myCallback() {
            net.estimateSinglePose(imageElement, imageScaleFactor, flipHorizontal, outputStride).then(function (pose) {

                for (var i = 0; i < 17; i++) {
                    var pos = pose.keypoints[i].position;
                    debugPoints[i].style.top = 40 + (pos.y);
                    debugPoints[i].style.left = 4 + (256 - pos.x);
                }
            });
        }
    });
}
