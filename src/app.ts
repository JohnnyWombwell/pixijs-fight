import { Battle } from './battle.js';
import { Camera } from './camera.js';
import { CharacterSimulation } from './character.js';
import { FightSimulation } from './fightSimulation.js';
import { StatusAreaRenderer } from './hud/statusAreaRenderer.js';
import { GameControllerInputSource } from './input/gameControllerInputSource.js';
import { KeyboardInputSource } from './input/keyboardInputSource.js';
import * as PIXI from './pixi/pixi.js';
import {
  BaseTexture,
  Container,
  PRECISION,
  Rectangle,
  SCALE_MODES,
  Sprite,
  Texture,
} from './pixi/pixi.js';
import { IPlayerInput, ISystemInput } from './input.js';
import { StageRenderer } from './stage/stageRenderer.js';
import { FpsRenderer } from './fpsRender.js';
import { kenResource } from './fighters/kenResource.js';

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

const playerInput: IPlayerInput[] = [
  {
    left: false,
    right: false,
    jump: false,
    down: false,
    lightPunch: false,
  },
  {
    left: false,
    right: false,
    jump: false,
    down: false,
    lightPunch: false,
  },
];

const systemInput: ISystemInput = {
  pause: {
    held: false,
    downEvent: false,
    upEvent: false,
  },
  advanceFrame: {
    held: false,
    downEvent: false,
    upEvent: false,
  },
};

function setViewSizeFromWindow(): void {
  const widthRatio = Math.floor(window.innerWidth / 384);
  const heightRatio = Math.floor(window.innerHeight / 224);
  const scaleFactor = Math.max(Math.min(widthRatio, heightRatio), 1);

  console.log(`Resize scale factor: ${scaleFactor}`);

  app.stage.scale = { x: scaleFactor, y: scaleFactor };
  app.renderer.resize(384 * scaleFactor, 224 * scaleFactor);
}

let stageRenderer: StageRenderer;

window.addEventListener('load', async () => {
  PIXI.Loader.shared
    .add('assets/images/kens-stage.png')
    .add(kenResource.texturePath)
    .add('assets/images/misc.png')
    .load(setup);
});

function setup() {
  setViewSizeFromWindow();
  window.addEventListener('resize', (event) => {
    setViewSizeFromWindow();
  });

  window.document.body.appendChild(app.view);

  const _ = new KeyboardInputSource(playerInput, systemInput);

  const kenSpriteSheet = BaseTexture.from(kenResource.texturePath, {
    scaleMode: SCALE_MODES.NEAREST,
  });

  const playerShadowSprites: Sprite[] = [];
  const shadowResource = kenResource.frames.get('shadow')!;

  for (let p = 0; p < 2; ++p) {
    const shadowTexture = new Texture(kenSpriteSheet);
    const shadowSprite = Sprite.from(shadowTexture);
    shadowSprite.anchor.x = 0.5;
    shadowSprite.anchor.y = 0;
    shadowSprite.texture.frame = new Rectangle(
      shadowResource.frame.x,
      shadowResource.frame.y,
      shadowResource.frame.width,
      shadowResource.frame.height
    );

    playerShadowSprites.push(shadowSprite);
  }

  const playerSprites: Sprite[] = [];

  for (let p = 0; p < 2; ++p) {
    const texture = new Texture(kenSpriteSheet);
    const sprite = Sprite.from(texture);
    sprite.anchor.x = 0; // conventional origin that we manage in software (as the offsets vary from from to frame)
    sprite.anchor.y = 0;
    sprite.pivot.x = 0.5; // Make flipping left / right simple
    playerSprites.push(sprite);
  }

  const characterSimulations = [
    new CharacterSimulation(
      { x: 384 - 88, y: 216 },
      playerSprites[0],
      playerShadowSprites[0]
    ),
    new CharacterSimulation(
      { x: 384 + 88, y: 216 },
      playerSprites[1],
      playerShadowSprites[1]
    ),
  ];

  characterSimulations[0].initialise(characterSimulations[1]);
  characterSimulations[1].initialise(characterSimulations[0]);

  const camera = new Camera({ x: 384 - 192, y: 16 }, characterSimulations);
  const gameSimulation = new FightSimulation(characterSimulations, camera);
  const battleManager = new Battle(gameSimulation);

  const stageContainer = new Container();
  stageRenderer = new StageRenderer(stageContainer, camera);
  app.stage.addChild(stageContainer);

  // Add sprites to the stage container in render order
  stageContainer.addChild(playerShadowSprites[0]);
  stageContainer.addChild(playerShadowSprites[1]);
  stageContainer.addChild(playerSprites[0]);
  stageContainer.addChild(playerSprites[1]);

  const statusAreaRenderer = new StatusAreaRenderer(
    battleManager,
    BaseTexture.from('assets/images/misc.png'),
    app.stage
  );

  const characterOrigins = [new PIXI.Graphics(), new PIXI.Graphics()];
  for (const origin of characterOrigins) {
    origin.lineStyle({ width: 2, color: 0xffffff, alpha: 0.3 });
    origin.moveTo(-5, 0);
    origin.lineTo(5, 0);
    origin.moveTo(0, 5);
    origin.lineTo(0, -5);
    stageContainer.addChild(origin);
  }

  const characterBodies = [new PIXI.Graphics(), new PIXI.Graphics()];

  for (let c = 0; c < characterBodies.length; ++c) {
    characterBodies[c].lineStyle({ width: 1, color: 0x00ff00, alpha: 0.7 });
    characterBodies[c].drawRect(
      0,
      0,
      characterSimulations[c].body.width,
      characterSimulations[c].body.height
    );

    stageContainer.addChild(characterBodies[c]);
  }

  const fpsCounter = new FpsRenderer(app.stage);

  const playerTwoGameController = new GameControllerInputSource();

  let paused = false;

  app.ticker.add((framesDelta) => {
    fpsCounter.update(app.ticker.FPS);

    if (systemInput.pause.downEvent) {
      systemInput.pause.downEvent = false;
      paused = !paused;
    }

    if (paused && !systemInput.advanceFrame.downEvent) {
      return;
    }

    if (systemInput.advanceFrame.downEvent) {
      systemInput.advanceFrame.downEvent = false;
    }

    let frameCount = Math.round(framesDelta);

    while (frameCount-- > 0) {
      // Input handling
      const playerTwoInput = playerTwoGameController.poll();
      if (playerTwoInput) {
        playerInput[1] = playerTwoInput;
      }

      // Network update

      // Fight simulation update
      gameSimulation.update(playerInput);

      // Store game state

      //
      // Rendering
      //
      // Game rendering
      stageRenderer.render();

      for (let c = 0; c < characterSimulations.length; ++c) {
        characterSimulations[c].render();
      }

      // Physics rendering
      for (let c = 0; c < characterSimulations.length; ++c) {
        characterOrigins[c].position = characterSimulations[c].physics.position;
        characterBodies[c].position = {
          x: characterSimulations[c].body.x,
          y: characterSimulations[c].body.y,
        };

        const body = characterSimulations[c].body;
        characterBodies[c].clear();
        characterBodies[c].lineStyle({ width: 1, color: 0x00ff00, alpha: 0.7 });

        characterBodies[c].drawRect(
          0,
          0,
          characterSimulations[c].body.width,
          characterSimulations[c].body.height
        );
      }

      // HUD rendering
      statusAreaRenderer.render();
    }
  });
}
