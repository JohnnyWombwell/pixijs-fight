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
  Walk,
  Jump,
  Crouch,
}

const groundLevel = 180;
const gravity = 0.4;

export class CharacterSimulation implements ICharacter {
  private readonly _physics: IPhysicsComponent;
  private _state: CharacterState = CharacterState.Idle;
  private _size: IVector2D = {
    x: 30,
    y: 60,
  };

  private _offset: IVector2D = {
    x: this._size.x / -2,
    y: -this._size.y,
  };

  private readonly _walkSpeed = 3;

  public constructor(initialPosition: IVector2D) {
    this._physics = {
      position: initialPosition,
      velocity: { x: 0, y: 0 },
    };
  }

  public get physics(): IPhysicsComponent {
    return this._physics;
  }

  public get body(): IRectangle {
    return {
      position: {
        x: this._physics.position.x + this._offset.x,
        y: this._physics.position.y + this._offset.y,
      },
      size: this._size,
    };
  }

  public update(input: IPlayerInput): void {
    switch (this._state) {
      case CharacterState.Idle:
        this.idleUpdate(input);
        break;
      case CharacterState.Walk:
        this.walkUpdate(input);
        break;
    }

    this.applyPhysics();
  }

  private applyPhysics(): void {
    this._physics.position.x += this._physics.velocity.x;
    this._physics.position.y += this._physics.velocity.y;

    if (this._physics.position.y >= groundLevel) {
      this._physics.position.y = groundLevel;
      this._physics.velocity.y = 0;
    } else {
      this._physics.velocity.y += gravity;
    }

    if (
      this._state === CharacterState.Jump &&
      this._physics.position.y === groundLevel
    ) {
      if (this._physics.velocity.x) {
        this.changeStage(CharacterState.Walk);
      } else {
        this.changeStage(CharacterState.Idle);
      }
    }
  }

  private idleUpdate(input: IPlayerInput): void {
    if (input.jump) {
      this._physics.velocity.y = -8;

      if (input.left) {
        this._physics.velocity.x = -this._walkSpeed;
      } else if (input.right) {
        this._physics.velocity.x = this._walkSpeed;
      }

      this.changeStage(CharacterState.Jump);
      return;
    }

    if (input.left) {
      this._physics.velocity.x = -this._walkSpeed;
      this.changeStage(CharacterState.Walk);
    } else if (input.right) {
      this._physics.velocity.x = this._walkSpeed;
      this.changeStage(CharacterState.Walk);
    }
  }

  private walkUpdate(input: IPlayerInput): void {
    if (input.jump) {
      this._physics.velocity.y = -8;

      if (input.left) {
        this._physics.velocity.x = -this._walkSpeed;
      } else if (input.right) {
        this._physics.velocity.x = this._walkSpeed;
      }

      this.changeStage(CharacterState.Jump);
      return;
    }

    if (input.left) {
      this._physics.velocity.x = -this._walkSpeed;
    } else if (input.right) {
      this._physics.velocity.x = this._walkSpeed;
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
