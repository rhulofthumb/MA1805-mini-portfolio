# The Illusion of Choice

**MA1805 Coding for the Arts — Portfolio Piece 04: Media**

**GitHub Page:** [View the portfolio](https://rhulofthumb.github.io/MA1805-mini-portfolio/)

## Description of the project

The Illusion of Choice explores advertising and identity within **The Economics of Manipulation**. Advertising offers individuality, belonging, and purpose as different choices, but makes purchasing the answer to all three.

Three adverts use the same silver can: **EXCLUSIVE - BE THE EXCEPTION**, **UNITED - GO TOGETHER**, and **CONSCIOUS - DO GOOD. FEEL GOOD.** Selecting one removes its advertising to reveal “ONE PRODUCT. THREE PROMISES”. Every choice receives the same green “EXCELLENT CHOICE” banner, falling money, and cash machine sound. Returning allows the consumer to make another choice with the same outcome.

The image and sound address the Media prompt together. The can’s metallic finish and condensation already suggest a desirable product but slogans and colours attach different identities to it. The cash machine sound shifts attention from the buyer’s identity to the seller’s reward.

## Inspirations and research

Everyday advertising that connects products to identity was my starting point. These references connect identity, consumption, and programmed systems:

- Belk’s [*Possessions and the Extended Self*](https://doi.org/10.1086/209154) (1988) connects possessions and identity, helping explain why my adverts promise ways of being rather than product qualities.
- Soon and Cox’s [*Aesthetic Programming*](https://aesthetic-programming.net/pages/preface.html) (2020) discusses programming as cultural practice and addresses standardisation and pseudo individuality. Here, different identities share one image, drawing method, and commercial outcome.
- Renate Wieser and Julian Rohrhuber’s [*The Invisible Hand Machine*, featured on Runme](https://runme.org/feature/read/%2Bhandmachine/%2B111/index.html), uses software, visualisation, and sound to explore an economic system. Its discussion of outcomes shaped by programmed rules connects to my interface, each advert offers a different identity, but the rules ensure the same commercial reward.

## Process

I refined the slogans into distinct invitations beginning “BE”, “GO”, and “DO”, and used solid colour panels within the existing portfolio palette. Reusing one can made the advertising’s framing the focus.

The sketch uses core p5.js and ordinary JavaScript. `loadImage()` prepares the PNG; `image()`, `tint()`, and opacity control the reveal. One function draws all three adverts, and an array stores the falling bills. Scaling and clipping keep the composition and money separate.

This was more of an experiment than anything, I deliberately kept sound playback within core p5.js using `createAudio()`, this avoided an extra p5.sound script. To handle browser playback restrictions, clicking an advert starts the MP3 looping at zero volume. This silent start ties playback to the viewer’s click while delaying the audible sound until the reveal. It worked so I kept it.

## Critical reflection

The intended reflection is: “I was choosing an identity, but the system was securing a sale.” Repeated approval makes that shared outcome visible. However, the celebratory money and sound could on reflection suggest that the viewer has won something, and may make the satire a little too obvious.

The interface offers no way to decline buying, so its conclusion is built into its rules. Therefore It does not prove that all advertising is deceptive or that these identities are meaningless.

## Assets

- [Pngtree](https://pngtree.com/) — can image, asset 24724713; `assets/plain-can.png`. Creator unverified from the supplied download link.
- [Myinstants: “cha-ching money”](https://www.myinstants.com/en/instant/cha-ching-money-75435/) — uploaded by sorenbrockway; `assets/cha-ching-money.mp3`.
