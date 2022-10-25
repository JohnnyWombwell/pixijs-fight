import { Camera } from './camera.js';
import { CharacterSimulation } from './character.js';
import { GameSimulation } from './gameSimulation.js';
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
  const stageSpriteSheet = BaseTexture.from('assets/images/kens-stage.png', {
    scaleMode: SCALE_MODES.NEAREST,
  });

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
  // Load assets
  PIXI.Loader.shared
    .add('assets/images/kens-stage.png')
    .add(kenResource.texturePath)
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

  const text = new PIXI.Text('pixijs Fighter', {
    fontFamily: 'Press Start 2P',
    fontSize: 12,
  });
  text.x = 20;
  text.y = 10;
  text.style.fill = 'green';

  app.stage.addChild(text);

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
  const gameSimulation = new GameSimulation(characterSimulations, camera);

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
  characterBodies[0].beginFill(0xff0000, 0.3);
  characterBodies[1].beginFill(0x00ff00, 0.3);

  for (let c = 0; c < characterBodies.length; ++c) {
    characterBodies[c].pivot = {
      x: characterSimulations[c].body.width / 2,
      y: 0,
    };

    characterBodies[c].drawRect(
      0,
      0,
      characterSimulations[c].body.width,
      -characterSimulations[c].body.height
    );

    characterBodies[c].lineStyle({ width: 1, color: 0x000000, alpha: 0.5 });
    characterBodies[c].moveTo(15, -25);
    characterBodies[c].lineTo(
      characterSimulations[c].body.width - 5,
      -characterSimulations[c].body.height / 2
    );
    characterBodies[c].lineTo(15, -(characterSimulations[c].body.height - 25));

    stageContainer.addChild(characterBodies[c]);
  }

  let elapsedFrames = 0;
  let cameraVelocity = 1;

  const playerTwoGameController = new GameControllerInputSource();

  app.ticker.add((framesDelta) => {
    elapsedFrames++;

    let frameCount = Math.round(framesDelta);

    // if (elapsedFrames % 10 > 0) {
    //   frameCount = 0;
    // }

    while (frameCount-- > 0) {
      // Input handling

      // Network update

      const playerTwoInput = playerTwoGameController.poll();
      if (playerTwoInput) {
        playerInput[1] = playerTwoInput;
      }

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

      console.log(
        `camera position: [${camera.viewPort.x}, ${camera.viewPort.y}]`
      );

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
        characterBodies[c].position = characterSimulations[c].physics.position;
        characterBodies[c].scale.x = characterSimulations[c].direction;
      }
    }
  });
}
