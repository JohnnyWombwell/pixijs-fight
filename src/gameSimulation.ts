import { Camera } from './Camera.js';
import { ICharacter } from './character.js';
import { IRectangle, rectangularCollision } from './geometry.js';
import { IPlayerInput } from './playerInput.js';

export class GameSimulation {
  private readonly _characters: ICharacter[];
  private _camera: Camera;

  constructor(characters: ICharacter[], camera: Camera) {
    // TODO: initialise game state.
    this._characters = characters;
    this._camera = camera;
  }

  /**
   * Invoke once per frame
   */
  public update(input: IPlayerInput[]): void {
    // Command buffer update (current input + command state machine)

    // Action state machine update (what each character is doing)

    // Character physics
    // TODO: commands will be submitted, not raw input
    this._characters[0].update(input[0]);
    this._characters[1].update(input[1]);

    this.processPushCollisions();

    this._camera.update();

    this.ensureFightersInViewPort();

    // Reprocess push collisions after camera update
    this.processPushCollisions();
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
    const overlap = left.body.x + left.body.width - right.body.x;

    left.physics.position = {
      ...left.physics.position,
      x: Math.floor(left.physics.position.x - leftRightRatio * overlap + 0.5),
    };

    right.physics.position = {
      ...right.physics.position,
      x: Math.floor(
        right.physics.position.x + (1 - leftRightRatio) * overlap + 0.5
      ),
    };
  }

  private ensureFightersInViewPort(): void {
    for (const fighter of this._characters) {
      const fighterRect: IRectangle = fighter.body;

      if (this.ensureInBounds(this._camera.viewPort, fighterRect)) {
        fighter.physics.position.x += fighterRect.x - fighter.body.x;
        fighter.physics.position.y += fighterRect.y - fighter.body.y;
      }
    }
  }

  /**
   * Ensure the body is withing the bounding rectangle.
   * @param boundsRect
   * @param body
   * @returns true if body was updated
   */
  private ensureInBounds(boundsRect: IRectangle, body: IRectangle): boolean {
    let updated = false;

    if (body.x + body.width > boundsRect.x + boundsRect.width) {
      body.x = boundsRect.x + boundsRect.width - body.width;
      updated = true;
    }

    if (body.x < boundsRect.x) {
      body.x = boundsRect.x;
      updated = true;
    }

    return updated;
  }
}
