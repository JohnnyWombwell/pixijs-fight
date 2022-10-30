import { IAnimation, ISpriteFrame } from './animation.js';
import { IFrameResource } from './frameResource.js';

export interface ISpriteSheetResource {
  texturePath: string;
  image: Record<string, IFrameResource>;
  animation: Record<string, IFrameResource[]>;
}
