import { IAnimation, ISpriteFrame } from './animation.js';
import { IFrameResource } from './frameResource.js';

export interface ISpriteSheetResource {
  texturePath: string;
  image: Record<string, IFrameResource>;
  animation: Record<string, IFrameResource[]>;
}

export interface ISpriteSheet {
  texturePath: string;
  frames: Map<string, ISpriteFrame>;
  animations: Map<string, IAnimation>;
}

export const Forever = -1;
