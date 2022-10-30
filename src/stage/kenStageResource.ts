import { Forever, ISpriteSheet } from '../animation/animation.js';

export const kenStageResource: ISpriteSheet = {
  texturePath: 'assets/images/kens-stage.png',
  frames: new Map([
    ['background', { frame: { x: 161, y: 208, width: 590, height: 176 } }],
    ['flag-1', { frame: { x: 848, y: 216, width: 40, height: 32 } }],
    ['flag-2', { frame: { x: 848, y: 264, width: 40, height: 32 } }],
    ['flag-3', { frame: { x: 848, y: 312, width: 40, height: 32 } }],
    ['mid-layer', { frame: { x: 8, y: 16, width: 521, height: 180 } }],
    ['platform', { frame: { x: 72, y: 392, width: 768, height: 72 } }],
  ]),
  animations: new Map([
    [
      'flag',
      {
        frameSequence: [
          { frameName: 'flag-1', period: 8 },
          { frameName: 'flag-2', period: 8 },
          { frameName: 'flag-3', period: 8 },
        ],
        repeat: Forever,
      },
    ],
  ]),
};
