import { ICharacter } from './character.js';
import { rectangularCollision } from './geometry.js';
import { IPlayerInput } from './playerInput.js';

export class GameSimulation {
  private readonly _characters: ICharacter[];

  constructor(characters: ICharacter[]) {
    // TODO: initialise game state.
    this._characters = characters;
  }

  /**
   * Invoke once per frame
   */
  public update(input: IPlayerInput[]): void {
    // Command buffer update (current input + command state machine)

    // Action state machine update (what each character is doing)

    // Character physics
    // TODO: commands will be submitted, not raw input
    this._characters[0].update(
      input[0]
      /* TODO: pass relative position in here
          and allow the character to update their own direction accordingly */
    );

    this._characters[1].update(
      input[1]
      /* TODO: pass relative position in here
          and allow the character to update their own direction accordingly */
    );

    // push collisions
    this.processPushCollisions();

    // playfield bounds collisions

    // camera update
  }

  private processPushCollisions(): void {
    if (
      !rectangularCollision(this._characters[0].body, this._characters[1].body)
    ) {
      return;
    }

    if (
      this._characters[0].physics.position.x <=
      this._characters[1].physics.position.x
    ) {
      this.processPushCollision(this._characters[0], this._characters[1]);
    } else {
      this.processPushCollision(this._characters[1], this._characters[0]);
    }
  }

  private processPushCollision(left: ICharacter, right: ICharacter) {
    let leftRightRatio = 0.5;

    if (left.physics.velocity.x > 0 && right.physics.velocity.x === 0) {
      leftRightRatio = 2 / 3;
    } else if (left.physics.velocity.x === 0 && right.physics.velocity.x < 0) {
      leftRightRatio = 1 / 3;
    }

    // Adjust positions based onweighting applied above
    const overlap =
      left.body.position.x + left.body.size.x - right.body.position.x;

    left.physics.position = {
      ...left.physics.position,
      x: left.physics.position.x - leftRightRatio * overlap,
    };

    right.physics.position = {
      ...right.physics.position,
      x: right.physics.position.x + (1 - leftRightRatio) * overlap,
    };

    // reprocessWallBoundAfterPush(left, right);
  }
}
