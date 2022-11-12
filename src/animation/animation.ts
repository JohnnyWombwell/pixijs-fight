import { IRectangle, IVector2D } from '../geometry.js';

export interface ISpriteSheetFrame {
  frame: IRectangle;
  offset?: IVector2D;
  pushBox?: IRectangle;
}

export interface ISpriteFrame {
  frameName: string;
  period: number;
}

export interface IPushBoxFrame {
  body: IRectangle;
  fromFrame: number;
}

export interface ICollisionFrame {
  body: IRectangle[];
  fromFrame: number;
}

export interface IAnimation {
  frameSequence: ISpriteFrame[];
  // TODO a character animation type with physics fields on it
  pushBoxSequence?: IPushBoxFrame[];
  repeat: number;
}

export interface ISpriteSheet {
  texturePath: string;
  frames: Map<string, ISpriteSheetFrame>;
  animations: Map<string, IAnimation>;
}

export const Forever = -1;
