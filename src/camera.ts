import { ICharacter } from './character.js';
import { IVector2D } from './geometry.js';

export class Camera {
  private _position: IVector2D;
  private _fighters: ICharacter[];

  public constructor(initialPosition: IVector2D, fighters: ICharacter[]) {
    this._position = { ...initialPosition };
    this._fighters = fighters;
  }

  public get position(): IVector2D {
    return this._position;
  }

  public update() {
    this._position.y =
      -6 -
      Math.floor(
        Math.min(
          this._fighters[0].physics.position.y,
          this._fighters[1].physics.position.y
        ) / 20
      );
  }
}
