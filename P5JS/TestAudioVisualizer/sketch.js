let mic, fft;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  noFill();
  colorMode(RGB, 255, 255, 255, 1);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.7, 64);
  fft.setInput(mic);
  w = width / 64;
}

function draw() {
  background(0);
  let spectrum = fft.analyze();
  stroke(255);
  beginShape();
  noStroke();
  for (i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];
    var y = map(amp, 0, 256, height, 0);
    fill(i, 255, 255);
    rect(i * w * 2 , y, w - 3 ,height - y);
  }
  endShape();
}
