import { IRectangle, IVector2D } from "../geometry.js";
import { IFrameResource } from "./frameResource.js";

export interface ISpriteSheetResource {
  texturePath: string;
  image: Record<string, IFrameResource>;
  animation: Record<string, IFrameResource[]>;
}

export interface ISpriteFrame {
  frame: IRectangle;
  offset?: IVector2D;
}

export interface IAnimationFrame {
  frameName: string;
  period: number;
}

export interface ISpriteSheet {
  texturePath: string;
  frames: Map<string, ISpriteFrame>;
  animations: Map<string, IAnimationFrame[]>;
}
