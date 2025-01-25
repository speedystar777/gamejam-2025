import '@tensorflow/tfjs-backend-webgl';
import * as poseDetection from '@tensorflow-models/pose-detection';
console.log("helloo");
/*
const http = require('http');
const fs = require('fs');

const host = 'localhost';
const port = 8000;

const httpServer = http.createServer(httpHandler);

//const detector = await poseDetection.createDetector(poseDetection.SupportedModels.BlazePose, {runtime: 'tfjs'});

httpServer.listen(port, host, () => {
    console.log(`HTTP server running at http://${host}:${port}/`);
});

function httpHandler(req, res) {
    fs.readFile('./public/' + req.url, function (err, data) {
        if (err == null ) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        }
    });
}
*/
