console.log("uhm")

const imageScaleFactor = 0.50;
const flipHorizontal = false;
const outputStride = 16;
const imageElement = document.getElementById('videoElement');
// load the posenet model
//const net = await posenet.load();
//const pose = await net.estimateSinglePose(imageElement, scaleFactor, flipHorizontal, outputStride);

posenet.load().then(function(net) {
    // posenet model loaded
    console.log("posenet model loaded");
    net.estimateSinglePose(imageElement, imageScaleFactor, flipHorizontal, outputStride).then(function(pose) {
        console.log(pose)
    });
});
