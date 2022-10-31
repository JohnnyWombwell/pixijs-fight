import { Forever, ISpriteSheet } from '../animation/animation.js';

export const kenResource2: ISpriteSheet = {
  texturePath: 'assets/images/ken-masters.png',
  frames: new Map([
    [
      'shadow',
      {
        frame: { x: 0, y: 4065, width: 68, height: 11 },
        offset: { x: 0, y: -7 },
      },
    ],
    [
      'idle-1',
      {
        frame: { x: 346, y: 688, width: 60, height: 89 },
        offset: { x: -34, y: -86 },
      },
    ],
    [
      'idle-2',
      {
        frame: { x: 2, y: 687, width: 59, height: 90 },
        offset: { x: -33, y: -87 },
      },
    ],
    [
      'idle-3',
      {
        frame: { x: 72, y: 685, width: 58, height: 92 },
        offset: { x: -32, y: -89 },
      },
    ],
    [
      'idle-4',
      {
        frame: { x: 142, y: 684, width: 55, height: 93 },
        offset: { x: -31, y: -90 },
      },
    ],
  ]),
  animations: new Map([
    [
      'idle',
      {
        frameSequence: [
          { frameName: 'idle-1', period: 4 },
          { frameName: 'idle-2', period: 4 },
          { frameName: 'idle-3', period: 4 },
          { frameName: 'idle-4', period: 4 },
          { frameName: 'idle-3', period: 4 },
          { frameName: 'idle-2', period: 4 },
        ],
        repeat: Forever,
      },
    ],
  ]),
};
