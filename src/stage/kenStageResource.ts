import { ISpriteSheet } from "../animation/spriteSheetResource.js";

export const kenStageResource: ISpriteSheet = {
  texturePath: 'assets/images/kens-stage.png',
  frames: new Map([
    ['background', { frame: { x: 161, y: 208, width: 590, height: 176 } }],
    ['layer-1', { frame: { x: 8, y: 16, width: 521, height: 180 } }],
    ['platform', { frame: { x: 72, y: 392, width: 768, height: 72 } }],
  ]),
  animations: new Map([])
}