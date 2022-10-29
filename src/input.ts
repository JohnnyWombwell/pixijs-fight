export interface IPlayerInput {
  // TODO: implement as bitfields
  left: boolean;
  right: boolean;
  jump: boolean;
  down: boolean;
  lightPunch?: boolean;
  lightKick?: boolean;
  heavyPunch?: boolean;
  heavyKick?: boolean;
}

export interface ISystemInput {
  pause: IButtonState;
  advanceFrame: IButtonState;
}

export interface IButtonState {
  held: boolean,
  downEvent: boolean,
  upEvent: boolean
}
