console.log("Loading PoseNet")

const imageScaleFactor = 0.50;
const flipHorizontal = false;
const outputStride = 16;
const imageElement = document.getElementById('webcam');
const debugPos = document.getElementById('debugPos');

posenet.load().then(function(net) {
    // posenet model loaded
    console.log("PoseNet model loaded");
    var intervalID = setInterval(myCallback, 100);

    function myCallback() {
        net.estimateSinglePose(imageElement, imageScaleFactor, flipHorizontal, outputStride).then(function(pose) {
            //console.log(pose)
            var pos = pose.keypoints[0].position;
            debugPos.style.top = -4 - (256-pos.y);
            debugPos.style.left = -4 + (256-pos.x);
        });
    }
});

