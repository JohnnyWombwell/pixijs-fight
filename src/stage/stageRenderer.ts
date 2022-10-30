import { ISpriteSheet } from '../animation/animation.js';
import {
  IRunningAnimation,
  refreshAnimation,
  startAnimation,
} from '../animation/render.js';
import { Camera } from '../camera.js';
import { pixiRectFromRect } from '../geometry.js';
import { BaseTexture, Container, Sprite, Texture } from '../pixi/pixi.js';
import { kenStageResource } from './kenStageResource.js';

export class StageRenderer {
  private readonly _camera: Camera;
  private _container: Container;
  private _backgroundLayer!: Sprite;
  private _midLayer!: Sprite;
  private _flagAnimation!: IRunningAnimation;

  public constructor(container: Container, camera: Camera) {
    this._container = container;
    this._camera = camera;

    const loadedSpriteSheet = BaseTexture.from(kenStageResource.texturePath);
    this.setupStage(kenStageResource, loadedSpriteSheet);
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

    refreshAnimation(this._flagAnimation);
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
    this._flagAnimation = {
      definition: kenStageResource.animations.get('flag')!,
      spriteSheetFrames: kenStageResource.frames,
      spriteSheet: new Sprite(new Texture(loadedSpriteSheet)),
      currentSequenceIndex: 0,
      frameRefreshes: 0,
    };

    this._backgroundLayer.addChild(this._flagAnimation.spriteSheet);
    this._flagAnimation.spriteSheet.position = { x: 471, y: 16 };

    startAnimation(this._flagAnimation);
  }
}
