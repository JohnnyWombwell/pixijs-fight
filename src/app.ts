import { CharacterSimulation } from './character.js';
import { GameSimulation } from './gameSimulation.js';
import * as PIXI from './pixi/pixi.js';
import { IPlayerInput } from './playerInput.js';

// Create the application helper and add its render target to the page
const app = new PIXI.Application({
  width: 384,
  height: 224,
  resolution: 3,
  backgroundColor: 0x000000,
});
document.body.appendChild(app.view);

const text = new PIXI.Text('pixijs Fighter', { fontSize: 8 });
text.x = 20;
text.y = 10;
text.style.fill = 'green';

app.stage.addChild(text);

const playerInput: IPlayerInput[] = [
  {
    left: false,
    right: false,
    jump: false,
    attack: [false],
  },
  {
    left: false,
    right: false,
    jump: false,
    attack: [false],
  },
];

const characterSimulations = [
  new CharacterSimulation({ x: 50, y: 0 }),
  new CharacterSimulation({ x: 250, y: 0 }),
];

const gameSimulation = new GameSimulation(characterSimulations);

const characterOrigins = [new PIXI.Graphics(), new PIXI.Graphics()];
for (const origin of characterOrigins) {
  origin.lineStyle({ width: 2, color: 0xffffff, alpha: 0.3 });
  origin.moveTo(-5, 0);
  origin.lineTo(5, 0);
  origin.moveTo(0, 5);
  origin.lineTo(0, -5);

  app.stage.addChild(origin);
}

const characterBodies = [new PIXI.Graphics(), new PIXI.Graphics()];
characterBodies[0].beginFill(0xff0000, 0.3);
characterBodies[1].beginFill(0x00ff00, 0.3);

for (let c = 0; c < characterBodies.length; ++c) {
  characterBodies[c].drawRect(
    0,
    0,
    characterSimulations[c].body.size.x,
    characterSimulations[c].body.size.y
  );

  app.stage.addChild(characterBodies[c]);
}

app.ticker.add((framesDelta) => {
  let frameCount = Math.round(framesDelta);
  while (frameCount-- > 0) {
    // Input handling

    // Network update

    gameSimulation.update(playerInput);

    // Store game state

    // Rendering
    for (let c = 0; c < characterSimulations.length; ++c) {
      characterOrigins[c].position = characterSimulations[c].physics.position;
      characterBodies[c].position = characterSimulations[c].body.position;
    }
  }
});

window.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyA':
      playerInput[0].left = true;
      break;
    case 'KeyD':
      playerInput[0].right = true;
      break;
    case 'KeyW':
      playerInput[0].jump = true;
      break;
    case 'Space':
      playerInput[0].attack[0] = true;
      break;
  }

  switch (event.code) {
    case 'ArrowLeft':
      playerInput[1].left = true;
      break;
    case 'ArrowRight':
      playerInput[1].right = true;
      break;
    case 'ArrowUp':
      playerInput[1].jump = true;
      break;
    case 'Enter':
      playerInput[1].attack[0] = true;
      break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'KeyA':
      playerInput[0].left = false;
      break;
    case 'KeyD':
      playerInput[0].right = false;
      break;
    case 'KeyW':
      playerInput[0].jump = false;
      break;
    case 'Space':
      playerInput[0].attack[0] = false;
      break;
  }

  switch (event.code) {
    case 'ArrowLeft':
      playerInput[1].left = false;
      break;
    case 'ArrowRight':
      playerInput[1].right = false;
      break;
    case 'ArrowUp':
      playerInput[1].jump = false;
      break;
    case 'Enter':
      playerInput[1].attack[0] = false;
      break;
  }
});
