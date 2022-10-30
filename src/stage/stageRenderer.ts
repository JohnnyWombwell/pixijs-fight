import { IAnimation, ISpriteSheet } from '../animation/animation.js';
import {
  IRunningAnimation,
  refreshAnimation,
  startAnimation,
} from '../animation/render.js';
import { Camera } from '../camera.js';
import { pixiRectFromRect } from '../geometry.js';
import { BaseTexture, Container, Sprite, Texture } from '../pixi/pixi.js';
import {
  kenStageAnimationPositions,
  kenStageSpriteSheet,
} from './kenStageResource.js';

export class StageRenderer {
  private readonly _camera: Camera;
  private _container: Container;
  private _backgroundLayer!: Sprite;
  private _midLayer!: Sprite;
  private _animations: IRunningAnimation[] = [];

  public constructor(container: Container, camera: Camera) {
    this._container = container;
    this._camera = camera;

    const loadedSpriteSheet = BaseTexture.from(kenStageSpriteSheet.texturePath);
    this.setupStage(kenStageSpriteSheet, loadedSpriteSheet);
    this.setupKenStage(loadedSpriteSheet);

    for (const animation of this._animations) {
      startAnimation(animation);
    }
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

    const stagePlatform = new Sprite(new Texture(loadedSpriteSheet));
    stagePlatform.texture.frame = pixiRectFromRect(
      spriteSheet.frames.get('platform')!.frame
    );
    stagePlatform.y = 176;
    this._container.addChild(stagePlatform);
  }

  private setupKenStage(loadedSpriteSheet: BaseTexture): void {
    const flagAnimation: IRunningAnimation = {
      definition: kenStageSpriteSheet.animations.get('flag')!,
      spriteSheetFrames: kenStageSpriteSheet.frames,
      spriteSheet: new Sprite(new Texture(loadedSpriteSheet)),
      currentSequenceIndex: 0,
      frameRefreshes: 0,
    };

    this._backgroundLayer.addChild(flagAnimation.spriteSheet);
    flagAnimation.spriteSheet.position =
      kenStageAnimationPositions.get('flag')!;

    this._animations.push(flagAnimation);

    const crowdAnimations = [...kenStageSpriteSheet.animations].filter(
      ([k, v]) => k.startsWith('crowd')
    );

    for (const [name, animation] of crowdAnimations) {
      const runningAnimation: IRunningAnimation = {
        definition: animation,
        spriteSheetFrames: kenStageSpriteSheet.frames,
        spriteSheet: new Sprite(new Texture(loadedSpriteSheet)),
        currentSequenceIndex: 0,
        frameRefreshes: 0,
      };

      runningAnimation.spriteSheet.position =
        kenStageAnimationPositions.get(name)!;

      this._animations.push(runningAnimation);
      this._midLayer.addChild(runningAnimation.spriteSheet);
    }
  }
}
