// Shows current version of ml5
console.log('ml5 version:', ml5.version);

let poseNet;
const options = {minConfidence: 0.5, maxPoseDetections: 5, architecture: 'MobileNetV1',};
let video;

let poses = [];

// P5 init function
function setup() {
	createCanvas(640,480);
	
	video = createCapture(VIDEO);
	video.size(width, height);
	video.hide();

	poseNet = ml5.poseNet(video, options, modelReady);
	poseNet.on("pose", gotResult);
	
}

// P5 draw loop
function draw() {
	image(video, 0, 0);

	if (poses.length > 0) {
		drawKeypoints();
		drawSkeleton();
	}
}

function modelReady() {
	console.log('Model is ready to go.');
}

function gotResult(result) {
	// log result
	//console.log(result);
	poses = result;
}

function drawKeypoints()  {
	// Loop through all points in array
	for (let i = 0; i < poses.length; i++) {
		let pose = poses[i].pose;
		for (let j = 0; j < pose.keypoints.length; j++) {
			let keypoint = pose.keypoints[j];
			// On probability bigger than 0.2, draw
			if (keypoint.score > 0.2) {
				fill(255, 0, 0);
				noStroke();
				ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
			}
		}
	}
}

function drawSkeleton() {
	// Loop through all the skeletons detected
	for (let i = 0; i < poses.length; i++) {
		let skeleton = poses[i].skeleton;
		for (let j = 0; j < skeleton.length; j++) {
			let partA = skeleton[j][0];
			let partB = skeleton[j][1];
			stroke(255, 0, 0);
			line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
		}
	}
}