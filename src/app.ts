import { CharacterSimulation } from './character.js';
import { GameSimulation } from './gameSimulation.js';
import * as PIXI from './pixi/pixi.js';
import { PRECISION, SCALE_MODES } from './pixi/pixi.js';
import { IPlayerInput } from './playerInput.js';

PIXI.settings.ROUND_PIXELS = true;
PIXI.settings.RENDER_OPTIONS.antialias = false;
PIXI.settings.SCALE_MODE = SCALE_MODES.NEAREST;
PIXI.settings.PRECISION_FRAGMENT = PRECISION.HIGH;

// Create the application helper and add its render target to the page
const app = new PIXI.Application({
  width: 384,
  height: 224,
  backgroundColor: 0x000000,
});

function setViewSizeFromWindow(): void {
  const widthRatio = Math.floor(window.innerWidth / 384);
  const heightRatio = Math.floor(window.innerHeight / 224);
  const scaleFactor = Math.max(Math.min(widthRatio, heightRatio), 1);

  console.log(`Resize scale factor: ${scaleFactor}`);

  app.stage.scale = { x: scaleFactor, y: scaleFactor };
  app.renderer.resize(384 * scaleFactor, 224 * scaleFactor);
}

window.addEventListener('load', () => {
  setViewSizeFromWindow();

  document.body.appendChild(app.view);

  const text = new PIXI.Text('pixijs Fighter', {
    fontFamily: 'Press Start 2P',
    fontSize: 12,
  });
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
    new CharacterSimulation({ x: 50, y: 0 }, 1),
    new CharacterSimulation({ x: 250, y: 0 }, -1),
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

    characterBodies[c].lineStyle({ width: 1, color: 0x000000, alpha: 0.5 });
    characterBodies[c].moveTo(15, 25);
    characterBodies[c].lineTo(
      characterSimulations[c].body.size.x - 5,
      characterSimulations[c].body.size.y / 2
    );
    characterBodies[c].lineTo(15, characterSimulations[c].body.size.y - 25);

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

        if (characterSimulations[c].direction > 0) {
          characterBodies[c].scale.x = 1;
          characterBodies[c].position = characterSimulations[c].body.position;
        } else {
          characterBodies[c].scale.x = -1;
          characterBodies[c].position.y =
            characterSimulations[c].body.position.y;
          characterBodies[c].position.x =
            characterSimulations[c].body.position.x +
            characterSimulations[c].body.size.x;
        }
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

  window.addEventListener('resize', (event) => {
    setViewSizeFromWindow();
  });
});
