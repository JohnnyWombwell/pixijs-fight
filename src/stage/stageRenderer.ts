import { ISpriteSheet } from '../animation/animation.js';
import {
  IRunningAnimation,
  newAnimation,
  refreshAnimation,
} from '../animation/render.js';
import { Camera } from '../camera.js';
import { pixiRectFromRect } from '../geometry.js';
import {
  BaseTexture,
  Container,
  SCALE_MODES,
  Sprite,
  Texture,
} from '../pixi/pixi.js';
import {
  kenStageAnimationPositions,
  kenStageSpriteSheet,
} from './kenStageResource.js';

export class StageRenderer {
  private readonly _camera: Camera;
  private _container: Container;
  private _backgroundLayer!: Sprite;
  private _midLayer!: Sprite;
  private _stagePlatform!: Sprite;
  private _animations: IRunningAnimation[] = [];

  public constructor(container: Container, camera: Camera) {
    this._container = container;
    this._camera = camera;

    const loadedSpriteSheet = BaseTexture.from(
      kenStageSpriteSheet.texturePath,
      { scaleMode: SCALE_MODES.NEAREST }
    );
    this.setupStage(kenStageSpriteSheet, loadedSpriteSheet);
    this.setupKenStage(loadedSpriteSheet);
  }

  public render(): void {
    this._container.position = {
      x: -this._camera.viewPort.x,
      y: -this._camera.viewPort.y,
    };

    this._backgroundLayer.position = {
      x: Math.floor(
        this._container.position.x / 2.157303 - this._container.position.x + 0.5
      ),
      y: this._backgroundLayer.position.y,
    };

    this._midLayer.position = {
      x: Math.floor(
        this._container.position.x / 1.613445 - this._container.position.x + 0.5
      ),
      y: this._midLayer.position.y,
    };

    this._stagePlatform.position = {
      x: Math.floor(
        this._container.position.x / 1.613445 -
          this._container.position.x -
          137 + // magic number for parallax - geometry needs working out
          0.5
      ),
      y: this._stagePlatform.position.y,
    };

    const offset =
      this._camera.viewPort.x - 192 - this._stagePlatform.position.x - 63;

    const skewAngle = Math.atan(offset / (72 - 18)); // platform height - front edge

    this._stagePlatform.skew = { x: -skewAngle, y: 0 };
    this._stagePlatform.scale = { x: 1, y: 1 / Math.cos(skewAngle) };

    for (const animation of this._animations) {
      refreshAnimation(animation);
    }
  }

  private setupStage(
    spriteSheet: ISpriteSheet,
    loadedSpriteSheet: BaseTexture
  ): void {
    this._backgroundLayer = new Sprite(new Texture(loadedSpriteSheet));
    this._backgroundLayer.texture.frame = pixiRectFromRect(
      spriteSheet.frames.get('background')!.frame
    );
    this._backgroundLayer.y = 0;
    // x will be set by parallax effect
    this._container.addChild(this._backgroundLayer);

    this._midLayer = new Sprite(new Texture(loadedSpriteSheet));
    this._midLayer.texture.frame = pixiRectFromRect(
      spriteSheet.frames.get('mid-layer')!.frame
    );
    this._midLayer.y = -1;
    // x will be set by parallax effect
    this._container.addChild(this._midLayer);

    this._stagePlatform = new Sprite(new Texture(loadedSpriteSheet));
    this._stagePlatform.texture.frame = pixiRectFromRect(
      spriteSheet.frames.get('platform')!.frame
    );

    this._stagePlatform.position = { x: -137, y: 176 };

    this._container.addChild(this._stagePlatform);
  }

  private setupKenStage(loadedSpriteSheet: BaseTexture): void {
    const flagAnimation = newAnimation(
      kenStageSpriteSheet.animations.get('flag')!,
      kenStageSpriteSheet.frames,
      new Sprite(new Texture(loadedSpriteSheet))
    );

    this._backgroundLayer.addChild(flagAnimation.sprite);
    flagAnimation.position = kenStageAnimationPositions.get('flag')!;

    this._animations.push(flagAnimation);

    const crowdAnimations = [...kenStageSpriteSheet.animations].filter(
      ([k, v]) => k.startsWith('crowd')
    );

    for (const [name, animation] of crowdAnimations) {
      const runningAnimation = newAnimation(
        animation,
        kenStageSpriteSheet.frames,
        new Sprite(new Texture(loadedSpriteSheet))
      );

      runningAnimation.position = kenStageAnimationPositions.get(name)!;

      this._animations.push(runningAnimation);
      this._midLayer.addChild(runningAnimation.sprite);
    }
  }
}
