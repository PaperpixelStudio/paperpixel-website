var s = function (p) {

  var y, py = 0;
  var x, px = 0;
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
    p.textFont("Helvetica ");

    x= px = c.width;
  }

  p.draw = function () {

    p.fill(255, 0.09);
    p.noStroke();
    p.rect(0, 0, p.width, p.height);

    px=x;
    py=y;

    if(p.mouseIsPressed){
      px = p.mouseX;
      py = p.mouseY;
    }

    x = p.width * p.noise(noiseSeedX);
    y = p.noise(noiseSeedY) * p.height;


    p.stroke(p.map(p.dist(px, py, p.width / 2, p.height / 2), 0, p.width, 0, 255), 200, 200, 0.5);

    var weight = p.dist(x, y, p.width / 2, p.height / 2);

    weight = p.map(weight, 0, halfWidth, 0.5, 8.0);

    p.strokeWeight(weight);

    drawLines(x, y, px, py);

    noiseSeedX -= 0.001;
    noiseSeedY += 0.009;

  }

  drawLines = function (_x, _y, _px, _py) {
    p.line(_px, _py, _x, _y);

    p.line(p.width - _px, _py, p.width - _x, _y);

    p.line(_px, p.height - _py, x, p.height - _y);

    p.line(p.width - _px, p.height - _py, p.width - _x, p.height - _y);

  }

  p.mouseDragged = function () {
    p.stroke(10, 0, 0, 0.1);
    x = p.mouseX;
    y = p.mouseY;
    px = p.sin(x*Math.PI)*-10* p.width;
    py = p.sin(y)* p.pmouseY;
    drawLines(x, y, px, py);
  }

  p.mouseReleased = function(){
    //p.background(255);
  }

  p.mousePressed = function(){
  }

  p.keyPressed = function () {

    switch (p.keyCode) {

      case 32 :
      { // spacebar
        p.stroke(0);
        p.fill(0);
        p.strokeWeight(0.7);
        p.text("Crafted with <3 by Paperpixel Studio", 10, p.height-20);

        p.save("paperpixel-studio-" + p.millis() + ".png");
        p.background(255);
        break;
      }
      default:{
        p.background(255);
      }
    }
  }
}


var myP5 = new p5(s, document.getElementById('p5'));
