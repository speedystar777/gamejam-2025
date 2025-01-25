console.log("Loading PoseNet")

const imageScaleFactor = 0.50;
const flipHorizontal = false;
const outputStride = 16;
const imageElement = document.getElementById('webcam');
const debugPos = document.getElementById('debugPos');

var debugPoints = []
for(var i = 0; i < 17; i++) {
    debugPoints[i] = debugPos.cloneNode(false);
    debugPos.parentNode.appendChild(debugPoints[i]);
    console.log("cloning debugPos");
}

posenet.load().then(function(net) {
    // posenet model loaded
    console.log("PoseNet model loaded");
    var intervalID = setInterval(myCallback, 100);

    function myCallback() {
        net.estimateSinglePose(imageElement, imageScaleFactor, flipHorizontal, outputStride).then(function(pose) {
            
            for(var i = 0; i < 17; i++) {
                var pos = pose.keypoints[i].position;
                debugPoints[i].style.top = 40 + (pos.y);
                debugPoints[i].style.left = 4 + (256-pos.x);
            }
        });
    }
});

