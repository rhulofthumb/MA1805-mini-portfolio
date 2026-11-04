/*
  MA1805 / 02 Movement — Running Out of Time
*/

// 1. I started by defining the same colours used in the other portfolio pieces.
const COLOUR = {
  paper: "#efe8d8",
  charcoal: "#1f2020",
  red: "#b9473d",
  glass: "#f7f1e5",
  goldDark: "#a96d1d",
  gold: "#e0a637",
  goldPale: "#ffe5a0",
};

// I have stored the points needed to draw my hourglass in one array, allowing me to reuse the same shape twice.
// Each [x, y] pair gives a position, and together they outline the top, narrow middle and bottom of the hourglass.
const DEADLINE_VESSEL = [
  [250, 164],
  [470, 164],
  [470, 202],
  [372, 346],
  [372, 374],
  [470, 518],
  [470, 556],
  [250, 556],
  [250, 518],
  [348, 374],
  [348, 346],
  [250, 202],
];

// 2.Here the cycle is set to twelve seconds and lets 85% of the sand move before it resets.
// At first MAX_TRANSFER was 0.975, leaving only 2.5% of the sand area above. It wasn't an obvious premature reset,
// so did not really capture the effect that I wanted. I changed it to 0.85 to leave around 15% and make
// the premature reset clearer. Earlier setting was: const MAX_TRANSFER = 0.975
//
// This was actually fairly complex from a mathematics point of view. (For me anyway)
// The upper chamber widens from a half width (the distance from the centre to one side) of 12 to 110 over 144 units of height.
// SAND_SLOPE is therefore 98 / 144. It tells me how much the half width grows per unit of height.
// I start with a sand height of 138. The trapezoid area is average width multiplied by height, which expands
// to 24 * height + slope * height squared. "** 2 means squared". These values stay the same, so I calculate the starting area once.
const CYCLE_SECONDS = 12,
  MAX_TRANSFER = 0.85,
  SAND_SLOPE = 98 / 144,
  INITIAL_SAND_AREA = 24 * 138 + SAND_SLOPE * 138 ** 2;

// Remembering the cycle's time, whether the words are visible,
// and how long is left until they change. true means visible, while false hides them.
let elapsedSeconds = 0,
  signVisible = true,
  signSecondsRemaining = 0;

// 3. setup() runs once. Here I create the canvas and set drawing styles that are shared.
function setup() {
  // Im using a 720 by 720 canvas inside the sketch container. I have used pixel density 1
  // so the drawing resolution stays consistent on different displays. Perhaps overkill but I like it.
  createCanvas(720, 720).parent("sketch");
  pixelDensity(1);

  // Line joins and ends are rounded here, then Arial is set for both pieces of text.
  // random() chooses the first short blink interval between 0.2 and 0.4 seconds.
  strokeJoin(ROUND);
  strokeCap(ROUND);
  textFont("Arial");
  signSecondsRemaining = random(0.2, 0.4);

  // This gives the canvas a description for people using a screen reader. Again, perhaps unnecessary here but
  // I thought it was a good way to get a description of the artwork into the code itself.
  describe(
    'An erratic blinking red "OFFER ENDS SOON" sign sits above an hourglass, the caption "LAST CHANCE. AGAIN" sits below it as satirical commentary. Gold sand drains from upper to lower. While a visible reserve remains, the sand instantly returns to the top and the same deadline begins again.',
  );
}

// 4. draw() runs repeatedly and updates the timer before drawing each new frame.
function draw() {
  // Here I convert deltaTime from milliseconds to seconds. The timer is essential,
  // while min(..., 0.1) is a safeguard that limits jumps after a pause or tab switch.
  // The old time is also remembered so I can check whether the cycle has restarted.
  const step = min(deltaTime / 1000, 0.1),
    previousSeconds = elapsedSeconds;

  // % gives the remainder. For example, 12.02 % 12 becomes 0.02.
  // I use this to jump back to the beginning instead of turning the hourglass over.
  // A physical flip would explain the refill, which would weaken the artwork in my opinion.
  elapsedSeconds = (elapsedSeconds + step) % CYCLE_SECONDS;

  // If the new time is smaller than the old time, the 12-second cycle has restarted.
  // I make the words visible again and set a new random time for the blinking.
  if (elapsedSeconds < previousSeconds) {
    signVisible = true;
    signSecondsRemaining = random(0.2, 0.4);
  } else {
    // As the cycle continues, I subtract the frame's time from the blink countdown.
    signSecondsRemaining -= step;

    // Once the countdown reaches zero or less, I change whether the words are visible.
    if (signSecondsRemaining <= 0) {
      // "!" means 'not'. Here I make it switch signVisible between true and false.
      signVisible = !signVisible;

      // I used a regular blink to start - one second visible, then half a second hidden.
      // Earlier condition: "if (elapsedSeconds % 1.5 < 1)" It felt too predictable, so I changed it
      // to random intervals and then added a faster opening burst. The first two seconds use short
      // on and off intervals. Afterwards, the visible and hidden states have different ranges.
      //
      // The new interval is added rather than replacing the countdown. This accounts for any small amount of
      // extra time that has passed, so the blinking doesn't gradually fall behind.
      if (elapsedSeconds < 2) signSecondsRemaining += random(0.2, 0.4);
      else if (signVisible) signSecondsRemaining += random(0.3, 1.9);
      else signSecondsRemaining += random(0.3, 1.3);
    }
  }

  // 5. Here the paper background is redrawn this is so the moving sand does not leave trails.
  // The red sign is then drawn as a filled rectangle with rounded corners.
  // I originally used an outlined sign, but decided to change it to solid red with white lettering.
  // Earlier outline: "noFill(); stroke(COLOUR.red); strokeWeight(3); rect(248, 50, 224, 56, 5)"
  background(COLOUR.paper);
  noStroke();
  fill(COLOUR.red);
  rect(200, 50, 320, 56, 5);

  // This makes sure only the white lettering blinks. The red panel stays visible throughout.
  // I make the words bold, set the size to 27 and use a left-aligned text baseline.
  if (signVisible) {
    fill("#ffffff");
    textStyle(BOLD);
    textSize(27);
    textAlign(LEFT, BASELINE);

    // These coordinates keep the text visually centred.
    text("OFFER ENDS SOON", 230, 88);
  }

  // 6. I build the frame of the hourglass from two charcoal lines and two broad rails.
  // strokeWeight(14) sets the thickness of the upright supports.
  stroke(COLOUR.charcoal);
  strokeWeight(14);
  line(216, 154, 216, 568);
  line(504, 154, 504, 568);

  // noStroke() removes outlines. These two filled rectangles make the top and base.
  noStroke();
  fill(COLOUR.charcoal);
  rect(190, 132, 340, 30, 9);
  rect(190, 558, 340, 30, 9);

  // I use the two y positions for the top and bottom joints, and the two x positions
  // for left and right. The nested loops draw all four combinations in red.
  fill(COLOUR.red);
  for (const y of [164, 548]) for (const x of [205, 493]) rect(x, y, 22, 8, 3);

  // I added “LAST CHANCE. AGAIN” as a satirical caption below the hourglass. "NORMAL" removes the sign's bold style,
  // while "CENTER" and "TOP" place the caption centrally, 18 pixels below the base.
  fill(COLOUR.charcoal);
  textStyle(NORMAL);
  textSize(13);
  textAlign(CENTER, TOP);
  text("LAST CHANCE. AGAIN", 360, 606);

  // 7. Here I divide the elapsed time by the 12-second cycle to work out how far through the animation we are.
  // I then use this and the 85% limit to calculate how much sand has moved. Halfway through, 42.5% of the sand has moved,
  // leaving 57.5% in the top. Using the same transferred amount makes sure the sand lost from the top matches what is added to the bottom.
  const transferredArea =
      INITIAL_SAND_AREA * (elapsedSeconds / CYCLE_SECONDS) * MAX_TRANSFER,
    remainingArea = INITIAL_SAND_AREA - transferredArea;

  // This was tricky, quite tough. I initially thought I could just reduce the sand height at a constant speed using something like
  // height = 138 * (1 - elapsedSeconds / 12), but because the upper chamber gets narrower, this would mean different amounts of
  // sand moving at different times. Making the lower pile grow at a constant speed would also be a problem because its triangular
  // area would not increase at the same rate as the sand disappearing above.
  //
  // Instead, I use the amount of sand remaining to calculate its height by rearranging the trapezoid area formula.
  // sqrt() finds the square root, which helps reverse the squared height in the formula.
  //
  // The pile below is a triangle with a half-width of 0.66 times its height. Its area is 0.66 * height squared,
  // so sqrt(area / 0.66) gives pileHeight. This is a two-dimensional model of the sand rather than individual grains.
  const height = (sqrt(12 ** 2 + SAND_SLOPE * remainingArea) - 12) / SAND_SLOPE,
    pileHeight = sqrt(transferredArea / 0.66);

  // Here I subtract the upper height from the neck's y position, because smaller y values
  // move upwards. The slope gives its half-width and the lower pile uses its 0.66 ratio.
  const surfaceY = 346 - height,
    halfWidth = 12 + SAND_SLOPE * height,
    pileHalfWidth = pileHeight * 0.66;

  // 8. I drew the glass in two passes to control the layers without repeating its corners.
  // pass starts at 0, increases by one with pass++, and stops before reaching 2.
  for (let pass = 0; pass < 2; pass++) {
    // In the first pass I fill the glass without an outline, ready for the sand.
    if (pass === 0) {
      noStroke();
      fill(COLOUR.glass);
    }

    // In the second pass I remove the fill and draw a charcoal outline over the sand.
    else {
      noFill();
      stroke(COLOUR.charcoal);
      strokeWeight(6);
    }

    // beginShape() starts drawing the shape. The [x, y] pairs give the positions of each point,
    // vertex() adds these points, and "CLOSE" joins the last point back to the first.
    beginShape();
    for (const [x, y] of DEADLINE_VESSEL) vertex(x, y);
    endShape(CLOSE);

    // The sand is drawn only during pass 0. This puts it over the glass fill, while letting
    // pass 1 finish the outer edge afterwards. The narrow passage stays open.
    if (pass === 0) {
      // I use quad() to draw the upper sand using four points. Two form the moving top surface, while the other two
      // sit at the narrow neck.
      noStroke();
      fill(COLOUR.gold);
      quad(
        360 - halfWidth,
        surfaceY,
        360 + halfWidth,
        surfaceY,
        372,
        346,
        348,
        346,
      );

      // I added a pale line to highlight the top of the sand. It sits slightly inside the edges and moves down with
      // the sand as it drains.
      stroke(COLOUR.goldPale);
      strokeWeight(3);
      line(
        360 - halfWidth + 3,
        surfaceY + 2,
        360 + halfWidth - 3,
        surfaceY + 2,
      );

      // triangle() is used to draw the pile of sand in the lower chamber.
      // The bottom stays in place while the pile gets taller and wider as more sand falls.
      noStroke();
      fill(COLOUR.gold);
      triangle(
        360 - pileHalfWidth,
        556,
        360,
        556 - pileHeight,
        360 + pileHalfWidth,
        556,
      );

      // Here I use a second, darker triangle to give the right side a little depth.
      fill(COLOUR.goldDark);
      triangle(
        360,
        556 - pileHeight,
        360 + pileHalfWidth,
        556,
        360 + pileHalfWidth * 0.3,
        556,
      );

      // pileTop specifies where the moving sand stream ends. lerp() works out a position between
      // the bottom of the neck and the pile. Multiplying time by 2.4 makes the position
      // move down 2.4 times per second, while % 1 makes it repeatedly start again.
      const pileTop = 556 - pileHeight,
        dashY = lerp(374, pileTop, (elapsedSeconds * 2.4) % 1);

      // This narrow gold line connects the neck to the current top of the pile.
      stroke(COLOUR.gold);
      strokeWeight(4);
      line(360, 346, 360, pileTop);

      // The pale dash makes the downward movement visible. min() stops its lower end
      // going past pileTop, so the highlight does not continue through the sand.
      stroke(COLOUR.goldPale);
      strokeWeight(2);
      line(360, dashY, 360, min(dashY + 9, pileTop));
    }
  }

  // 9. I finish with two small red collars either side of the neck.
  // They are drawn after the glass outline so they sit in front of it.
  noStroke();
  fill(COLOUR.red);
  rect(341, 354, 8, 12, 2);
  rect(371, 354, 8, 12, 2);
}
