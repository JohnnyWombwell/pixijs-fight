import { ICharacter } from './character.js';
import { IRectangle, IVector2D } from './geometry.js';
import { ISize } from './pixi/pixi.js';

const ViewportSize: ISize = {
  width: 384,
  height: 224,
};

const StageSize: ISize = {
  width: 768,
  height: 256,
};

const ScrollRegionWidth = 100;

export class Camera {
  private readonly _fighters: ICharacter[];
  private readonly _viewPort: IRectangle;

  public constructor(initialPosition: IVector2D, fighters: ICharacter[]) {
    this._viewPort = {
      ...initialPosition,
      width: ViewportSize.width,
      height: ViewportSize.height,
    };

    this._fighters = fighters;
  }

  public get viewPort(): IRectangle {
    return this._viewPort;
  }

  public update(): void {
    this.updateHorizontal();
    this.updateVertical();
    this.ensureInStageBounds();
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

  private updateVertical(): void {
    const minHeight = Math.min(
      this._fighters[0].physics.position.y,
      this._fighters[1].physics.position.y
    );

    const heightAdjust = Math.floor((216 - minHeight) / 6);

    this._viewPort.y =
      (StageSize.height - ViewportSize.height) / 2 - heightAdjust;
  }

  private ensureInStageBounds(): void {
    this._viewPort.x = Math.min(
      this._viewPort.x,
      StageSize.width - this._viewPort.width
    );
    this._viewPort.x = Math.max(this._viewPort.x, 0);
    this._viewPort.y = Math.min(
      this._viewPort.y,
      StageSize.height - this._viewPort.height
    );
    this._viewPort.y = Math.max(this._viewPort.y, 0);
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
}
