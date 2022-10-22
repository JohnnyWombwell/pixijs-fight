export interface IPlayerInput {
  // TODO: implement as bitfields
  left: boolean;
  right: boolean;
  jump: boolean;
  down: boolean;
  attack: boolean[];
}
