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
    [
      'walkForward-1',
      {
        frame: { x: 8, y: 872, width: 53, height: 83 },
        offset: { x: -27, y: -81 },
      },
    ],
    [
      'walkForward-2',
      {
        frame: { x: 70, y: 867, width: 60, height: 88 },
        offset: { x: -35, y: -86 },
      },
    ],
    [
      'walkForward-3',
      {
        frame: { x: 140, y: 866, width: 64, height: 90 },
        offset: { x: -35, y: -87 },
      },
    ],
    [
      'walkForward-4',
      {
        frame: { x: 215, y: 865, width: 63, height: 89 },
        offset: { x: -29, y: -88 },
      },
    ],
    [
      'walkForward-5',
      {
        frame: { x: 288, y: 866, width: 54, height: 89 },
        offset: { x: -25, y: -87 },
      },
    ],
    [
      'walkForward-6',
      {
        frame: { x: 357, y: 867, width: 50, height: 89 },
        offset: { x: -25, y: -86 },
      },
    ],
    [
      'walkBackward-1',
      {
        frame: { x: 417, y: 868, width: 61, height: 87 },
        offset: { x: -35, y: -85 },
      },
    ],
    [
      'walkBackward-2',
      {
        frame: { x: 487, y: 866, width: 59, height: 90 },
        offset: { x: -36, y: -87 },
      },
    ],
    [
      'walkBackward-3',
      {
        frame: { x: 558, y: 865, width: 57, height: 90 },
        offset: { x: -36, y: -88 },
      },
    ],
    [
      'walkBackward-4',
      {
        frame: { x: 629, y: 864, width: 58, height: 90 },
        offset: { x: -38, y: -89 },
      },
    ],
    [
      'walkBackward-5',
      {
        frame: { x: 702, y: 865, width: 58, height: 91 },
        offset: { x: -36, y: -87 },
      },
    ],
    [
      'walkBackward-6',
      {
        frame: { x: 773, y: 866, width: 57, height: 89 },
        offset: { x: -36, y: -87 },
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
    [
      'walkForward',
      {
        frameSequence: [
          { frameName: 'walkForward-1', period: 3 },
          { frameName: 'walkForward-2', period: 6 },
          { frameName: 'walkForward-3', period: 4 },
          { frameName: 'walkForward-4', period: 4 },
          { frameName: 'walkForward-5', period: 4 },
          { frameName: 'walkForward-6', period: 6 },
        ],
        repeat: Forever,
      },
    ],
    [
      'walkBackward',
      {
        frameSequence: [
          { frameName: 'walkBackward-1', period: 3 },
          { frameName: 'walkBackward-2', period: 6 },
          { frameName: 'walkBackward-3', period: 4 },
          { frameName: 'walkBackward-4', period: 4 },
          { frameName: 'walkBackward-5', period: 4 },
          { frameName: 'walkBackward-6', period: 6 },
        ],
        repeat: Forever,
      },
    ],
  ]),
};
