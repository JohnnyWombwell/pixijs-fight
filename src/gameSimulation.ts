import { ICharacter } from './character.js';
import { rectangularCollision } from './geometry.js';
import { IPhysicsComponent } from './physics.js';
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
    for (let n = 0; n < this._characters.length; ++n) {
      // TODO: commands will be submitted, not raw input
      this._characters[n].update(input[n]);
    }

    // push collisions
    this.processPushCollisions();

    // facing direction

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
    if (left.physics.velocity.x >= 0 && right.physics.velocity.x >= 0) {
      right.physics.position = {
        ...right.physics.position,
        x: left.physics.position.x + left.body.size.x,
      };
    } else if (left.physics.velocity.x <= 0 && right.physics.velocity.x <= 0) {
      left.physics.position = {
        ...left.physics.position,
        x: right.physics.position.x - left.body.size.x,
      };
    } else {
      // else pushing against each other - split the overlap equally
      const overlap =
        left.body.position.x + left.body.size.x - right.body.position.x;

      left.physics.position = {
        ...left.physics.position,
        x: left.physics.position.x - overlap / 2,
      };

      right.physics.position = {
        ...right.physics.position,
        x: right.physics.position.x + overlap / 2,
      };
    }

    // reprocessWallBoundAfterPush(left, right);
  }
}
