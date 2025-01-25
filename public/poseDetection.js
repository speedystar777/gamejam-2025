// helpful doc: https://github.com/llSourcell/pose_estimation/blob/master/README.md
console.log("Loading PoseNet")

const imageScaleFactor = 1;
const flipHorizontal = false;
const outputStride = 8;
const imageElement = document.getElementById('webcam');
const debugPos = document.getElementById('debugPos');
const LEFT_INDEX = 9;
const RIGHT_INDEX = 10;

const smoothing = 0.9;
var poseHistory = [];
var debugPoints = [];
for (var i = 0; i < 17; i++) {
    debugPoints[i] = debugPos.cloneNode(false);
    if (i == LEFT_INDEX) {
        debugPoints[i].style.backgroundColor = "#f00";
    }
    else if (i == RIGHT_INDEX) {
        debugPoints[i].style.backgroundColor = "#00f";
    }
    else {
        debugPoints[i].style.zIndex = -1;
    }
    debugPos.parentNode.appendChild(debugPoints[i]);
}
debugPos.remove();

posenet.load().then(function (net) {
    // posenet model loaded
    console.log("PoseNet model loaded");
    var intervalID = setInterval(myCallback, 16);

    function myCallback() {
        net.estimateSinglePose(imageElement, imageScaleFactor, flipHorizontal, outputStride).then(function (pose) {
            for (var i = 0; i < 17; i++) {
                var pos = pose.keypoints[i].position;
                const newX = window.innerWidth - ((pos.x / 256) * window.innerWidth);
                const newY = (pos.y / 256) * window.innerHeight;
                pos.x = newX;
                pos.y = newY;

                if (poseHistory.length < 17) {
                    poseHistory.push(pos);
                }
                else {
                    poseHistory[i].x = lerp(newX, poseHistory[i].x, smoothing);
                    poseHistory[i].y = lerp(newY, poseHistory[i].y, smoothing);
                }

                debugPoints[i].style.left = poseHistory[i].x;
                debugPoints[i].style.top = poseHistory[i].y;
            }
        });
    }
});

function lerp(a, b, t) {
    return a + (b - a) * t;
}

