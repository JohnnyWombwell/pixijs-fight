import { CharacterSimulation, ICharacter } from './character.js';
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

    // facing direction

    // playfield bounds collisions

    // camera update
  }
}
