import { IPlayerInput } from '../playerInput';

export interface IInputSource {
  /**
   * Player Input Source.
   *
   * @return {IPlayerInput|null} playerInput A single player input object or null if disconnected.
   */
  poll(): IPlayerInput | null;
}
