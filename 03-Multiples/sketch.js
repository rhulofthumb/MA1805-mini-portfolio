/*
  MA1805 / 03 Multiples — Everybody Is Buying
*/

// 1. I started by defining the same colours used in the other portfolio pieces + some others.
// The gold token repeats the incentive from Drawing, while the red identifies the shared source.
const COLOUR = {
  paper: "#efe8d8",
  charcoal: "#1f2020",
  gold: "#e0a637",
  goldDark: "#a96d1d",
  goldPale: "#ffe5a0",
  red: "#b9473d",
  connection: "#b7aea0",
};

// The layout of the bubbles are stored separately from their sizes and this is how I did it.
// left and top set the centre of the first bubble, while gapX and gapY control
// the spacing between them. COMMON_SOURCE stores the position and size of the red block below.
const APPARENT_CROWD = { left: 137, top: 110, gapX: 149, gapY: 114 },
  COMMON_SOURCE = { x: 360, y: 620, width: 100, height: 48 };

// On to the multiples part of the artwork. I have stored sixteen bubbles in one array, so they can share the
// same drawing code. Each object starts with a width and height. Its position will be added in setup().
// I first tried random sizes, but some bubbles still looked almost the same. I then chose these sizes individually,
// so no width or height is repeated. The sizes are mixed across the grid to suggest different people, rather than a growing sequence.
const bubbles = [
  { width: 132, height: 88 },
  { width: 96, height: 64 },
  { width: 116, height: 78 },
  { width: 82, height: 58 },
  { width: 104, height: 84 },
  { width: 128, height: 62 },
  { width: 88, height: 76 },
  { width: 120, height: 68 },
  { width: 112, height: 56 },
  { width: 80, height: 86 },
  { width: 130, height: 72 },
  { width: 100, height: 60 },
  { width: 92, height: 80 },
  { width: 124, height: 66 },
  { width: 108, height: 74 },
  { width: 84, height: 70 },
];

// 2. setup() runs only once. I used it to create the canvas and position the bubbles.
function setup() {
  // My canvas is 720 by 720. parent() places it inside the sketch container in my HTML.
  createCanvas(720, 720).parent("sketch");

  // The canvas pixel density is kept at 1, and the line joins and ends are rounded.
  // noLoop() stops draw() from repeating. No need to repeat here.
  pixelDensity(1);
  strokeJoin(ROUND);
  strokeCap(ROUND);
  noLoop();

  // This goes through the array and adds a centre position to each bubble.
  // "i" starts at zero and stops after the last array entry. bubbles.length is sixteen.
  //"i % 4" works out which column each bubble belongs in, repeating from 0 to 3.
  // "floor(i / 4)" works out which row it belongs in, also going from 0 to 3.
  // I then used these numbers and the spacing values to position all 16 bubbles in a 4 by 4 grid.
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].x = APPARENT_CROWD.left + (i % 4) * APPARENT_CROWD.gapX;
    bubbles[i].y = APPARENT_CROWD.top + floor(i / 4) * APPARENT_CROWD.gapY;
  }
}

// 3. draw() displays the artwork. Because I used noLoop(), it runs once and that is after setup().
function draw() {
  // I start with the paper background and set a thin, quieter colour for the connections.
  // I found that the order matters. Drawing the lines first allows the filled bubbles to cover them later.
  background(COLOUR.paper);
  stroke(COLOUR.connection);
  strokeWeight(1.25);

  // This loop goes through all 16 bubbles and draws a line connecting each one to the red block.
  // I used the bubble's position and size to work out where each line should end.
  for (const bubble of bubbles)
    line(
      COMMON_SOURCE.x,
      COMMON_SOURCE.y - COMMON_SOURCE.height / 2,
      bubble.x - 13,
      bubble.y + bubble.height / 2 + 17,
    );

  // 4. Here I loop through the same array to draw every bubble and its gold token.
  // They share one construction, but are different sizes due to the stored dimensions.
  for (const bubble of bubbles) {
    // Now I take the x, y, width and height values from each bubble.
    // JavaScript destructuring lets me use these values without writing bubble.x, bubble.y etc. each time.
    // x and y give me the centre of the bubble, while adding half its height to y finds the bottom edge. Nifty.
    const { x, y, width, height } = bubble,
      bottom = y + height / 2;

    // rect() starts at the top-left corner, so I subtract half the width and height from the centre.
    // I fill the body, add a charcoal outline, and round its corners by 14 pixels.
    fill(COLOUR.paper);
    stroke(COLOUR.charcoal);
    strokeWeight(3.5);
    rect(x - width / 2, y - height / 2, width, height, 14);

    // This is where I draw a triangle to create the speech tail. It uses the same colour as the body
    // and covers part of the lower outline. I have overlaped it by 3 pixels so there is no gap.
    noStroke();
    triangle(x - 26, bottom - 3, x - 13, bottom + 17, x + 2, bottom - 3);

    // To make the sides of the speech tail I drew two lines.
    // The triangle covers part of the bottom border, making the tail and bubble look like one shape.
    stroke(COLOUR.charcoal);
    line(x - 25, bottom, x - 13, bottom + 17);
    line(x - 13, bottom + 17, x - 1, bottom);

    // I decided to centre each token in its bubble, even though the bubbles are different sizes.
    strokeWeight(2.5);
    fill(COLOUR.goldDark);
    circle(x, y, 43);
    noStroke();
    fill(COLOUR.gold);
    circle(x, y - 1, 36);

    // I used noFill() to draw a pale ring inside the gold token without covering its colour.
    noFill();
    stroke(COLOUR.goldPale);
    strokeWeight(1.5);
    circle(x, y - 1, 29);

    // I finish the token with a pale four point emblem, taking that same symbol from the Drawing artwork.
    // beginShape() starts a custom shape made from the vertex positions below.
    noStroke();
    fill(COLOUR.goldPale);
    beginShape();

    // These first four vertices form the top and right parts of the emblem.
    vertex(x, y - 13);
    vertex(x + 3, y - 4);
    vertex(x + 12, y - 1);
    vertex(x + 3, y + 2);

    // These are the remaining vertices that form the bottom and left parts.
    // endShape(CLOSE) connects the last vertex back to the first.
    vertex(x, y + 11);
    vertex(x - 3, y + 2);
    vertex(x - 12, y - 1);
    vertex(x - 3, y - 4);
    endShape(CLOSE);
  }

  // 5. The red control block is drawn underneath the 16 speech bubbles.
  // I use its centre position and size to work out where the rectangle should go.
  fill(COLOUR.red);
  stroke(COLOUR.charcoal);
  strokeWeight(3.5);
  rect(
    COMMON_SOURCE.x - COMMON_SOURCE.width / 2,
    COMMON_SOURCE.y - COMMON_SOURCE.height / 2,
    COMMON_SOURCE.width,
    COMMON_SOURCE.height,
    3,
  );

  // THE FAT CONTROLLER gives the artwork its satirical identity.
  // The wording stays outside the block, leaving its red shape plain.
  noStroke();
  fill(COLOUR.charcoal);
  textFont("Arial");
  textSize(13);
  textAlign(CENTER, TOP);
  text(
    "THE FAT CONTROLLER",
    COMMON_SOURCE.x,
    COMMON_SOURCE.y + COMMON_SOURCE.height / 2 + 18,
  );
}
