import { IVector2D } from './geometry';

export interface IPhysicsComponent {
  position: IVector2D;
  velocity: IVector2D;
}
