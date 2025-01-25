console.log("Setting up webcam");

//setup webcam
var video = document.querySelector("#webcam");

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            video.srcObject = stream;
        })
        .catch(function (error) {
            console.log(error, "\nSomething went wrong!");
    });
}