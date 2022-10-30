import { Forever, ISpriteSheet } from '../animation/animation.js';

export const kenStageSpriteSheet: ISpriteSheet = {
  texturePath: 'assets/images/kens-stage.png',
  frames: new Map([
    ['background', { frame: { x: 161, y: 208, width: 590, height: 176 } }],
    ['flag-1', { frame: { x: 848, y: 216, width: 40, height: 32 } }],
    ['flag-2', { frame: { x: 848, y: 264, width: 40, height: 32 } }],
    ['flag-3', { frame: { x: 848, y: 312, width: 40, height: 32 } }],
    ['mid-layer', { frame: { x: 8, y: 16, width: 521, height: 180 } }],
    ['crowd_1-1', { frame: { x: 552, y: 15, width: 40, height: 57 } }],
    ['crowd_1-2', { frame: { x: 552, y: 79, width: 40, height: 57 } }],
    ['crowd_1-3', { frame: { x: 552, y: 143, width: 40, height: 57 } }],
    ['crowd_2-1', { frame: { x: 600, y: 24, width: 16, height: 48 } }],
    ['crowd_2-2', { frame: { x: 600, y: 88, width: 16, height: 48 } }],
    ['crowd_3-1', { frame: { x: 624, y: 16, width: 32, height: 56 } }],
    ['crowd_3-2', { frame: { x: 624, y: 80, width: 32, height: 56 } }],
    ['crowd_3-3', { frame: { x: 624, y: 144, width: 32, height: 56 } }],
    ['crowd_4-1', { frame: { x: 664, y: 16, width: 32, height: 56 } }],
    ['crowd_4-2', { frame: { x: 664, y: 80, width: 32, height: 56 } }],
    ['crowd_5-1', { frame: { x: 704, y: 16, width: 48, height: 56 } }],
    ['crowd_5-2', { frame: { x: 704, y: 80, width: 48, height: 56 } }],
    ['crowd_5-3', { frame: { x: 704, y: 144, width: 48, height: 56 } }],
    ['crowd_6-1', { frame: { x: 760, y: 16, width: 40, height: 40 } }],
    ['crowd_6-2', { frame: { x: 760, y: 64, width: 40, height: 40 } }],
    ['crowd_6-3', { frame: { x: 760, y: 112, width: 40, height: 40 } }],
    ['crowd_7-1', { frame: { x: 808, y: 24, width: 48, height: 32 } }],
    ['crowd_7-2', { frame: { x: 808, y: 72, width: 48, height: 32 } }],
    ['crowd_7-3', { frame: { x: 808, y: 120, width: 48, height: 32 } }],

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
    [
      'crowd_1',
      {
        frameSequence: [
          { frameName: 'crowd_1-1', period: 8 },
          { frameName: 'crowd_1-2', period: 8 },
          { frameName: 'crowd_1-3', period: 50 },
        ],
        repeat: Forever,
      },
    ],
    [
      'crowd_2',
      {
        frameSequence: [
          { frameName: 'crowd_2-1', period: 120 },
          { frameName: 'crowd_2-2', period: 30 },
        ],
        repeat: Forever,
      },
    ],
    [
      'crowd_3',
      {
        frameSequence: [
          { frameName: 'crowd_3-1', period: 16 },
          { frameName: 'crowd_3-2', period: 8 },
          { frameName: 'crowd_3-3', period: 16 },
          { frameName: 'crowd_3-2', period: 8 },
        ],
        repeat: Forever,
      },
    ],
    [
      'crowd_4',
      {
        frameSequence: [
          { frameName: 'crowd_4-1', period: 30 },
          { frameName: 'crowd_4-2', period: 30 },
          { frameName: 'crowd_4-1', period: 8 },
          { frameName: 'crowd_4-2', period: 8 },
          { frameName: 'crowd_4-1', period: 8 },
          { frameName: 'crowd_4-2', period: 8 },
        ],
        repeat: Forever,
      },
    ],
    [
      'crowd_5',
      {
        frameSequence: [
          { frameName: 'crowd_5-1', period: 80 },
          { frameName: 'crowd_5-2', period: 8 },
          { frameName: 'crowd_5-3', period: 8 },
          { frameName: 'crowd_5-2', period: 8 },
          { frameName: 'crowd_5-1', period: 15 },
          { frameName: 'crowd_5-2', period: 8 },
          { frameName: 'crowd_5-3', period: 8 },
          { frameName: 'crowd_5-2', period: 8 },
        ],
        repeat: Forever,
      },
    ],
    [
      'crowd_6',
      {
        frameSequence: [
          { frameName: 'crowd_6-1', period: 8 },
          { frameName: 'crowd_6-2', period: 8 },
          { frameName: 'crowd_6-3', period: 8 },
        ],
        repeat: Forever,
      },
    ],
    [
      'crowd_7',
      {
        frameSequence: [
          { frameName: 'crowd_7-1', period: 40 },
          { frameName: 'crowd_7-2', period: 8 },
          { frameName: 'crowd_7-3', period: 8 },
          { frameName: 'crowd_7-2', period: 8 },
        ],
        repeat: Forever,
      },
    ],
  ]),
};

export const kenStageAnimationPositions = new Map([
  ['flag', { x: 471, y: 16 }],
  ['crowd_1', { x: 128, y: 103 }],
  ['crowd_2', { x: 168, y: 112 }],
  ['crowd_3', { x: 192, y: 104 }],
  ['crowd_4', { x: 224, y: 104 }],
  ['crowd_5', { x: 288, y: 96 }],
  ['crowd_6', { x: 88, y: 24 }],
  ['crowd_7', { x: 128, y: 24 }],
]);
