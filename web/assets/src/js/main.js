var s = function (p) {

  var x, y, px, py = 0;
  var halfWidth;
  var halfHeight;
  var noiseSeedX = 0.1;
  var noiseSeedY = 0.3;
  var c;
  p.setup = function () {

    c = p.createCanvas(window.innerWidth, window.innerHeight);
    p.noFill();
    p.stroke(255);
    p.colorMode(p.HSB);
    p.background(255);
    var halfWidth = p.width / 2;
    var halfHeight = p.height / 2;
  }

  p.draw = function () {
    p.fill(255, 10);
    p.noStroke();
    p.rect(0, 0, p.width, p.height);

    px = x;
    py = y;

    x = p.map(p.noise(noiseSeedX), 0, 1, 0, p.width);
    y = p.map(p.noise(noiseSeedY), 0, 1, 0, p.height);

    if (x >= p.width / 2 && p.frameCount % 30 == 0) {
      x = 0;
      y = p.height * Math.random(1);
    }

    p.stroke(p.map(p.dist(x, px, y, py), 0, 1000, 0, 255), 200, 200);
    var weight = p.dist(x, y, p.width / 3, p.height / 3);

    weight = p.map(weight, 0, 1000, 1, 1.9);
    p.strokeWeight(weight);

    drawLines(x, y, px, py);
    noiseSeedX += 0.01;
    noiseSeedY += 0.004;

  }

  drawLines = function (_x, _y, _px, _py) {
    p.line(_px, _py, _x, _y);

    p.line(p.width - _px, _py, p.width - _x, _y);

    p.line(_px, p.height - _py, x, p.height - _y);

    p.line(p.width - _px, p.height - _py, p.width - _x, p.height - _y);

  }

  p.mouseDragged = function () {
    p.stroke(100, 30, 200);
    x = p.mouseX;
    y = p.mouseY;
    px = p.pmouseX;
    py = p.pmouseY;
    drawLines(x, y, px, py);
  }

  p.keyPressed = function () {

    switch (p.keyCode) {

      case 32 :
      { // spacebar
        p.save("symetric_lines-" + p.frameCount + ".png");
        break;
      }
    }
  }
}


var myP5 = new p5(s, document.getElementById('p5'));
