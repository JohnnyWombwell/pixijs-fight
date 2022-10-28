import { Battle } from './battle.js';
import { Camera } from './camera.js';
import { CharacterSimulation } from './character.js';
import { FightSimulation } from './fightSimulation.js';
import { StatusAreaRenderer } from './hud/statusAreaRenderer.js';
import { GameControllerInputSource } from './input/gameControllerInputSource.js';
import { KeyboardInputSource } from './input/keyboardInputSource.js';
import { kenResource } from './KenResource.js';
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
import { IPlayerInput } from './playerInput.js';

PIXI.settings.ROUND_PIXELS = true;
PIXI.settings.RENDER_OPTIONS.antialias = false;
PIXI.settings.SCALE_MODE = SCALE_MODES.NEAREST;
PIXI.settings.PRECISION_FRAGMENT = PRECISION.HIGH;

// Create the application helper and add its render target to the page
const app = new PIXI.Application({
  width: 384,
  height: 224,
  backgroundColor: 0x000000
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

function setViewSizeFromWindow(): void {
  const widthRatio = Math.floor(window.innerWidth / 384);
  const heightRatio = Math.floor(window.innerHeight / 224);
  const scaleFactor = Math.max(Math.min(widthRatio, heightRatio), 1);

  console.log(`Resize scale factor: ${scaleFactor}`);

  app.stage.scale = { x: scaleFactor, y: scaleFactor };
  app.renderer.resize(384 * scaleFactor, 224 * scaleFactor);
}

let stageBackground: Sprite;
let stageBoat: Sprite;

function setupStage(): Container {
  const stageSpriteSheet = BaseTexture.from('assets/images/kens-stage.png');

  const container = new Container();

  stageBackground = new Sprite(new Texture(stageSpriteSheet));
  stageBackground.texture.frame = new Rectangle(161, 208, 590, 176);
  stageBackground.y = 0;
  // x will be set by parallax effect
  container.addChild(stageBackground);

  stageBoat = new Sprite(new Texture(stageSpriteSheet));
  stageBoat.texture.frame = new Rectangle(8, 16, 521, 180);
  stageBoat.y = -1;
  // x will be set by parallax effect
  container.addChild(stageBoat);

  const stageForeground = new Sprite(new Texture(stageSpriteSheet));
  stageForeground.texture.frame = new Rectangle(72, 392, 768, 72);
  stageForeground.y = 176;
  container.addChild(stageForeground);

  container.position = { x: -(container.width / 2) + 192, y: -16 };

  return container;
}

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

  const _ = new KeyboardInputSource(playerInput);


  const stageContainer = setupStage();
  app.stage.addChild(stageContainer);

  const kenSpriteSheet = BaseTexture.from(kenResource.texturePath, {
    scaleMode: SCALE_MODES.NEAREST,
  });

  const playerShadowSprites: Sprite[] = [];

  for (let p = 0; p < 2; ++p) {
    const shadowTexture = new Texture(kenSpriteSheet);
    const shadowSprite = Sprite.from(shadowTexture);
    shadowSprite.anchor.x = 0.5;
    shadowSprite.anchor.y = 0;
    shadowSprite.texture.frame = new Rectangle(
      kenResource.image.shadow.source.x,
      kenResource.image.shadow.source.y,
      kenResource.image.shadow.source.width,
      kenResource.image.shadow.source.height
    );

    stageContainer.addChild(shadowSprite);
    playerShadowSprites.push(shadowSprite);
  }

  const playerSprites: Sprite[] = [];

  for (let p = 0; p < 2; ++p) {
    const texture = new Texture(kenSpriteSheet);
    const sprite = Sprite.from(texture);
    sprite.anchor.x = 0; // conventional origin that we manage in software (as the offsets vary from from to frame)
    sprite.anchor.y = 0;
    sprite.pivot.x = 0.5; // Make flipping left / right simple
    stageContainer.addChild(sprite);
    playerSprites.push(sprite);
  }

  window.document.body.appendChild(app.view);

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
  const statusAreaRenderer = new StatusAreaRenderer(
    battleManager,
    BaseTexture.from('assets/images/misc.png'),
    app.stage);

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

  let elapsedFrames = 0;
  let cameraVelocity = 1;

  const playerTwoGameController = new GameControllerInputSource();

  app.ticker.add((framesDelta) => {
    elapsedFrames++;

    let frameCount = Math.round(framesDelta);

    // if (elapsedFrames % 20 > 0) {
    //   frameCount = 0;
    // }

    while (frameCount-- > 0) {
      // Input handling
      const playerTwoInput = playerTwoGameController.poll();
      if (playerTwoInput) {
        playerInput[1] = playerTwoInput;
      }

      // Network update

      // Fight simulation update
      gameSimulation.update(playerInput);

      // Update camera

      // Store game state

      if (stageContainer.x >= 0) {
        cameraVelocity = -1;
      }

      if (stageContainer.x === 384 - 768) {
        cameraVelocity = 1;
      }

      stageContainer.position = {
        x: -camera.viewPort.x,
        y: -camera.viewPort.y,
      };

      stageBackground.position = {
        x: Math.floor(
          stageContainer.position.x / 2.157303 - stageContainer.position.x + 0.5
        ),
        y: stageBackground.position.y,
      };

      stageBoat.position = {
        x: Math.floor(
          stageContainer.position.x / 1.613445 - stageContainer.position.x + 0.5
        ),
        y: stageBoat.position.y,
      };

      //
      // Rendering
      //
      // Game rendering
      for (let c = 0; c < characterSimulations.length; ++c) {
        characterSimulations[c].render();
      }

      // Physics rendering
      for (let c = 0; c < characterSimulations.length; ++c) {
        characterOrigins[c].position = characterSimulations[c].physics.position;
        characterBodies[c].position = { x: characterSimulations[c].body.x, y: characterSimulations[c].body.y };

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
