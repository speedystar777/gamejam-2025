console.log("Setting up webcam");

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            const video = document.createElement("video");
            video.autoplay = true;
            video.playsInline = true;
            video.muted = true;
            video.id = "webcam";
            video.width = 256;
            video.height = 256;
            video.style = "transform: scaleX(-1); position: absolute; top: 0px; right: 0px; z-index: -1;";
            video.srcObject = stream;
            document.body.append(video);
        })
        .catch(function (err0r) {
            console.log("Something went wrong!");
    });
}
