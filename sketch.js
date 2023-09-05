let s = 60, h = s*Math.sqrt(3)/2;

let palette1 = ["#abcd5e", "#14976b", "#2b67af", "#62b6de", "#f589a3", "#ef562f", "#fc8405", "#f9d531"];
let palette2 = ["#fffbe6", "#0f0f0f"];

let mySeed = 55826;
let detail = 25;

function setup() {
	createCanvas(500, 500, WEBGL);
	pixelDensity(6);
  noLoop();
  noStroke();
}

function draw() {
	background(palette2[0]);
	randomSeed(mySeed);
	
	let n = 3;
  for (let i = 1; i <= n; i++) {
    makeHexagon(0, 0, s*i, i);
  }
}

function triangleTile(x1, y1, x2, y2, x3, y3) {
	let xC = (x1+x2+x3)/3, yC = (y1+y2+y3)/3;
	let u = s/5;
	
	push();
	translate(xC, yC);
	rotate(random([0, TAU/3, 2*TAU/3]));
	translate(-xC, -yC);
	
	fill(random(random([palette1, palette2])));
	triangle(x1, y1, x2, y2, x3, y3);
	
	let theta = atan2(y3-y1, x3-x1);
	fill(palette2[1]);
	ellipse((x1+x2)/2, (y1+y2)/2, u, u, detail);
	ellipse((x2+x3)/2, (y2+y3)/2, u, u, detail);
	ellipse((x3+x1)/2, (y3+y1)/2, u, u, detail);
	arc(x1, y1, 6*u, 6*u, theta, theta+PI/3, PIE, detail);
	
	fill(palette2[0]);
	ellipse(x1, y1, 4*u, 4*u, detail);
	ellipse(x2, y2, 4*u, 4*u, detail);
	ellipse(x3, y3, 4*u, 4*u, detail);
	
	fill(random(palette1));
	ellipse(x1, y1, 2*u, 2*u, detail);
	fill(random(palette1));
	ellipse(x2, y2, 2*u, 2*u, detail);
	fill(random(palette1));
	ellipse(x3, y3, 2*u, 2*u, detail);
	
	pop();
}

function prop(xA, yA, xB, yB, t) {
  let xC = xA*(1-t) + xB*t;
  let yC = yA*(1-t) + yB*t;
  return [xC, yC];
}

function makeHexagon(x0, y0, r, nDivs) {
  let col = 0;
  
  push();
  translate(x0, y0);
  for (let i = 0; i < 6; i++) {
    let x1 = r*cos(4*TAU/6);
    let y1 = r*sin(4*TAU/6);
    for (let j = 0; j < 2*nDivs-1; j++) {
      if (j % 2 == 0) {
        triangleTile(x1, y1, x1+s/2, y1+h, x1+s, y1);
        x1 += s;
      } else {
        triangleTile(x1, y1, x1-s/2, y1+h, x1+s/2, y1+h);
      }
    }
    rotate(TAU/6);
  }
  pop();
}