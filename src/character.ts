import { IRectangle, IVector2D } from './geometry';
import { IPhysicsComponent } from './physics';
import { IPlayerInput } from './playerInput';

export interface ICharacter {
  get body(): IRectangle;
  get physics(): IPhysicsComponent;
  update(input: IPlayerInput): void;
}

enum CharacterState {
  Idle,
  Run,
  Jump,
}

const groundLevel = 300;
const gravity = 1.2;

export class CharacterSimulation implements ICharacter {
  private readonly _physics: IPhysicsComponent;
  private _state: CharacterState = CharacterState.Idle;

  private _size: IVector2D = {
    x: 80,
    y: 180,
  };

  public constructor(initialPosition: IVector2D) {
    this._physics = {
      position: initialPosition,
      velocity: { x: 0, y: 0 },
    };
  }

  get physics(): IPhysicsComponent {
    return this._physics;
  }

  public get body(): IRectangle {
    return {
      position: this._physics.position,
      size: this._size,
    };
  }

  public update(input: IPlayerInput): void {
    switch (this._state) {
      case CharacterState.Idle:
        this.idleUpdate(input);
        break;
      case CharacterState.Run:
        this.runUpdate(input);
        break;
    }

    this.applyPhysics();
  }

  private applyPhysics(): void {
    this._physics.position.x += this._physics.velocity.x;
    this._physics.position.y += this._physics.velocity.y;

    if (this._physics.position.y + this._size.y >= groundLevel) {
      this._physics.position.y = groundLevel - this._size.y;
      this._physics.velocity.y = 0;
    } else {
      this._physics.velocity.y += gravity;
    }

    if (
      this._state === CharacterState.Jump &&
      this._physics.position.y + this._size.y === groundLevel
    ) {
      if (this._physics.velocity.x) {
        this.changeStage(CharacterState.Run);
      } else {
        this.changeStage(CharacterState.Idle);
      }
    }
  }

  private idleUpdate(input: IPlayerInput): void {
    if (input.jump) {
      this._physics.velocity.y = -25;

      if (input.left) {
        this._physics.velocity.x = -5;
      } else if (input.right) {
        this._physics.velocity.x = 5;
      }

      this.changeStage(CharacterState.Jump);
      return;
    }

    if (input.left) {
      this._physics.velocity.x = -5;
      this.changeStage(CharacterState.Run);
    } else if (input.right) {
      this._physics.velocity.x = 5;
      this.changeStage(CharacterState.Run);
    }
  }

  private runUpdate(input: IPlayerInput): void {
    if (input.jump) {
      this._physics.velocity.y = -25;

      if (input.left) {
        this._physics.velocity.x = -5;
      } else if (input.right) {
        this._physics.velocity.x = 5;
      }

      this.changeStage(CharacterState.Jump);
      return;
    }

    if (input.left) {
      this._physics.velocity.x = -5;
    } else if (input.right) {
      this._physics.velocity.x = 5;
    } else {
      this._physics.velocity.x = 0;
      this.changeStage(CharacterState.Idle);
    }
  }

  private changeStage(newState: CharacterState) {
    if (newState === this._state) {
      return;
    }

    console.log(
      `State: ${CharacterState[this._state]} -> ${CharacterState[newState]}`
    );
    this._state = newState;
  }
}
