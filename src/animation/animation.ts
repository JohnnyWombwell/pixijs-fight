import { IRectangle, IVector2D } from '../geometry.js';

export interface ISpriteFrame {
  frame: IRectangle;
  offset?: IVector2D;
}

export interface IAnimationFrame {
  frameName: string;
  period: number;
}

export interface IAnimation {
  frameSequence: IAnimationFrame[];
  repeat: number;
}

export interface ISpriteSheet {
  texturePath: string;
  frames: Map<string, ISpriteFrame>;
  animations: Map<string, IAnimation>;
}

export const Forever = -1;
