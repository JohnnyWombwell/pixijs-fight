import { IRectangle, IVector2D } from './geometry.js';
import { IPhysicsComponent } from './physics.js';
import { Sprite } from './pixi/pixi.js';
import { IPlayerInput } from './input.js';
import { kenResource } from './fighters/kenResource.js';
import {
  animationEnded,
  Direction,
  IRunningAnimation,
  newAnimation,
  refreshAnimation,
  switchAnimation,
} from './animation/render.js';

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

const groundLevel = 216;
const gravity = 0.3;
const jumpAcceleration = 7;
const walkForwardSpeed = 3;
const walkBackwardSpeed = 2;
const jumpForwardSpeed = 3;
const jumpBackwardSpeed = 4;

const lightAttackSound = new Audio('assets/audio/light-attack.wav');
const heavyAttackSound = new Audio('assets/audio/heavy-attack.wav');

interface ICharacterState {
  get name(): string;
  enter: () => void;
  update: (input: IPlayerInput) => void;
}

export class CharacterSimulation implements ICharacter, ISprite {
  private readonly _physics: IPhysicsComponent;

  private _direction: Direction = Direction.Right;
  private _currentState?: ICharacterState = undefined;
  private _opponent?: ICharacter;
  private _sprite: Sprite;

  private _shadowSprite: Sprite;
  private _runningAnimation: IRunningAnimation;

  public constructor(
    initialPosition: IVector2D,
    sprite: Sprite,
    shadowSprite: Sprite
  ) {
    this._physics = {
      position: initialPosition,
      velocity: { x: 0, y: 0 },
    };

    this._sprite = sprite;
    this._shadowSprite = shadowSprite;
    this._shadowSprite.y =
      groundLevel + kenResource.frames.get('shadow')!.offset!.y;

    this._runningAnimation = newAnimation(
      kenResource.animations.get('idle')!,
      kenResource.frames,
      this._sprite
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
    const pushBox = this._runningAnimation.currentBody.push.body;
    return {
      x: this._physics.position.x + pushBox.x,
      y: this._physics.position.y + pushBox.y,
      width: pushBox.width,
      height: pushBox.height,
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
    refreshAnimation(this._runningAnimation);

    const shadowScale =
      1 - (groundLevel - this._physics.position.y) / (groundLevel + 50);
    this._shadowSprite.scale.x = shadowScale;
    this._shadowSprite.x =
      this._physics.position.x + kenResource.frames.get('shadow')!.offset!.x;
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

    this._runningAnimation.position = this._physics.position;
    this._runningAnimation.directionX = this._direction;
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
      enter: () => {
        this.resetVelocities();
      },
      update: this.jumpStartUpdate.bind(this),
    },
    jumpRecovery: {
      name: 'jumpRecovery',
      enter: () => {
        this.resetVelocities();
      },
      update: this.jumpRecoveryUpdate.bind(this),
    },
    neutralJump: {
      name: 'neutralJump',
      enter: () => {
        this._physics.velocity.y = -jumpAcceleration;
        this._physics.velocity.x = 0;
      },
      update: this.neutralJumpUpdate.bind(this),
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
      enter: () => {
        this.resetVelocities();
      },
      update: this.crouchedUpdate.bind(this),
    },
    crouchUp: {
      name: 'crouchUp',
      enter: () => {
        this.resetVelocities();
      },
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
    standingLightPunch: {
      name: 'standingLightPunch',
      enter: () => {
        this.resetVelocities();
        lightAttackSound.currentTime = 0;
        lightAttackSound.play();
      },
      update: this.standingAttackUpdate.bind(this),
    },
    standingHeavyKick: {
      name: 'standingHeavyKick',
      enter: () => {
        this.resetVelocities();
        heavyAttackSound.currentTime = 0;
        heavyAttackSound.play();
      },
      update: this.standingAttackUpdate.bind(this),
    },
    crouchingLightPunch: {
      name: 'crouchingLightPunch',
      enter: () => {
        this.resetVelocities();
        lightAttackSound.currentTime = 0;
        lightAttackSound.play();
      },
      update: this.crouchingAttackUpdate.bind(this),
    },
    crouchingHeavyKick: {
      name: 'crouchingHeavyKick',
      enter: () => {
        this.resetVelocities();
        heavyAttackSound.currentTime = 0;
        heavyAttackSound.play();
      },
      update: this.crouchingAttackUpdate.bind(this),
    },
    jumpingLightPunch: {
      name: 'jumpingLightPunch',
      enter: () => {
        lightAttackSound.currentTime = 0;
        lightAttackSound.play();
      },
      update: this.jumpingAttackUpdate.bind(this),
    },
    jumpingHeavyKick: {
      name: 'jumpingHeavyKick',
      enter: () => {
        heavyAttackSound.currentTime = 0;
        heavyAttackSound.play();
      },
      update: this.jumpingAttackUpdate.bind(this),
    },
    neutralJumpHeavyKick: {
      name: 'neutralJumpHeavyKick',
      enter: () => {
        heavyAttackSound.currentTime = 0;
        heavyAttackSound.play();
      },
      update: this.jumpingAttackUpdate.bind(this),
    },
  };

  private idleUpdate(input: IPlayerInput): void {
    if (this.hasDirectionChanged()) {
      this.changeState(this._states.turn);
    }

    if (input.lightPunch) {
      this.changeState(this._states.standingLightPunch);
      return;
    }

    if (input.heavyKick) {
      this.changeState(this._states.standingHeavyKick);
      return;
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
    } else if (input.right) {
      this.changeState(this._states.walkForward);
    }
  }

  private walkForwardUpdate(input: IPlayerInput): void {
    if (this.hasDirectionChanged()) {
      this._direction *= -1;
    }

    if (input.lightPunch) {
      this.changeState(this._states.standingLightPunch);
      return;
    }

    if (input.heavyKick) {
      this.changeState(this._states.standingHeavyKick);
      return;
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

    if (input.lightPunch) {
      this.changeState(this._states.standingLightPunch);
      return;
    }

    if (input.heavyKick) {
      this.changeState(this._states.standingHeavyKick);
      return;
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

  private jumpUpdate(input: IPlayerInput): void {
    if (this._physics.position.y === groundLevel) {
      this.changeState(this._states.jumpRecovery);
      return;
    }

    if (input.lightPunch) {
      this.changeState(this._states.jumpingLightPunch);
    }

    if (input.heavyKick) {
      this.changeState(this._states.jumpingHeavyKick);
    }
  }

  private neutralJumpUpdate(input: IPlayerInput): void {
    if (this._physics.position.y === groundLevel) {
      this.changeState(this._states.jumpRecovery);
      return;
    }

    if (input.lightPunch) {
      this.changeState(this._states.jumpingLightPunch);
    }

    if (input.heavyKick) {
      this.changeState(this._states.neutralJumpHeavyKick);
    }
  }

  private jumpRecoveryUpdate(input: IPlayerInput): void {
    if (this._runningAnimation.currentSequenceIndex < 1) {
      return;
    }

    if (input.jump || input.down || input.left || input.right) {
      this.idleUpdate(input);
    }

    if (this.isCurrentAnimationComplete()) {
      this.changeState(this._states.idle);
    }
  }

  private jumpingAttackUpdate(input: IPlayerInput): void {
    if (this._physics.position.y === groundLevel) {
      this.changeState(this._states.jumpRecovery);
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
    if (input.lightPunch) {
      this.changeState(this._states.crouchingLightPunch);
      return;
    }

    if (input.heavyKick) {
      this.changeState(this._states.crouchingHeavyKick);
      return;
    }

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

  private standingAttackUpdate(input: IPlayerInput): void {
    if (!this.isCurrentAnimationComplete()) {
      return;
    }

    this.changeState(this._states.idle);
  }

  private crouchingAttackUpdate(input: IPlayerInput): void {
    if (!this.isCurrentAnimationComplete()) {
      return;
    }

    // todo: check for up input - prob need a method to check inputs and change state
    if (input.down) {
      this.changeState(this._states.crouched);
    } else {
      this.changeState(this._states.crouchUp);
    }
  }

  private changeState(newState: ICharacterState) {
    if (this._currentState === newState) {
      return;
    }

    console.log(`State: ${this._currentState?.name} -> ${newState.name}`);

    newState.enter();

    this._currentState = newState;

    const animation = kenResource.animations.get(this._currentState.name)!;
    switchAnimation(this._runningAnimation, animation);
  }

  private hasDirectionChanged(): boolean {
    if (this.body.x + this.body.width - 4 <= this._opponent!.body.x) {
      return this._direction !== Direction.Right;
    } else if (
      this.body.x >=
      this._opponent!.body.x + this._opponent!.body.width - 4
    ) {
      return this._direction !== Direction.Left;
    }

    return false;
  }

  private isCurrentAnimationComplete(): boolean {
    return animationEnded(this._runningAnimation);
  }
}
