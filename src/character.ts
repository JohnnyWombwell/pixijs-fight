import { IRectangle, IVector2D } from './geometry.js';
import { kenResource } from './KenResource.js';
import { IPhysicsComponent } from './physics.js';
import { Rectangle, Sprite } from './pixi/pixi.js';
import { IPlayerInput } from './playerInput.js';

export interface ICharacter {
  get body(): IRectangle;
  get physics(): IPhysicsComponent;
  get direction(): Direction;
  set direction(d: Direction);
  update(input: IPlayerInput): void;
}

export interface ISprite {
  render(): void;
}

const groundLevel = 200;
const gravity = 0.3;
const jumpAcceleration = 7.5;

interface ICharacterState {
  get name(): string;
  enter: () => void;
  update: (input: IPlayerInput) => void;
}

export enum Facing {
  Right = 1,
  Left = -1,
}

export type Direction = Facing.Right | Facing.Left;

export class CharacterSimulation implements ICharacter, ISprite {
  private readonly _physics: IPhysicsComponent;
  private _size: IVector2D = {
    x: 36,
    y: 80,
  };

  private _offset: IVector2D = {
    x: this._size.x / -2,
    y: -this._size.y,
  };

  private _direction: Direction = 1;
  private readonly _walkSpeed = 4;
  private _currentState?: ICharacterState = undefined;
  private _opponent?: ICharacter;
  private _sprite: Sprite;
  private _framesElapsed = 0;

  public constructor(initialPosition: IVector2D, sprite: Sprite) {
    this._physics = {
      position: initialPosition,
      velocity: { x: 0, y: 0 },
    };

    this._sprite = sprite;

    sprite.texture.textureCacheIds.forEach((id) =>
      console.log(`${initialPosition.x} texture ID: ${id}`)
    );

    this.changeState(this._states.idle);
  }

  public initialise(opponent: ICharacter): void {
    this._opponent = opponent;
    this._direction =
      this._physics.position.x <= this._opponent.physics.position.x ? 1 : -1;
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

  public get direction(): Direction {
    return this._direction;
  }

  public set direction(d: Direction) {
    this._direction = d;
  }

  public update(input: IPlayerInput): void {
    let directionalInput = input;

    if (this._direction < 0) {
      directionalInput = {
        ...input,
        left: input.right,
        right: input.left,
      };
    }

    this._currentState?.update(directionalInput);
    this.applyPhysics();
  }

  framesHold = 4;

  public render(): void {
    if (!this._currentState) {
      return;
    }

    const frameIndex = Math.floor(this._framesElapsed / this.framesHold);

    if (!Object.hasOwn(kenResource.animation, this._currentState.name)) {
      return;
    }

    const frame = kenResource.animation[this._currentState.name][frameIndex];

    this._sprite.texture.frame = new Rectangle(
      frame.source.x,
      frame.source.y,
      frame.source.width,
      frame.source.height
    );

    this._sprite.x = this._physics.position.x;
    this._sprite.y = this._physics.position.y;
    this._sprite.scale.x = this._direction;

    this._framesElapsed += 1;

    if (
      Math.floor(this._framesElapsed / this.framesHold) >=
      kenResource.animation[this._currentState.name].length
    ) {
      if (frame.frameCount && frame.frameCount < 0) {
        this._framesElapsed = frameIndex * this.framesHold;
      } else {
        this._framesElapsed = 0;
      }
    }
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
  }

  private readonly _states: Record<string, ICharacterState> = {
    idle: {
      name: 'idle',
      enter: () => {
        this._physics.velocity.x = 0;
        this._physics.velocity.y = 0;
      },
      update: this.idleUpdate.bind(this),
    },
    walkForward: {
      name: 'walkForward',
      enter: () => {
        this._physics.velocity.x = this._walkSpeed * this._direction;
      },
      update: this.walkForwardUpdate.bind(this),
    },
    walkBackward: {
      name: 'walkBackward',
      enter: () => {
        this._physics.velocity.x = -this._walkSpeed * this._direction;
      },
      update: this.walkBackwardUpdate.bind(this),
    },
    neutralJump: {
      name: 'neutralJump',
      enter: () => {
        this._physics.velocity.y = -jumpAcceleration;
        this._physics.velocity.x = 0;
      },
      update: this.jumpUpdate.bind(this),
    },
    jumpForward: {
      name: 'jumpForward',
      enter: () => {
        this._physics.velocity.y = -jumpAcceleration;
        this._physics.velocity.x = this._walkSpeed * this._direction;
      },
      update: this.jumpUpdate.bind(this),
    },
    jumpBackward: {
      name: 'jumpBackward',
      enter: () => {
        this._physics.velocity.y = -jumpAcceleration;
        this._physics.velocity.x = -this._walkSpeed * this._direction;
      },
      update: this.jumpUpdate.bind(this),
    },
  };

  private idleUpdate(input: IPlayerInput): void {
    if (input.jump) {
      this.jumpTransition(input);
      return;
    }

    if (input.left) {
      this.changeState(this._states.walkBackward);
    } else if (input.right) {
      this.changeState(this._states.walkForward);
    }

    if (this.hasDirectionChanged()) {
      this._direction *= -1;
    }
  }

  private walkForwardUpdate(input: IPlayerInput): void {
    if (this.hasDirectionChanged()) {
      this._direction *= -1;
    }

    if (input.jump) {
      this.jumpTransition(input);
      return;
    }

    if (input.left) {
      this.changeState(this._states.walkBackward);
      return;
    }

    if (!input.right) {
      this.changeState(this._states.idle);
    }
  }

  private walkBackwardUpdate(input: IPlayerInput): void {
    if (this.hasDirectionChanged()) {
      this._direction *= -1;
    }

    if (input.jump) {
      this.jumpTransition(input);
      return;
    }

    if (input.right) {
      this.changeState(this._states.walkForward);
      return;
    }

    if (!input.left) {
      this.changeState(this._states.idle);
    }
  }

  private jumpUpdate(_: IPlayerInput): void {
    if (this._physics.position.y === groundLevel) {
      this.changeState(this._states.idle);
    }
  }

  private jumpTransition(input: IPlayerInput): void {
    if (input.right) {
      this.changeState(this._states.jumpForward);
    } else if (input.left) {
      this.changeState(this._states.jumpBackward);
    } else {
      this.changeState(this._states.neutralJump);
    }
  }

  private changeState(newState: ICharacterState) {
    if (this._currentState === newState) {
      return;
    }

    console.log(`State: ${this._currentState?.name} -> ${newState.name}`);

    this._framesElapsed = 0;
    newState.enter();

    this._currentState = newState;
  }

  private hasDirectionChanged(): boolean {
    if (
      this.body.position.x + this.body.size.x <
      this._opponent!.body.position.x
    ) {
      return this._direction !== Facing.Right;
    } else if (
      this.body.position.x >
      this._opponent!.body.position.x + this._opponent!.body.size.x
    ) {
      return this._direction !== Facing.Left;
    }

    return false;
  }
}
