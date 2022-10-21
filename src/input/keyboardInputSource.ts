import { IPlayerInput } from '../playerInput';

export class KeyboardInputSource {
  private _playerInputs: IPlayerInput[] = [];

  constructor(playerInputs: IPlayerInput[]) {
    this._playerInputs = playerInputs;
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
      case 'Space':
        this._playerInputs[0].attack[0] = true;
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
      case 'Enter':
        this._playerInputs[1].attack[0] = true;
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
      case 'Space':
        this._playerInputs[0].attack[0] = false;
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
      case 'Enter':
        this._playerInputs[1].attack[0] = false;
        break;
    }
  }
}
