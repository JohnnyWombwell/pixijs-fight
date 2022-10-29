import { ISpriteSheet } from "../animation/spriteSheetResource.js";
import { Camera } from "../camera.js";
import { pixiRectFromRect } from "../geometry.js";
import { BaseTexture, Container, Sprite, Texture } from "../pixi/pixi.js";
import { kenStageResource } from "./kenStageResource.js";

export class StageRenderer {
  private readonly _camera: Camera;
  private _container: Container;
  private _backgroundLayer!: Sprite;
  private _midLayer!: Sprite;

  public constructor(container: Container, camera: Camera) {
    this._container = container;
    this._camera = camera;
    this.setupStage(kenStageResource);
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
  }

  private setupStage(spriteSheet: ISpriteSheet): void {
    const loadedSpriteSheet = BaseTexture.from(spriteSheet.texturePath);

    this._backgroundLayer = new Sprite(new Texture(loadedSpriteSheet));
    this._backgroundLayer.texture.frame = pixiRectFromRect(spriteSheet.frames.get('background')!.frame);
    this._backgroundLayer.y = 0;
    // x will be set by parallax effect
    this._container.addChild(this._backgroundLayer);

    this._midLayer = new Sprite(new Texture(loadedSpriteSheet));
    this._midLayer.texture.frame = pixiRectFromRect(spriteSheet.frames.get('layer-1')!.frame);;
    this._midLayer.y = -1;
    // x will be set by parallax effect
    this._container.addChild(this._midLayer);

    const stagePlatform = new Sprite(new Texture(loadedSpriteSheet));
    stagePlatform.texture.frame = pixiRectFromRect(spriteSheet.frames.get('platform')!.frame);
    stagePlatform.y = 176;
    this._container.addChild(stagePlatform);
  }
}