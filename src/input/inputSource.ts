import { IPlayerInput } from '../playerInput';

export interface IInputSource {
  /**
   * Player Input Source.
   *
   * @return {IPlayerInput[]} playerInputs The player input objects
   * When registered these will be updated asynchronously by the source.
   *
   * NOTE: As polling type controllers are implemented this may change so that:
   * - A register method defines the controller mapping.
   * - A poll method returns the current state of the inputs
   */
  poll(): IPlayerInput[];
}
