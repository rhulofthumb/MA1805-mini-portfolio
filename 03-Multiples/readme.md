# Everybody Is Buying

**MA1805 Coding for the Arts — Portfolio Piece 03: Multiples**

**GitHub Page:** [View the portfolio](https://rhulofthumb.github.io/MA1805-mini-portfolio/)

## Description of the project

Everybody Is Buying explores a manufactured agreement within The Economics of Manipulation. Different voices appear to endorse the same incentive, but their connections reveal one shared controller or source.

Sixteen traditional speech bubbles sit in a 4 by 4 grid. Every bubble has a different width and height, while each contains the same gold token. Fine lines connect them to a red block labelled “THE FAT CONTROLLER”. The different sizes suggest individual people, even though the same message runs through the whole crowd.

The array and repeated drawing address the Multiples prompt together. Individual dimensions make each voice distinct, while the identical tokens and shared source question whether repeated approval represents independent agreement.

# Inspirations and research

As a starting point, everyday commercial messages that present popularity as a reason to buy. These references connect repetition, individuality, and programmed systems:

- Mathur et al.’s [*Dark Patterns at Scale*](https://arxiv.org/html/1907.07032v2) (2019) documents fabricated shopping activity and repeated testimonials attributed to different names. This connects to my crowd, where apparently separate endorsements lead back to one source.
- Soon and Cox’s [*Aesthetic Programming*](https://aesthetic-programming.net/pages/preface.html) (2020) discusses programming as cultural practice. Here, individual voices share one array and drawing method, making the code part of the argument about common influence.
- Aymeric Mansoux, Marloes de Valk, and Dave Griffiths’ [*Naked on Pluto*, featured on Runme](https://runme.org/project/%2Bnaked-on-pluto/index.html), Its bots mix social interaction with prompts to consume, connecting to my apparently separate voices within one programmed system.
- Shri Khalpada’s [PerThirtySix p5.js collection](https://perthirtysix.com/explore-creative-coding-with-30-p5js-sketches) Its grids, random circles, and connecting lines relate to my repetition, size experiments, and shared connections.

# Process

I continued the portfolio’s paper, charcoal, gold, and red palette, repeating the token appearing in 01 Drawing. I first tried random bubble sizes, but some looked too similar. Choosing sixteen sizes individually made each voice different while keeping the familiar speech bubble shape.

The sketch uses core p5.js and ordinary JavaScript. One array stores the dimensions, and a loop adds positions to form the grid. Further loops draw the connections and bubbles. Drawing the lines first allows the filled bubbles to cover them, keeping the shared structure behind the voices.

I then added "THE FAT CONTROLLER" beneath the red block to give the artwork a satirical identity. The final code keeps the drawing within `setup()` and `draw()`, with comments explaining the construction and decisions.

## Critical reflection

The intended reflection is: “We are all different, but we can still be persuaded by a single source.” Repeated tokens make that shared influence visible. However, the connections could also suggest genuine collective agreement.

The artwork simplifies influence into one controller. It does not prove that all agreement is manufactured. 

## Assets

- No external assets. The bubbles, tokens, connections, control block, and lettering are all drawn in p5.js
