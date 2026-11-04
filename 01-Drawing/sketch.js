/*
  MA1805 / 01 Drawing — No Strings Attached
*/

// 1. I started by defining the colours that will be used in the portfolio going forward.
const CANVAS_SIZE = 720,
  COLOUR = {
    paper: "#efe8d8",
    charcoal: "#1f2020",
    red: "#b9473d",
    green: "#4f9a4a",
    goldDark: "#a96d1d",
    gold: "#e0a637",
    goldPale: "#ffe5a0",
  };

// 2. setup() only runs once. I need a fixed canvas.
function setup() {
  const canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);

  // The p5 canvas is placed inside the sketch div in index.html.
  canvas.parent("sketch");

  // I keep the pixel density at 1 to keep pixels consistent across displays. I will only run "draw()" once hence "noLoop()".
  pixelDensity(1);
  noLoop();

  // To keep the hook looking continuous I use rounded joins and ends.
  strokeJoin(ROUND);
  strokeCap(ROUND);
}

// 3. The image starts with the background. This helps with layering.
function draw() {
  background(COLOUR.paper);

  // I first tested a single red dot here, but it did not communicate a clear idea. I changed it into a bullseye and vector
  // so the "system's" influence feels targeted. I used the short red line to connect the bullseye to the hook, keeping the target connected.
  noFill();
  stroke(COLOUR.red);
  strokeWeight(7);
  line(430, 70, 430, 100);

  // This loop draws the three bullseye circles using colour and diameter pairs. Each circle gets smaller.
  noStroke();
  for (const [colour, diameter] of [
    [COLOUR.red, 34],
    [COLOUR.paper, 21],
    [COLOUR.red, 9],
  ]) {
    fill(colour);
    circle(430, 54, diameter);
  }

  // The green triangle is drawn and enters from the top right and points into the bullseye.
  fill(COLOUR.green);
  triangle(430, 54, 482, 30, 454, 2);

  // Most of the hook needs to sit behind the token.
  noFill();
  stroke(COLOUR.charcoal);
  strokeWeight(28);
  circle(430, 116, 32);
  line(430, 132, 430, 486);
  arc(340, 486, 180, 194, 0, PI);

  // Here I use a paper colour circle to remove the middle of the eye, so it looks like a ring rather than a dot.
  noStroke();
  fill(COLOUR.paper);
  circle(430, 116, 12);

  // 4. I build the token in layers, starting with the outer rim.
  // I gave the darker gold circle a thick charcoal outline to give the token a clear edge.
  fill(COLOUR.goldDark);
  stroke(COLOUR.charcoal);
  strokeWeight(11);
  circle(360, 360, 330);

  // Can create a cool effect here, by placing the brighter gold circle slightly higher than the outer rim,
  // it gives the token a raised look. Found this a less complex way to "shade"
  fill(COLOUR.gold);
  noStroke();
  circle(360, 352, 305);

  // I added a pale gold ring inside the token.
  noFill();
  stroke(COLOUR.goldPale);
  strokeWeight(13);
  circle(360, 352, 246);

  // The token emblem uses coordinate pairs so the loop can place each point where it needs to be.
  fill(COLOUR.goldPale);
  stroke(COLOUR.goldDark);
  strokeWeight(7);
  beginShape();
  for (const [x, y] of [
    [360, 230],
    [388, 323],
    [486, 352],
    [388, 381],
    [360, 474],
    [332, 381],
    [234, 352],
    [332, 323],
  ]) {
    vertex(x, y);
  }

  // I used endShape(CLOSE) to join the final point back to the first.
  endShape(CLOSE);
  noStroke();
  fill(255, 245, 203, 150);
  ellipse(288, 255, 68, 30);

  // 5. I moved the hole down and away from the token's edge so it looks like a punched hole.
  // I used a circle with a circle inside to create this effect.
  noStroke();
  fill(COLOUR.charcoal);
  circle(430, 266, 64);
  fill(COLOUR.paper);
  circle(430, 266, 48);

  // I drew a short line inside the hole to make it look like the hook passes through the token.
  // I use square ends for this line, then switch back to rounded ends.
  stroke(COLOUR.charcoal);
  strokeWeight(28);
  strokeCap(SQUARE);
  line(430, 242, 430, 290);
  strokeCap(ROUND);

  // The fine gold circle makes the edge visible over the hook.
  noFill();
  stroke(COLOUR.goldDark);
  strokeWeight(5);
  circle(430, 266, 60);

  // At first I drew the entire hook in front of the token, but it looked a little disconnected or pasted on. I changed this so the hook looks
  // like it passes over, through and behind the token. This short line crosses the token's upper edge. I use square ends,
  // then switch back to rounded ends.
  noFill();
  stroke(COLOUR.charcoal);
  strokeWeight(28);
  strokeCap(SQUARE);
  line(430, 202, 430, 248);
  strokeCap(ROUND);

  // I used a Bézier curve to continue the lower bend of the hook.
  // It crosses the token's lower left edge to make the hook look connected.
  bezier(250, 486, 256, 438, 268, 389, 286, 356);

  // 6. Here I add the satirical title below the image.
  noStroke();
  fill(COLOUR.charcoal);
  textFont("Arial");
  textSize(13);
  textAlign(CENTER, CENTER);
  text("NO STRINGS ATTACHED", 360, 630);
}
