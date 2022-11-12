# pixi.js Fight

Attempting to improve my Typescript skills with a simple fighting game.

## Features

### Up Next

1. [x] HUD: Health bars etc
2. [x] Payse and frame advance
3. [x] Animated stage (+ skewed foreground) ...in progress
4. [x] FPS counter
5. [ ] Multiple body rects per state - i.e. transition states: jumping and crouching
6. [ ] Verify push boxes against the game

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
- [x] HUD: Health bars etc
- [x] Animated stage (+ skewed foreground)
- [x] FPS counter
- [x] Switch player direction (based on relative position)
- [ ] Hurt and collision boxes per animation frame / state
- [ ] Hit boxes per attack animation frame
- [ ] Audio - in progress...
- [x] Scrolling playfield
- [x] Walls to left and right
- [x] Shadow under the player
- [ ] Blocking
- [ ] Proximity blocking
- [x] Peripherals other than keyboard
- [ ] Special moves (with input buffer)
- [ ] Jump sprite vertical offset should vary with character jump height
- [ ] Check sprite alignment (esp. jumps)
- [ ] Proximity normals
- [ ] Event emitter for accurate processing of events and state changes
      (e.g. playing sound effects)
- [ ] Distributed multiplayer game
- [ ] Assets

## Tasks

- [x] Migrate from js to typescript
- [x] github repo
- [x] Migrate to use a rendering / game framework (this repo - using PixiJS)
- [x] Better dev build - e.g. copy-and-watch
- [x] Avoid duplication in animation assets (define frames then animations contain keys for each frame)
- [ ] Still need simple sprite animations but need a 'Body' entity that has physics states / sequences and associated texture animations
- [ ] Convert `RunningAnimation` to an object.
- [ ] Load POJOs into pixi specific resources at run time - e.g. `Rectangle` etc
- [ ] Refactor char / app into renderers - e.g. char simulation + renderer that wraps it
      Simple items may just have a renderer (e.g. the stage, char shadows)
- [ ] Automated tests (esp for collisions and animation logic)
- [ ] Refactor state machine to be less verbose / easier to maintain
      States should be composable?
- [ ] Rework render loop as per zinac
- [ ] Start features above
- [ ] Automated build

# Build and deploy

`npm run build`

## Packaging

This project is using native js modules.

- pixi.js is imported directly as a jsm
- the application distribution is built by copying files and `tsc` output
