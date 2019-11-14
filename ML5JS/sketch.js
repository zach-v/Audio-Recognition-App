// Shows current version of ml5
console.log('ml5 version:', ml5.version);

const options = {probabilityThreshold: 0.7};
let classifier;
let resultP;
/*
This is used for a custom model made with Google's Teachable Machine
const classifier = ml5.soundClassifier('path/to/model.json', modelReady);
*/
let testCase1URL = 'https://teachablemachine.withgoogle.com/models/OwRCAdh-/' + 'model.json';
let soundModelURL = 'SpeechCommands18w';
function preload() {
	classifier = ml5.soundClassifier(testCase1URL, options, modelReady);
}

// P5 init function
function setup() {
	createCanvas(400,400);
	resultP = createP('waiting...');
	resultP.style('font-size','32pt');
}

// P5 draw loop
function draw() {
	text('Try saying these words!\n "zero" to "nine", "up", "down", "left",\n "right", "go", "stop", "yes", "no"', 0, height / 2);
	noDraw(true);
}

// method we reference to classify sound
function modelReady() {
	console.log('Model is ready to go.');
	classifier.classify(gotResult);
}

function gotResult(error, result) {
	if (error) {
		console.log('Something happened...');
		console.log(error);
		return;
	}
	
	// log result
	console.log(result[0].label, result[0].confidence);

	// display result in html
	resultP.html(`${result[0].label} : ${result[0].confidence}`);
}