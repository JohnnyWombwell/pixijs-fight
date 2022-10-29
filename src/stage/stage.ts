import { Camera } from "../camera.js";
import { BaseTexture, Container, Rectangle, Sprite, Texture } from "../pixi/pixi.js";

export class StageRenderer {
  private readonly _camera: Camera;
  private _container: Container;
  private _stageBackground!: Sprite;
  private _stageBoat!: Sprite;

  public constructor(container: Container, camera: Camera) {
    this._container = container;
    this._camera = camera;

    this.setupKensStage();
  }

  public render(): void {
    this._container.position = {
      x: -this._camera.viewPort.x,
      y: -this._camera.viewPort.y,
    };

    this._stageBackground.position = {
      x: Math.floor(
        this._container.position.x / 2.157303 - this._container.position.x + 0.5
      ),
      y: this._stageBackground.position.y,
    };

    this._stageBoat.position = {
      x: Math.floor(
        this._container.position.x / 1.613445 - this._container.position.x + 0.5
      ),
      y: this._stageBoat.position.y,
    };
  }

  private setupKensStage(): void {
    const stageSpriteSheet = BaseTexture.from('assets/images/kens-stage.png');

    this._stageBackground = new Sprite(new Texture(stageSpriteSheet));
    this._stageBackground.texture.frame = new Rectangle(161, 208, 590, 176);
    this._stageBackground.y = 0;
    // x will be set by parallax effect
    this._container.addChild(this._stageBackground);

    this._stageBoat = new Sprite(new Texture(stageSpriteSheet));
    this._stageBoat.texture.frame = new Rectangle(8, 16, 521, 180);
    this._stageBoat.y = -1;
    // x will be set by parallax effect
    this._container.addChild(this._stageBoat);

    const stageForeground = new Sprite(new Texture(stageSpriteSheet));
    stageForeground.texture.frame = new Rectangle(72, 392, 768, 72);
    stageForeground.y = 176;
    this._container.addChild(stageForeground);

    this._container.position = { x: -(this._container.width / 2) + 192, y: -16 };
  }
}