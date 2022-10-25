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
