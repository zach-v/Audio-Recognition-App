// Shows current version of ml5
console.log('ml5 version:', ml5.version);

const options = {probabilityThreshold: 0.7};
const classifier = ml5.soundClassifier('SpeechCommands18w', options, modelReady);
/*
This is used for a custom model made with Google's Teachable Machine
const classifier = ml5.soundClassifier('path/to/model.json', modelReady);
*/


// P5 init function
function setup() {
	createCanvas(400,400);
}

// P5 draw loop
function draw() {
	background(100);
}

// method we reference to classify sound
function modelReady() {
	classifier.classify(gotResult);
}

function gotResult(error, result) {
	if (error) {
		console.log(error);
		return;
	}
	
	// log result
	console.log(result);
}