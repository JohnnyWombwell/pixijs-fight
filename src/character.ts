import { IRectangle, IVector2D } from './geometry.js';
import { IFrameResource, kenResource } from './KenResource.js';
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
const gravity = 0.4;
const jumpAcceleration = 9.5;
const walkForwardSpeed = 3;
const walkBackwardSpeed = 2;
const jumpForwardSpeed = 2.8;
const jumpBackwardSpeed = 3.75;

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
  private _currentState?: ICharacterState = undefined;
  private _opponent?: ICharacter;
  private _sprite: Sprite;

  private _framesElapsed = 0;
  private _currentAnimation: IFrameResource[];
  private _animationFrame = 0;

  public constructor(initialPosition: IVector2D, sprite: Sprite) {
    this._physics = {
      position: initialPosition,
      velocity: { x: 0, y: 0 },
    };

    this._sprite = sprite;
    this._currentAnimation = kenResource.animation.idle;

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

  public render(): void {
    this._sprite.x = this._physics.position.x;
    this._sprite.y = this._physics.position.y;
    this._sprite.scale.x = this._direction;

    if (!this._currentState) {
      return;
    }

    if (!this._currentAnimation) {
      console.warn('No current animation frame!');
      return;
    }

    const frame = this._currentAnimation[this._animationFrame];

    this._sprite.texture.frame = new Rectangle(
      frame.source.x,
      frame.source.y,
      frame.source.width,
      frame.source.height
    );

    const currentAnimationFrameCount =
      this._currentAnimation[this._animationFrame]?.frameCount ?? 4;

    if (currentAnimationFrameCount < 0) {
      // Sit on this frame until the state changes
      return;
    }

    this._framesElapsed += 1;

    if (this._framesElapsed < currentAnimationFrameCount) {
      return;
    }

    this._animationFrame += 1;
    this._framesElapsed = 0;

    if (this._animationFrame >= this._currentAnimation.length) {
      this._animationFrame = 0;
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

  private resetVelocities() {
    this._physics.velocity.x = 0;
    this._physics.velocity.y = 0;
  }

  private readonly _states: Record<string, ICharacterState> = {
    idle: {
      name: 'idle',
      enter: this.resetVelocities.bind(this),
      update: this.idleUpdate.bind(this),
    },
    walkForward: {
      name: 'walkForward',
      enter: () => {
        this._physics.velocity.x = walkForwardSpeed * this._direction;
      },
      update: this.walkForwardUpdate.bind(this),
    },
    walkBackward: {
      name: 'walkBackward',
      enter: () => {
        this._physics.velocity.x = -walkBackwardSpeed * this._direction;
      },
      update: this.walkBackwardUpdate.bind(this),
    },
    jumpStart: {
      name: 'jumpStart',
      enter: this.resetVelocities.bind(this),
      update: this.jumpStartUpdate.bind(this),
    },
    jumpRecovery: {
      name: 'jumpRecovery',
      enter: this.resetVelocities.bind(this),
      update: this.jumpRecoveryUpdate.bind(this),
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
        this._physics.velocity.x = jumpForwardSpeed * this._direction;
      },
      update: this.jumpUpdate.bind(this),
    },
    jumpBackward: {
      name: 'jumpBackward',
      enter: () => {
        this._physics.velocity.y = -jumpAcceleration;
        this._physics.velocity.x = -jumpBackwardSpeed * this._direction;
      },
      update: this.jumpUpdate.bind(this),
    },
    crouchDown: {
      name: 'crouchDown',
      enter: this.resetVelocities.bind(this),
      update: this.transitionToCrouchUpdate.bind(this),
    },
    crouched: {
      name: 'crouched',
      enter: this.resetVelocities.bind(this),
      update: this.crouchedUpdate.bind(this),
    },
    crouchUp: {
      name: 'crouchUp',
      enter: this.resetVelocities.bind(this),
      update: this.crouchUpUpdate.bind(this),
    },
    turn: {
      name: 'turn',
      enter: () => {
        this.resetVelocities();
        this._direction *= -1;
      },
      update: this.turnUpdate.bind(this),
    },
    crouchTurn: {
      name: 'crouchTurn',
      enter: () => {
        this.resetVelocities();
        this._direction *= -1;
      },
      update: this.transitionToCrouchUpdate.bind(this),
    },
  };

  private idleUpdate(input: IPlayerInput): void {
    if (input.jump) {
      this.changeState(this._states.jumpStart);
      return;
    }

    if (input.down) {
      this.changeState(this._states.crouchDown);
      return;
    }

    if (input.left) {
      this.changeState(this._states.walkBackward);
    } else if (input.right) {
      this.changeState(this._states.walkForward);
    }

    if (this.hasDirectionChanged()) {
      this.changeState(this._states.turn);
    }
  }

  private walkForwardUpdate(input: IPlayerInput): void {
    if (this.hasDirectionChanged()) {
      this._direction *= -1;
    }

    if (input.jump) {
      this.changeState(this._states.jumpStart);
      return;
    }

    if (input.down) {
      this.changeState(this._states.crouchDown);
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
      this.changeState(this._states.jumpStart);
      return;
    }

    if (input.down) {
      this.changeState(this._states.crouchDown);
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

  private jumpStartUpdate(input: IPlayerInput): void {
    if (!this.isCurrentAnimationComplete()) {
      return;
    }

    if (input.right) {
      this.changeState(this._states.jumpForward);
    } else if (input.left) {
      this.changeState(this._states.jumpBackward);
    } else {
      this.changeState(this._states.neutralJump);
    }
  }

  private jumpUpdate(_: IPlayerInput): void {
    if (this._physics.position.y === groundLevel) {
      this.changeState(this._states.jumpRecovery);
    }
  }

  private jumpRecoveryUpdate(input: IPlayerInput): void {
    if (this._animationFrame < 1) {
      return;
    }

    if (input.jump || input.down || input.left || input.right) {
      this.idleUpdate(input);
    }

    if (this.isCurrentAnimationComplete()) {
      this.changeState(this._states.idle);
    }
  }

  private transitionToCrouchUpdate(input: IPlayerInput): void {
    const stateBeforeCrouchedUpdate = this._currentState;

    this.crouchedUpdate(input);

    if (stateBeforeCrouchedUpdate !== this._currentState) {
      return;
    }

    if (this.isCurrentAnimationComplete()) {
      this.changeState(this._states.crouched);
    }
  }

  private crouchedUpdate(input: IPlayerInput): void {
    if (!input.down) {
      // Look at other inputs here and transition to walk or jump?
      this.changeState(this._states.crouchUp);
    }

    if (this.hasDirectionChanged()) {
      this.changeState(this._states.crouchTurn);
    }
  }

  private crouchUpUpdate(input: IPlayerInput): void {
    // If all frames done change state to idle
    if (this.isCurrentAnimationComplete()) {
      this.changeState(this._states.idle);
    }

    this.idleUpdate(input);
  }

  private turnUpdate(input: IPlayerInput): void {
    // If all frames done change state to idle
    if (this.isCurrentAnimationComplete()) {
      this.changeState(this._states.idle);
    }

    this.idleUpdate(input);
  }

  private changeState(newState: ICharacterState) {
    if (this._currentState === newState) {
      return;
    }

    console.log(`State: ${this._currentState?.name} -> ${newState.name}`);

    newState.enter();

    this._currentState = newState;

    this._currentAnimation = kenResource.animation[this._currentState.name];
    this._framesElapsed = 0;
    this._animationFrame = 0;
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

  private isCurrentAnimationComplete(): boolean {
    return this._currentAnimation[this._animationFrame]?.frameCount === -2;
  }
}
