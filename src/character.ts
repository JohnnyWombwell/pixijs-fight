import { IRectangle, IVector2D } from './geometry';
import { IPhysicsComponent } from './physics';
import { IPlayerInput } from './playerInput';

export interface ICharacter {
  get body(): IRectangle;
  update(input: IPlayerInput): void;
}

enum CharacterState {
  Idle,
  Run,
  Jump,
}

export class CharacterSimulation implements ICharacter {
  private readonly _physics: IPhysicsComponent;

  private _size: IVector2D = {
    x: 50,
    y: 100,
  };

  public constructor(initialPosition: IVector2D) {
    this._physics = {
      position: initialPosition,
      velocity: { x: 0, y: 0 },
    };
  }

  public get body(): IRectangle {
    return {
      position: this._physics.position,
      size: this._size,
    };
  }

  public update(input: IPlayerInput): void {
    if (input.left) {
      this._physics.velocity.x = -5;
    } else if (input.right) {
      this._physics.velocity.x = 5;
    } else {
      this._physics.velocity.x = 0;
    }

    this.applyPhysics();
  }

  private applyPhysics(): void {
    this._physics.position.x += this._physics.velocity.x;
    this._physics.position.y += this._physics.velocity.y;
  }
}
