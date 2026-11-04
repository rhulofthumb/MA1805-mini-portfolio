# Running Out of Time

**MA1805 Coding for the Arts — Portfolio Piece 02: Movement**

**GitHub Page:** [View the portfolio](https://rhulofthumb.github.io/MA1805-mini-portfolio/)

## Description of the project

Running Out of Time explores manufactured urgency within The Economics of Manipulation. An offer appears to be running out, but the system repeatedly renews the deadline. The deadline exists to apply pressure rather than mark a genuine ending.

Gold sand drains through a stationary hourglass beneath a blinking “OFFER ENDS SOON” sign. Every twelve seconds, the sand returns to the top with around 15% still remaining above. The caption “LAST CHANCE. AGAIN” gives this repeated interruption a satirical commentary.

The changing sand levels, falling stream and blinking lettering address the Movement prompt. The stationary frame leaves the refill unexplained, revealing a contradiction between the sign’s promise and the timer’s behaviour.

# Inspirations and research

Countdowns and limited time offers were my starting point, they are everywhere. These references connect urgency and programmed movement:

- Mathur et al.’s [*Dark Patterns at Scale*](https://arxiv.org/html/1907.07032v2) (2019) identifies countdown timers and limited time messages in online shopping. Examples where offers remain available after their deadlines connect to my repeatedly renewed hourglass.
- Soon and Cox’s [*Aesthetic Programming*, “Infinite loops”](https://aesthetic-programming.net/pages/3-infinite-loops.html) (2020) discusses repeating indicators and computational time. Here, movement appears to report progress, while the rules prevent an ending.
- Shri Khalpada’s [PerThirtySix p5.js collection](https://perthirtysix.com/explore-creative-coding-with-30-p5js-sketches) Its shapes, animation and randomness connect to the hourglass, sand and lettering.
- Boris Kopeinig’s [*blink*, archived on Runme](https://runme.org/project/%2Bblink/index.html), uses visual stimulation patterns and editable sequences. It connects to my use of changing visibility to interrupt attention.
- (Karl-)Robert Ek’s [*SPS / Virtual Pal*, archived on Runme](https://runme.org/project/%2Bspssps/index.html), offers a close comparison, its Virtual Pal version puts the machine in control of the rules and countdown. My hourglass similarly makes time follow its programmed rules.

## Process

I kept the hourglass stationary because turning it would explain the reset. I increased the original 2.5% sand reserve to around 15%, making the premature reset clearer. “OFFER ENDS SOON”, and regular blinking became random intervals with a faster start.

The sketch uses core p5.js and ordinary JavaScript. `draw()` repeats the animation, `deltaTime` advances its clock, and `%` restarts the cycle. `random()` controls blinking and `lerp()` moves the stream’s highlight.

The sand maths was complex. Simply lowering the upper surface at a constant speed would transfer different areas as the chamber narrowed. I used the remaining area to calculate its height with `sqrt()`, while the lower pile grows from that transferred amount. Comments explain these calculations.

## Critical reflection

The intended reflection is: “I thought the opportunity was ending, and the system was keeping me under pressure.” The visible reserve makes the premature reset easier to notice. However, the irregular sign might distract from the sand, and repetition could become reassuring rather than urgent.

## Assets

No external image, sound, or video assets. Everything is drawn with p5.js.
