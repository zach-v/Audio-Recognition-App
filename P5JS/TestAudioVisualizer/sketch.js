let mic, fft, displayArray, scale;

function setup() {
  createCanvas(400, 400);
  noFill();
  
  displayArray = new Array(20);
  
  scale = width / 10;

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.8, 1024);
  fft.setInput(mic);
}

function draw() {
  background(200);

  let spectrum = fft.analyze();

  getAudioContext().resume();
  
  let z = 0;

  for (j = 0; j < displayArray.length; j++) {
    if (j == 0)
      displayArray[0] = spectrum;
    else {
      displayArray[j] = reduce(displayArray[j - 1]);
    }
    
    stroke(map(j, 0, displayArray.length, 0, 200));
    
    beginShape();
    for (i = 2; i < displayArray[j].length; i++) {
      vertex(map(i, 0, displayArray.length, 0, width / 14),
             map(displayArray[j][i], 0, 255, (height / 2) + z, 0));
    }
    endShape();
    z += 10;
  }
}

function reduce(array) {
  let sender = new Array(array.length);
  for (i = 0; i < array.length; i++) {
    sender[i] = array[i] * 0.9;
  }
  return sender;
}
