import { ICharacter } from './character.js';
import { IRect, IVector2D } from './geometry.js';
import { ISize } from './pixi/pixi.js';

const ViewportSize: ISize = {
  width: 384,
  height: 224,
};

const ScrollRegionWidth = 100;

export class Camera {
  private _fighters: ICharacter[];
  private _viewPort: IRect;

  public constructor(initialPosition: IVector2D, fighters: ICharacter[]) {
    this._viewPort = {
      ...initialPosition,
      width: ViewportSize.width,
      height: ViewportSize.height,
    };

    this._fighters = fighters;
  }

  public get position(): IVector2D {
    return { x: this._viewPort.x, y: this._viewPort.y };
  }

  public update(): void {
    this.updateHorizontal();
    this.updateVertical();
  }

  private updateHorizontal(): void {
    let leftFighter, rightFighter: ICharacter;

    if (
      this._fighters[0].physics.position.x <=
      this._fighters[1].physics.position.x
    ) {
      leftFighter = this._fighters[0];
      rightFighter = this._fighters[1];
    } else {
      leftFighter = this._fighters[1];
      rightFighter = this._fighters[0];
    }

    const left = leftFighter.physics.position.x;
    const right = rightFighter.physics.position.x;

    const centreViewport = {
      x: this._viewPort.x + ScrollRegionWidth,
      width: this._viewPort.width - ScrollRegionWidth * 2,
    };

    if (this.fightersAreInCentre(centreViewport, left, right)) {
      return;
    }

    if (
      left < centreViewport.x &&
      right > centreViewport.x + centreViewport.width
    ) {
      this._viewPort.x = Math.floor(
        left + (right - left) / 2 - this._viewPort.width / 2 + 0.5
      );
      return;
    }

    if (left < centreViewport.x) {
      this._viewPort.x -= centreViewport.x - left;
      return;
    }

    if (right > centreViewport.x + centreViewport.width) {
      this._viewPort.x += right - (centreViewport.x + centreViewport.width);
    }
  }

  private fightersAreInCentre(
    centreViewport: { x: number; width: number },
    leftEdge: number,
    rightEdge: number
  ): boolean {
    if (leftEdge < centreViewport.x) {
      return false;
    }

    if (rightEdge > centreViewport.x + centreViewport.width) {
      return false;
    }

    return true;
  }

  private updateVertical(): void {
    this._viewPort.y =
      6 +
      Math.floor(
        Math.min(
          this._fighters[0].physics.position.y,
          this._fighters[1].physics.position.y
        ) / 20
      );
  }
}
