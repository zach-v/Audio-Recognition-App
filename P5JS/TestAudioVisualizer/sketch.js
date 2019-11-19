var mic, soundFile;
var amplitude;

var prevLevels = new Array(100);


function setup() {
  c = createCanvas(600, 400);
  background(0);
  noStroke();

  rectMode(CENTER);
  colorMode(RGB);

  mic = new p5.AudioIn();
  mic.start();


  amplitude = new p5.Amplitude();
  amplitude.setInput(mic);
  amplitude.smooth(0.8);
}

function draw() {
  background(20, 20);
  fill(255, 10);

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

    fill(hueValue, 255, 255, alphaValue);

    rect(x, height/2, w, h);
    rect(width - x, height/2, w, h);
  }
  
  
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
  

}