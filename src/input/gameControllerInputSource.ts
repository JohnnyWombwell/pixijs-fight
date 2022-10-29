import { IPlayerInput } from "../input.js";
import { IInputSource } from "./inputSource.js";

export class GameControllerInputSource implements IInputSource {
  poll(): IPlayerInput | null {
    // Just get the first non-null pad for now
    const gamePad = navigator.getGamepads().find(g => g !== null);

    if (!gamePad) {
      return null;
    }

    return {
      jump: gamePad.buttons[12].pressed,
      down: gamePad.buttons[13].pressed,
      left: gamePad.buttons[14].pressed,
      right: gamePad.buttons[15].pressed,
      lightPunch: gamePad.buttons[2].pressed,
      heavyKick: gamePad.buttons[7].pressed
    };
  }
}