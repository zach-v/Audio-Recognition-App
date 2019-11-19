// Shows current version of ml5
console.log('ml5 version:', ml5.version);

const options = {probabilityThreshold: 0.7};
let classifier;
let resultP;
/*
This is used for a custom model made with Google's Teachable Machine
const classifier = ml5.soundClassifier('path/to/model.json', modelReady);
*/

// Output text field for sound classifier
var textField = document.getElementById('outputtext');

function preload() {
	classifier = ml5.soundClassifier('SpeechCommands18w', options, modelReady);
}

// P5 init function
function setup() {
	noCanvas();
	noLoop();
}

// P5 draw loop
function draw() {

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

	// Update text field
	textField.innerText = `${result[0].label} \n ${Number((result[0].confidence*100).toFixed(1))}%`;
	textField.style.bottom = 30 + 'px';
}
