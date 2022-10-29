import { IPlayerInput, ISystemInput } from '../input';

export class KeyboardInputSource {
  private _playerInputs: IPlayerInput[] = [];
  private _systemInput: ISystemInput;

  constructor(playerInputs: IPlayerInput[], systemInput: ISystemInput) {
    this._playerInputs = playerInputs;
    this._systemInput = systemInput;
    window.addEventListener('keydown', this.keydownHandler.bind(this));
    window.addEventListener('keyup', this.keyupHandler.bind(this));
  }

  private keydownHandler(event: KeyboardEvent) {
    switch (event.code) {
      case 'KeyA':
        this._playerInputs[0].left = true;
        break;
      case 'KeyD':
        this._playerInputs[0].right = true;
        break;
      case 'KeyW':
        this._playerInputs[0].jump = true;
        break;
      case 'KeyS':
        this._playerInputs[0].down = true;
        break;
      case 'KeyF':
        this._playerInputs[0].lightPunch = true;
        break;
      case 'KeyN':
        this._playerInputs[0].heavyKick = true;
        break;
    }

    switch (event.code) {
      case 'ArrowLeft':
        this._playerInputs[1].left = true;
        break;
      case 'ArrowRight':
        this._playerInputs[1].right = true;
        break;
      case 'ArrowUp':
        this._playerInputs[1].jump = true;
        break;
      case 'ArrowDown':
        this._playerInputs[1].down = true;
        break;
      case 'KeyK':
        this._playerInputs[1].lightPunch = true;
        break;
      case 'Slash':
        this._playerInputs[1].heavyKick = true;
        break;
    }

    switch (event.code) {
      case 'KeyP':
        this._systemInput.pause.held = true;
        this._systemInput.pause.downEvent = true;
        break;
      case 'BracketRight':
        this._systemInput.advanceFrame.held = true;
        this._systemInput.advanceFrame.downEvent = true;
        break;
    }
  }

  private keyupHandler(event: KeyboardEvent) {
    switch (event.code) {
      case 'KeyA':
        this._playerInputs[0].left = false;
        break;
      case 'KeyD':
        this._playerInputs[0].right = false;
        break;
      case 'KeyW':
        this._playerInputs[0].jump = false;
        break;
      case 'KeyS':
        this._playerInputs[0].down = false;
        break;
      case 'KeyF':
        this._playerInputs[0].lightPunch = false;
        break;
      case 'KeyN':
        this._playerInputs[0].heavyKick = false;
        break;
    }

    switch (event.code) {
      case 'ArrowLeft':
        this._playerInputs[1].left = false;
        break;
      case 'ArrowRight':
        this._playerInputs[1].right = false;
        break;
      case 'ArrowUp':
        this._playerInputs[1].jump = false;
        break;
      case 'ArrowDown':
        this._playerInputs[1].down = false;
        break;
      case 'KeyK':
        this._playerInputs[1].lightPunch = false;
        break;
      case 'Slash':
        this._playerInputs[1].heavyKick = false;
        break;
    }

    switch (event.code) {
      case 'KeyP':
        this._systemInput.pause.held = false;
        this._systemInput.pause.upEvent = true;
        break;
      case 'BracketRight':
        this._systemInput.advanceFrame.held = false;
        this._systemInput.advanceFrame.upEvent = true;
        break;
    }
  }
}
