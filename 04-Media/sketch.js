/*
  MA1805 / 04 Media — The Illusion of Choice
*/

// 1. I started by defining the same colours used in the other portfolio pieces.
const COLOUR = {
  paper: [239, 232, 216],
  charcoal: [31, 32, 32],
  gold: [224, 166, 55],
  red: [185, 71, 61],
  green: [79, 154, 74],
};

// I have stored the three adverts in one array, so they can share the same drawing code.
// Each object holds a can name, a slogan, an accent colour, and a text colour.
const adverts = [
  {
    name: "EXCLUSIVE",
    slogan: "BE THE\nEXCEPTION.",
    accent: COLOUR.gold,
    ink: COLOUR.charcoal,
  },
  {
    name: "UNITED",
    slogan: "GO\nTOGETHER.",
    accent: COLOUR.red,
    ink: COLOUR.paper,
  },
  {
    name: "CONSCIOUS",
    slogan: "DO GOOD.\nFEEL GOOD.",
    accent: COLOUR.charcoal,
    ink: COLOUR.paper,
  },
];

// 2. These variables remember the media and what the viewer is doing.
// selected = -1 means no advert has been chosen. Array positions 0, 1, and 2
// refer to Exclusive, United, and Conscious advert blocks. The seconds will start again for each choice made.
// soundPlayed stops draw() from starting the sound again on every frame.
let productImage,
  cashSound,
  selected = -1,
  seconds = 0,
  soundPlayed = false;

// The bills array starts empty. Once a choice is made it will fill with eighteen bill objects.
// artSize, artLeft, and artTop will place the artwork inside the browser window.
let bills = [],
  artSize,
  artLeft,
  artTop;

// 3. I have loaded the source image here, before the drawing starts.
// The same PNG file is used for every advert and for the plain can at the end.
function preload() {
  productImage = loadImage("assets/plain-can.png");
}

// 4. setup() runs once. I made one canvas for the artwork and the falling bills.
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Resize function is called, this is so the layout is ready for the first frame.
  windowResized();

  // I keep the canvas pixel density at 1 (to keep pixels consistent) and set the shared text style once.
  pixelDensity(1);
  textFont("Arial");
  textSize(13);
  textAlign(CENTER, CENTER);
  noStroke();

  // This p5 function loads my MP3 file into a hidden audio player.
  // It loads separately from the image and implimented so playback is starts when a viewer clicks.
  cashSound = createAudio("assets/cha-ching-money.mp3");
}

// Here the layout is calculated at the start and whenever the browser window changes size.
// This helps to keep the same composition without repeating the layout maths every frame.
function windowResized() {
  // The artwork is a maximum of 720px wide. On smaller screens it will use only 92%
  // of the window width, leaving space at the sides.
  artSize = min(720, windowWidth * 0.92);

  // Interesting way to center but it works.
  // Half the leftover width goes on each side, creating a centered artwork.
  artLeft = (windowWidth - artSize) / 2;

  // I center the artwork vertically here. max(0, ...) keeps its top position at zero or above.
  // It stops the artwork moving above the page when it is taller than the browser window.
  artTop = max(0, (windowHeight - artSize) / 2);

  // Here I resize the canvas to fill the window, and also ensure its height is never smaller than artSize.
  resizeCanvas(windowWidth, max(windowHeight, artSize));
}

// 5. draw() runs repeatedly. It's reposnible for continuinly updating and displaying the artwork.
function draw() {
  // The paper background is redrawn to clear the previous frame. I found that,
  // this means moving bills do not leave trails or pile up at the bottom.
  background(COLOUR.paper);

  // Here I use a custom function to convert the mouse position into artwork coordinates
  // before testing a click or hover. This keeps the controls lined up when the artwork is scaled.
  // I decided on a custom function because the same logic needs to be used for both draw() & mousePressed()
  const point = artworkMouse();

  // The line moves the animation’s timer forward after someone chooses an advert.
  // The time here is essential,the 0.1 second limit is an optional safeguard
  // that stops it jumping too far ahead if the browser pauses or tabs are switched.
  if (selected >= 0) seconds += min(deltaTime / 1000, 0.1);

  // The advert finishes fading at 3.3 seconds. It is a 1.1-second wait plus a 2.2-second fade.
  // Here I subtract 3.3 seconds to make sure the money shower timer starts at zero when the fade finishes.
  const elapsed = seconds - 3.3;

  //The money shower only runs after a choice, once the can is revealed, and can run for up to six seconds.
  if (selected >= 0 && elapsed >= 0 && elapsed <= 6) {
    // I play the cash register sound once at the start of the money shower.
    // ! means 'not', so this block runs only while soundPlayed is false.
    if (!soundPlayed) {
      // Here I reset the cash sound, stop it looping, restore full volume and play it.
      cashSound.stop();
      cashSound.noLoop();
      cashSound.volume(1);
      cashSound.play();

      // Remember that the sound has played. This prevents every frame from playing the sound again.
      soundPlayed = true;
    }

    // Here I leave an intentional 12-pixel gap between the artwork and each side lane.
    // Important, because this allows the money shower to fall either side of the artwork without covering it.
    // max() and min() keep the lane boundaries within the browser window.
    const leftWidth = max(0, artLeft - 12),
      rightStart = min(windowWidth, artLeft + artSize + 12);

    // push() saves the current drawing settings.
    // I then make the text bold using textStyle(BOLD).
    push();
    textStyle(BOLD);

    // I have used two invisible rectangles to define the areas where the money shower can appear,
    // one on either side of the artwork. clip() hides any parts of the bills that go outside these boundaries.
    clip(() => {
      rect(0, 0, leftWidth, windowHeight);
      rect(rightStart, 0, windowWidth - rightStart, windowHeight);
    });

    // Loop through the bills array, allowing me to access
    // the stored values for each individual bill.
    for (const bill of bills) {
      // Each bill is made with its own delay. Subtracting it tells me how long it has been
      // since that bill started to fall.
      const age = elapsed - bill.delay;

      // A negative age means the bill has not entered yet. Once its duration has passed,
      // i have programmed to skip it too. Continue then moves straight to the next bill in the array.
      if (age < 0 || age > bill.duration) continue;

      // Dividing age by duration tells me how far each bill has progressed through its animation.
      const progress = age / bill.duration;

      // Here I use bill.side to choose whether the bill falls in the left or right lane.
      // The question mark and colon allow me to select the width of the correct lane.
      const laneWidth = bill.side === 0 ? leftWidth : windowWidth - rightStart;

      // I set the left lane to start at zero, while the right lane starts
      // after the artwork and the 12-pixel gap.
      const laneStart = bill.side === 0 ? 0 : rightStart;

      // Simply, if there is not enough space for a bill to
      // fall in its assigned lane, I skip that bill.
      if (laneWidth < 1) continue;

      // Here I set that bills can shrink in narrow lanes but never grow larger
      // than their original size. The 40-pixel radius allows room around the centre for a rotated bill.
      const size = min(1, laneWidth / 100),
        radius = 40 * size;

      // sin() helps create a smooth movement back and forth between -1 and 1.
      // Each bill is designed to have its own phase, so they start this movement at different points.
      // I use sway for both sideways movement and rotation, keeping them related.
      const sway = sin(age * 2 + bill.phase),
        drift = sway * 22 * size;

      // bill.x spreads the bills across the available lane width. I then add drift created by sway,
      // while constrain() keeps each bill's center within the limits I have set for its lane.
      const x =
        laneStart +
        constrain(
          radius + bill.x * (laneWidth - 2 * radius) + drift,
          radius,
          laneWidth - radius,
        );

      // This sets each bill to start 45 pixels above the window and finish 45 pixels below it.
      // I keep the opacity value at 0.65 until the final fifth of its fall, where it gradually decreases to zero.
      const y = -45 + progress * (windowHeight + 90),
        opacity = 0.65 * min(1, (1 - progress) * 5);

      // push() is used to save the current drawing settings for each bill.
      // translate() moves the drawing origin to the bill's centre,
      // scale() adjusts its size, and rotate() turns it using radians.
      push();
      translate(x, y);
      scale(size);
      rotate(bill.angle + sway * 0.2);

      // I use ... to pass the three RGB array values into fill() or stroke() & the fourth value controls opacity.
      // This allows the bill and its outline to fade together, fill() colours the inside, while stroke() draws the edges.
      fill(...COLOUR.paper, 255 * opacity);
      stroke(...COLOUR.charcoal, 255 * opacity);
      strokeWeight(2);

      // This creates the main rectangle for the bill with an outline.
      // I then used noFill() to draw a smaller rectangle inside it with a thinner outline.
      // Every bill uses this same design.
      rect(-34, -18, 68, 36);
      noFill();
      strokeWeight(1);
      rect(-29, -13, 58, 26);

      // Each bill is finished with a gold dollar sign near its local centre.
      // pop() then resets the drawing settings so they do not affect the next bill.
      noStroke();
      fill(...COLOUR.gold, 255 * opacity);
      textSize(22);
      text("$", 0, 1);
      pop();
    }
    pop();
  }

  // Here I am drawing the artwork over the background.
  // I move to its top left corner and scale a 720 unit drawing to fit artSize.
  // Because scale(artSize / 720) is used all the coordinates below can stay the same on different screen sizes.
  push();
  translate(artLeft, artTop);
  scale(artSize / 720);

  // Before anything is selected, I show the three adverts and their green introduction text.
  if (selected < 0) {
    // The array index i runs from 0 to 2. Each card is 200 units wide and its next
    // starting position is 220 units away, leaving a 20-unit gap between cards.
    // Classic example of why people do not like javascript :)
    for (let i = 0; i < adverts.length; i++)
      drawAdvert(i, 40 + i * 220, 186, 200, 350, 1);

    // Green introduction text below the three adverts.
    fill(COLOUR.green);
    text("Three ways to be yourself.", 360, 625);
  } else {
    // After a selection is made, I enlarge that advert over 0.8 seconds.
    // constrain() holds the zoom fraction between 0 and 1.
    let zoom = constrain(seconds / 0.8, 0, 1);

    // I have used the smoothstep formula here to make the zoom start and finish gently
    // instead of starting & stopping abruptly. Smoothstep effectivly eases the beginning and end.
    zoom = zoom * zoom * (3 - 2 * zoom);

    // lerp() finds a value between a starting and finishing value. I use the same zoom
    // fraction to move and enlarge the card together, this keeps its proportions.
    const x = lerp(40 + selected * 220, 240, zoom),
      y = lerp(186, 114, zoom);
    const w = lerp(200, 240, zoom),
      h = lerp(350, 420, zoom);

    // The frame is kept fully visible for 1.1 seconds, then its faded over the next 2.2 seconds.
    // Framing goes from 1 to 0. At 2.2 seconds of total time, it is 0.5 or half faded.
    const framing = 1 - constrain((seconds - 1.1) / 2.2, 0, 1);

    // I let 80% of the advert fade before its approval begins: 1.1 + 2.2 x 0.8 = 2.86.
    // Both messages then take 1.5 seconds to reach full opacity.
    const approval = constrain((seconds - 2.86) / 1.5, 0, 1);

    // I added this condition because I was having an issue with a faint outline
    // of the advert card remaining visible after the fade had finished.
    // This stops the card from being drawn once the fade is complete.
    if (framing > 0) drawAdvert(selected, x, y, w, h, framing);

    // Once the fade is complete, only the plain can without the advert card is drawn.
    // These calculations keep the can in the same position and size as before,
    // preventing it from jumping when the advert disappears.
    else
      image(
        productImage,
        x + (8 * w) / 200,
        y + (113 * h) / 350,
        (184 * w) / 200,
        (184 * h) / 350,
      );

    // I position the explanation across the centre of the can and then use the approval
    // value to gradually fade the charcoal text into view.
    fill(...COLOUR.charcoal, 255 * approval);
    text("ONE PRODUCT. THREE PROMISES", x + w / 2, y + (205 * h) / 350);

    // The green panel uses the same approval fraction as the words, so they fade in together.
    fill(...COLOUR.green, 255 * approval);
    rect(110, 58, 500, 76, 5);

    // push() to save current drawing settings. Section is bold.
    push();
    textStyle(BOLD);

    // I use white with an opacity value so the text gradually fades into view, rather than appearing
    // immediately as solid white. pop() is used to restore the previous drawing settings so the bold text style
    // and larger text size do not affect the other text.
    fill(255, 255 * approval);
    textSize(34);
    text("EXCELLENT CHOICE", 360, 96);
    pop();

    // A check to see whether the mouse is inside the return button. When hovered over, I swap the paper and
    // charcoal colours of the button and its text so the viewer can see that it is interactive.
    const hover = overReturn(point.x, point.y);
    const ink = hover ? COLOUR.paper : COLOUR.charcoal;
    push();
    fill(hover ? COLOUR.charcoal : COLOUR.paper);
    stroke(COLOUR.charcoal);
    strokeWeight(2);
    rect(235, 576, 250, 41, 5);

    // I made the arrow and wording one centred text string. pop() restores the normal text size and drawing settings.
    noStroke();
    fill(ink);
    textSize(12);
    text("← RETURN TO YOUR CHOICE", 360, 596.5);
    pop();
  }

  // Satirical caption visible in both the choice and reveal screens. Sits outside if...else.
  fill(COLOUR.charcoal);
  text("CHA-CHING CHA-CHING", 360, 649);
  pop();

  // I use the hand cursor when hovering over an advert or the return button, depending on
  // which screen is showing. Elsewhere I use the ordinary arrow cursor.
  cursor(
    (
      selected < 0
        ? advertAt(point.x, point.y) >= 0
        : overReturn(point.x, point.y)
    )
      ? HAND
      : ARROW,
  );
}

// 6. Here I use one drawing function for the three cards and the enlarged selection.
// index chooses the advert's object, x and y put it in place; w and h size it and
// framing tells me how much of the advertising is still visible.
function drawAdvert(index, x, y, w, h, framing) {
  // The selected object supplies the slogan and colours. The source can always stays the same.
  const advert = adverts[index];

  // My drawing space is 200 by 350. translate() positions that space and scale() resizes it.
  push();
  translate(x, y);
  scale(w / 200, h / 350);

  // The card's rectangle is clipped here so its decoration cannot spill into another card.
  clip(() => rect(0, 0, 200, 350));
  fill(COLOUR.paper);
  stroke(COLOUR.charcoal);
  strokeWeight(3.5);

  // This paper-filled rectangle gives the card its charcoal outline and rounded corners.
  rect(2, 2, 196, 346, 14);
  noFill();
  stroke(advert.accent);
  strokeWeight(2);

  // Decrative illustration for the advert. Paying homage to the token from my first portfolio piece.
  if (index === 0) {
    circle(100, 205, 146);
    circle(100, 205, 132);

    // Decrative illustration for the advert. United gets three overlapping circles to suggest a group.
  } else if (index === 1) {
    for (let i = 0; i < 3; i++) circle(46 + i * 54, 220, 70);
  } else {
    // Decrative illustration for the advert. Conscious gets two stems and repeated leaf shapes,
    // suggesting responsibility through a familiar visual cue.
    line(32, 269, 32, 158);
    line(168, 269, 168, 158);
    for (let i = 0; i < 3; i++) {
      ellipse(24, 174 + i * 32, 16, 28);
      ellipse(176, 174 + i * 32, 16, 28);
    }
  }

  // I added a solid colour panel using the selected advert's accent colour.
  // The rectangle has rounded corners and no outline.
  noStroke();
  fill(advert.accent);
  rect(12, 16, 176, 100, 5);

  // push() as we know, saves the current drawing settings. I make the slogan bold,
  // while textLeading(23) sets the spacing between its lines. pop() then restores the previous text settings.
  push();
  textStyle(BOLD);
  textLeading(23);
  fill(advert.ink);
  textSize(20);
  text(advert.slogan, 100, 66);
  pop();

  // This is the same source image used in every advert, drawn without stretching.
  image(productImage, 8, 113, 184, 184);

  // The can's coloured name band is drawn separately from the image. That lets the
  // name disappear later without editing or replacing the source PNG.
  fill(advert.accent);
  rect(70, 187, 60, 29);
  fill(advert.ink);
  textSize(9);
  text(advert.name, 100, 202);

  // The choice button repeats the advert's accent colour. I made the whole card clickable,
  // so the viewer does not have to hit the small rectangle button precisely.
  fill(advert.accent);
  rect(44, 302, 112, 29, 2);
  fill(advert.ink);
  textSize(13);
  text("CHOOSE", 100, 317);

  // I start the fade once framing drops below 1. A paper-coloured layer gradually covers the
  // advert as framing decreases, hiding the slogans and decoration while the original product remains.
  if (framing < 1) {
    fill(...COLOUR.paper, 255 * (1 - framing));
    rect(0, 0, 200, 350);

    // tint() is used to gradually bring the original can image back into view as the advert fades.
    // The first value keeps its original colours, while the second controls its opacity.
    // pop() then restores the previous drawing settings, including the tint.
    tint(255, 255 * (1 - framing));
    image(productImage, 8, 113, 184, 184);
  }
  pop();
}

// 7. The mouse position is converted to match my artwork's coordinates.
// I subtracted the artwork's position, then reversed its scaling to get 720 unit coordinates.
// This keeps the clickable adverts and return button aligned when the artwork is resized.
function artworkMouse() {
  return {
    x: ((mouseX - artLeft) * 720) / artSize,
    y: ((mouseY - artTop) * 720) / artSize,
  };
}

// These four comparisons check whether the mouse is inside the return rectangle.
function overReturn(x, y) {
  return x > 235 && x < 485 && y > 576 && y < 617;
}

// Here I check whether the mouse is inside one of the three advert cards. The function returns 0, 1 or 2 depending
// on which advert the mouse is over, or if it is outside all three cards it returns -1
function advertAt(x, y) {
  if (y < 186 || y > 536) return -1;
  for (let i = 0; i < 3; i++)
    if (x >= 40 + i * 220 && x <= 240 + i * 220) return i;
  return -1;
}

// 8. A click will either return to the adverts or start the selected advert's sequence.
function mousePressed() {
  // The mouse position is converted into artwork coordinates before checking a click.
  // This keeps the clickable adverts and return button aligned when the artwork is scaled.
  const point = artworkMouse();

  // Only the return button can start a new action during a reveal.
  if (selected >= 0) {
    // Returning will stop the sound and set selected back to -1. The next frame shows
    // the advert choices again, and the bill drawing stops because no advert is selected.
    if (overReturn(point.x, point.y)) {
      cashSound.stop();
      selected = -1;
    }
  } else {
    // On the choice screen, if the user clicks outside of an advert card it will return a result below zero
    // and means the click missed, so return ends this function without changing the artwork.
    const choice = advertAt(point.x, point.y);
    if (choice < 0) return;

    // Some browsers restrict automatic audio playback until the viewer interacts with the page. So...I start
    // the MP3 silently in a loop when an advert is clicked, ready to reset and play it audibly during the reveal.
    cashSound.volume(0);
    cashSound.loop();

    // The choice is remembered, the timer is reset, and this allows the register to play again.
    selected = choice;
    seconds = 0;
    soundPlayed = false;

    // I use this to create 18 bill objects using the JavaScript Array.from() function. Each object stores
    // the values needed to draw and move an individual bill. "i" counts each bill from 0 to 17,
    // while _ is a placeholder for an unused value.
    bills = Array.from({ length: 18 }, (_, i) => ({
      // x is a fraction of its lane's width. i % 2 alternates left and right, because
      // the remainder is 0 for even numbers and 1 for odd ones. A delay of i x 0.11
      // spreads the entry times of the bills instead of dropping all eighteen at once.
      x: random(0.04, 0.96),
      side: i % 2,
      delay: i * 0.11,

      // A bill falls for between 2.8 and 3.6 seconds. The starting angle is chosen in
      // radians, giving each bill a random starting rotation. Phase will determine where each bill starts
      // in its side to side swaying movement. All bills keep the same design, while these
      // stored values vary their movement.
      duration: random(2.8, 3.6),
      angle: random(-0.35, 0.35),
      phase: random(TWO_PI),
    }));
  }
}
