# pixi.js Fight

Attempting to improve my Typescript skills with a simple fighting game.

## Features

**Proposed features that may or may not see the light of day**

- [ ] Game state:
  - [ ] Idle
  - [ ] In game
  - [ ] End of game (sub set of idle)
- [x] Render boxes (with transparency)
- [x] Collision between players
  - [x] Collision box
  - [x] Logic to avoid overlap and implement 'push'
- [x] Jumping in 3 directions with animation
- [ ] Attack boxes
- [x] Import sprites
- [x] and background from SF
- [ ] HUD: Health bars etc
- [ ] Animated stage
- [ ] FPS counter
- [x] Switch player direction (based on relative position)
- [ ] Hurt and collision boxes per animation frame
- [ ] Hit boxes per attack animation from
- [ ] Audio - in progress...
- [x] Scrolling playfield
- [x] Walls to left and right
- [x] Shadow under the player
- [ ] Blocking
- [ ] Proximity blocking
- [x] Peripherals other than keyboard
- [ ] Special moves (with input buffer)
- [ ] Proximity normals
- [ ] Event emitter for accurate processing of events and state changes
      (e.g. playing sound effects)
- [ ] Distributed multiplayer game
- [ ] Assets

## Tasks

- [x] Migrate from js to typescript
- [x] github repo
- [x] Migrate to use a rendering / game framework (this repo - using PixiJS)
- [ ] Better dev build - e.g. copy-and-watch
- [ ] Avoid duplication in animation assets (define frames then animations contain keys for each frame)
- [ ] Refactor char / app into renderers - e.g. char simulation + renderer that wraps it
      Simple items may just have a renderer (e.g. the stage, char shadows)
- [ ] Automated tests
- [ ] Rework render loop as per zinac
- [ ] Start features above
- [ ] Automated build

# Build and deploy

`npm run build`

## Packaging

This project is using native js modules.

- pixi.js is imported directly as a jsm
- the application distribution is built by copying files and `tsc` output
