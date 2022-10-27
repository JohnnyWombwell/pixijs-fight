import { IRectangle, IVector2D } from "../geometry.js";

export interface IFrameResource {
  source: IRectangle;
  offset: IVector2D;
  frameCount?: number;
}
