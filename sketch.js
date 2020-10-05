// remixed landmark example from ml5 face api

let faceapi;
let video, video2;
let detections;

// by default all options are set to true
const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
}


function setup() {
    createCanvas(500, 375);
    // load up your video
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide(); // Hide the video element, and just show the canvas
    video2 = createCapture(VIDEO);
    video2.size(300, 225);
    video2.hide(); // Hide the video element, and just show the canvas
    faceapi = ml5.faceApi(video, detection_options, modelReady)
    textAlign(RIGHT);
}

function modelReady() {
    console.log('ready!')
    console.log(faceapi);
    faceapi.detect(gotResults);

}

function gotResults(err, result) {
    if (err) {
        console.log(err);
        return
    }
    // console.log(result)
    detections = result;

    
    background(220);
    // image(video, 0,0, width, height);
    if (detections) {
        if (detections.length > 0) {
            // console.log(detections)
            // drawBox(detections);
            drawLandmarks(detections);
        }

    }
    faceapi.detect(gotResults);
}

// function drawBox(detections){
//     for(let i = 0; i < detections.length; i++){
//         const alignedRect = detections[i].alignedRect;
//         const x = alignedRect._box._x
//         const y = alignedRect._box._y
//         const boxWidth = alignedRect._box._width
//         const boxHeight  = alignedRect._box._height
        
//         // noFill();
//         // stroke(161, 95, 251);
//         // strokeWeight(2);
//         // image(pumpkin, x, y-20, boxWidth+30, boxHeight);
//     }
    
// }

function drawLandmarks(detections){
    noFill();
    stroke(255, 251)
    strokeWeight(2)

    for(let i = 0; i < detections.length; i++){
        const mouth = detections[i].parts.mouth; 
        const nose = detections[i].parts.nose;
        const leftEye = detections[i].parts.leftEye;
        const rightEye = detections[i].parts.rightEye;
        const rightEyeBrow = detections[i].parts.rightEyeBrow;
        const leftEyeBrow = detections[i].parts.leftEyeBrow;



        fill("black");
        drawPart(mouth, true, 0,0);
        drawPart(nose, true, 0,0);
        drawPart(leftEye, true, 0,0);
        drawPart(rightEye, true, 0,0);
        drawPart(leftEyeBrow, true, 0,0);
        drawPart(rightEyeBrow, false, 0,0);

        let scale1 = 100;
        let scale2 = 100;
        drawPart(mouth, true, scale1,scale2);
        drawPart(nose, true, scale1,scale2);
        drawPart(leftEye, true, scale1,scale2);
        drawPart(rightEye, true, scale1,scale2);
        drawPart(leftEyeBrow, true, scale1,scale2);
        drawPart(rightEyeBrow, false, scale1,scale2);

        scale1 = -100;
        scale2 = -100;
        drawPart(mouth, true, scale1,scale2);
        drawPart(nose, true, scale1,scale2);
        drawPart(leftEye, true, scale1,scale2);
        drawPart(rightEye, true, scale1,scale2);
        drawPart(leftEyeBrow, true, scale1,scale2);
        drawPart(rightEyeBrow, false, scale1,scale2);

        scale1 = 100;
        scale2= -100;
        drawPart(mouth, true, scale1,scale2);
        drawPart(nose, true, scale1,scale2);
        drawPart(leftEye, true, scale1,scale2);
        drawPart(rightEye, true, scale1,scale2);
        drawPart(leftEyeBrow, true, scale1,scale2);
        drawPart(rightEyeBrow, false, scale1,scale2);

        scale1 = -100;
        scale2 = 100;
        drawPart(mouth, true, scale1,scale2);
        drawPart(nose, true, scale1,scale2);
        drawPart(leftEye, true, scale1,scale2);
        drawPart(rightEye, true, scale1,scale2);
        drawPart(leftEyeBrow, true, scale1,scale2);
        drawPart(rightEyeBrow, false, scale1,scale2);

    }

}

function drawPart(feature, closed,scaleX, scaleY){
    
    beginShape();
    for(let i = 0; i < feature.length; i++){
        const x = feature[i]._x + scaleX;
        const y = feature[i]._y + scaleY;
        vertex(x, y)
    }
    
    if(closed === true){
        endShape(CLOSE);
    } else {
        endShape();
    }
    
}