// helpful doc: https://github.com/llSourcell/pose_estimation/blob/master/README.md
console.log("Loading PoseNet")

const imageScaleFactor = 1;
const flipHorizontal = false;
const outputStride = 8;
const imageElement = document.getElementById('webcam');
const debugPos = document.getElementById('debugPos');

var debugPoints = []
for(var i = 0; i < 17; i++) {
    debugPoints[i] = debugPos.cloneNode(false);
    if(i == 9) {
        debugPoints[i].style.backgroundColor = "#f00";
    }
    else if(i == 10) {
        debugPoints[i].style.backgroundColor = "#00f";
    }
    if(i == 9 || i == 10) {
        debugPos.parentNode.appendChild(debugPoints[i]);
    }
    // debugPos.parentNode.appendChild(debugPoints[i]);
}
debugPos.remove();

posenet.load().then(function(net) {
    // posenet model loaded
    console.log("PoseNet model loaded");
    var intervalID = setInterval(myCallback, 33);

    function myCallback() {
        net.estimateSinglePose(imageElement, imageScaleFactor, flipHorizontal, outputStride).then(function(pose) {        
            // for(var i = 0; i < 17; i++) {
            //     var pos = pose.keypoints[i].position;
            //     const newX = (pos.x/256)*window.innerWidth;
            //     const newY = (pos.y/256)*window.innerHeight;
            //     debugPoints[i].style.top = newY; //40 + (pos.y);
            //     debugPoints[i].style.left = window.innerWidth - newX; //4 + (256-pos.x);
            // }
            for(var i = 9; i < 11; i++) {
                var pos = pose.keypoints[i].position;
                const newX = (pos.x/256)*window.innerWidth;
                const newY = (pos.y/256)*window.innerHeight;
                debugPoints[i].style.top = newY; 
                debugPoints[i].style.left = window.innerWidth - newX;
            }
        });
    }
});

