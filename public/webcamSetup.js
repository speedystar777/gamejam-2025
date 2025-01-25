console.log("Setting up webcam");

//setup webcam
// var video = document.querySelector("#webcam");



if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            // <video autoplay playsinline muted id="webcam" width="256" height="256" style="transform: scaleX(-1);"></video>
            const video = document.createElement("video");
            video.autoplay = true;
            video.playsInline = true;
            video.muted = true;
            video.id = "webcam";
            video.width = 256;
            video.height = 256;
            video.style = "transform: scaleX(-1);";
            video.srcObject = stream;
            document.body.append(video);
        })
        .catch(function (err0r) {
            console.log("Something went wrong!");
    });
}
