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
  noStroke();
  for (i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];
    var y = map(amp, 0, 256, height / 2, 0);
    var y2 = map(amp, 0, 256, 0, height / 2);
    fill(i, 255, 255);
    rect(i * w * 2 , height / 2, w - 3 ,(height / 2) - y);
    rect(i * w * 2 , height / 2, w - 3 ,-(y2));
  }

}

//displayArray
//transfer array from spectrum to displayArray(high frequencies)