var mic, soundFile;

// Visualizer variables
var amplitude;
var prevLevels = new Array(100);
var incre = 0;

// ML variables
const options = {probabilityThreshold: 0.7};
let classifier;
let resultP;
var textField = document.getElementById('outputtext');

function preload() {
	classifier = ml5.soundClassifier('SpeechCommands18w', options, modelReady);
}

function setup() {
  c = createCanvas(window.innerWidth, window.innerHeight);
  c.parent(document.getElementById('visualizer'));

  noStroke();
  noLoop();

  rectMode(CENTER);
  colorMode(HSB);

  mic = new p5.AudioIn();
  mic.start();

  //document.getElementById("modelFieldButton").addEventListener("click", loadNewModel);

  amplitude = new p5.Amplitude();
  amplitude.setInput(mic);
  amplitude.smooth(0.8);
}

function runNow() {
  console.log("Running visualizer.");
  loop();
}

function resizeAudioCanvas() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

function loadNewModel() {
  var model = document.getElementById('modelField').value;
  classifier = ml5.soundClassifier(model, options, modelReady);
}

function draw() {
  clear();
  fill(255, 10);

  if (getAudioContext().state !== 'running')
    getAudioContext().resume();

  var level = amplitude.getLevel();

  // rectangle variables
  var spacing = 10;
  var w = width/ (prevLevels.length * spacing);

  var minHeight = 2;
  var roundness = 20;

  prevLevels.push(level);
  prevLevels.splice(0, 1);

  for (var i = 0; i < prevLevels.length; i++) {

    var x = map(i, prevLevels.length, 0, width/2, width);
    var h = map(prevLevels[i], 0, 0.2, minHeight, height);

    var alphaValue = logMap(i, 0, prevLevels.length, 1, 250);

    var hueValue = map(h, minHeight, height, 200, 255);

    incre += 0.005;

    fill(incre % 360, 255, 255, alphaValue);

    if (incre > 360)
    incre = 0;

    rect(x, height/2, w, h);
    rect(width - x, height/2, w, h);
  }
} //End of draw()

function logMap(val, inMin, inMax, outMin, outMax) {

  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i] === 0) {
      arguments[i] = 0.0000000000000001;
    }
  }

  var minv = Math.log(outMin);
  var maxv = Math.log(outMax);

  var numerator = maxv - minv;
  var denom = inMax - inMin;

  if (denom === 0) {
    denom = 0.000000000001;
  }

  var scale = numerator / denom;

  return Math.exp(minv + scale*(val-inMin));
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