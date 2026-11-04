# No Strings Attached

**MA1805 Coding for the Arts — Portfolio Piece 01: Drawing**

**GitHub Page:** [View the portfolio](https://rhulofthumb.github.io/MA1805-mini-portfolio/)

## Description of the project

No Strings Attached explores incentives within The Economics of Manipulation. It asks whether an attractive offer is simply a reward, or whether it can also direct behaviour.

A gold token suggests value without referring to a real currency, brand, or promotion. A charcoal fishing hook sits behind it, passes through a punched hole, and catches across its lower-left edge. This makes the token read as bait rather than a neutral reward. A bullseye and green directional triangle above it suggest that the incentive has been deliberately targeted.

The fixed coordinates, colour, and basic p5.js shapes address the Drawing prompt. I treated “emoji” as one recognisable symbolic form rather than the style of a conventional emoji.

## Inspirations and research

These references connect behavioural influence, programming, and the technical construction of the drawing:

- Thaler and Sunstein’s *Nudge* (2008) describes *choice architecture*: decisions can be guided without overt force. The hook and token turn this into a visual metaphor.
- Soon and Cox’s [*Aesthetic Programming*](https://aesthetic-programming.net/pages/preface.html) (2020) discusses programming as cultural practice and power relations embedded in code. Here, drawing order makes a hidden system of influence visible.
- The [p5.js guide](https://p5js.org/tutorials/get-started/) and references for [`arc()`](https://p5js.org/reference/p5/arc/), [`bezier()`](https://p5js.org/reference/p5/bezier/), and [`beginShape()`](https://p5js.org/reference/p5/beginShape/) informed the coordinate system, hook curve, and token emblem.
- [PerThirtySix’s p5.js sketch collection](https://www.perthirtysix.com/explore-creative-coding-with-30-p5js-sketches) supported my decision to keep the work static, geometric, and built from basic p5.js shapes rather than adding unnecessary animation.

## Process

I began with the token outer rim, raised gold face, inset ring, star emblem, and highlight. I then built the hook from an eye, vertical line, and lower arc.

The main challenge was making the hook pass through the token rather than simply sit beside it. I draw its lower bend behind the token, show a short line inside the punched hole, then redraw a Bézier curve over the lower left edge. This makes the physical and conceptual relationship between offer and capture believable.

I refined the targeting marker from a plain red dot into a bullseye with a green vector. This made behavioural targeting clearer while keeping the illustration geometric and restrained.

## Critical reflection

The intended reflection is: “what looks like value at first becomes bait on closer inspection.” A reward, recommendation, or loyalty incentive can appear to increase choice while also steering attention and action.

The most important discovery was that code order shapes meaning. The same hook looks pasted on, hidden, or physically connected depending on when it is drawn. This layer order actually became more than a technical solution, it helped express how manipulation can be concealed within an attractive surface.

## Assets

No external assets are used. The token, hook, bullseye, vector, and caption are drawn directly with p5.js
