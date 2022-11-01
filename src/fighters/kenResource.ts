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
    [
      'neutralJump-1',
      {
        frame: { x: 724, y: 1036, width: 56, height: 104 },
        offset: { x: -31, y: -107 },
      },
    ],
    [
      'neutralJump-2',
      {
        frame: { x: 792, y: 995, width: 50, height: 89 },
        offset: { x: -25, y: -103 },
      },
    ],
    [
      'neutralJump-3',
      {
        frame: { x: 853, y: 967, width: 54, height: 77 },
        offset: { x: -25, y: -103 },
      },
    ],
    [
      'neutralJump-4',
      {
        frame: { x: 911, y: 966, width: 48, height: 70 },
        offset: { x: -28, y: -101 },
      },
    ],
    [
      'neutralJump-5',
      {
        frame: { x: 975, y: 977, width: 48, height: 86 },
        offset: { x: -25, y: -103 },
      },
    ],
    [
      'neutralJump-6',
      {
        frame: { x: 1031, y: 1008, width: 55, height: 103 },
        offset: { x: -32, y: -103 },
      },
    ],
    [
      'diagonalJump-1',
      {
        frame: { x: 1237, y: 1037, width: 55, height: 103 },
        offset: { x: -25, y: -106 },
      },
    ],
    [
      'diagonalJump-2',
      {
        frame: { x: 1301, y: 990, width: 61, height: 78 },
        offset: { x: -22, y: -90 },
      },
    ],
    [
      'diagonalJump-3',
      {
        frame: { x: 1363, y: 994, width: 104, height: 42 },
        offset: { x: -61, y: -76 },
      },
    ],
    [
      'diagonalJump-4',
      {
        frame: { x: 1468, y: 957, width: 53, height: 82 },
        offset: { x: -28, y: -101 },
      },
    ],
    [
      'diagonalJump-5',
      {
        frame: { x: 1541, y: 988, width: 122, height: 44 },
        offset: { x: -71, y: -81 },
      },
    ],
    [
      'diagonalJump-6',
      {
        frame: { x: 1664, y: 976, width: 71, height: 87 },
        offset: { x: -53, y: -98 },
      },
    ],
    [
      'diagonalJump-7',
      {
        frame: { x: 1748, y: 977, width: 55, height: 103 },
        offset: { x: -32, y: -107 },
      },
    ],
    [
      'jumpStart-1',
      {
        frame: { x: 660, y: 1060, width: 55, height: 85 },
        offset: { x: -29, y: -83 },
      },
    ],
    [
      'crouchDown-1',
      {
        frame: { x: 8, y: 779, width: 53, height: 83 },
        offset: { x: -27, y: -81 },
      },
    ],
    [
      'crouchDown-2',
      {
        frame: { x: 79, y: 794, width: 57, height: 69 },
        offset: { x: -25, y: -66 },
      },
    ],
    [
      'crouched-1',
      {
        frame: { x: 148, y: 802, width: 61, height: 61 },
        offset: { x: -25, y: -58 },
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
    [
      'neutralJump',
      {
        frameSequence: [
          { frameName: 'neutralJump-1', period: 9 },
          { frameName: 'neutralJump-2', period: 8 },
          { frameName: 'neutralJump-3', period: 8 },
          { frameName: 'neutralJump-4', period: 8 },
          { frameName: 'neutralJump-5', period: 8 },
          { frameName: 'neutralJump-6', period: 1 },
        ],
        repeat: 0,
      },
    ],
    [
      'jumpForward',
      {
        frameSequence: [
          { frameName: 'diagonalJump-1', period: 13 },
          { frameName: 'diagonalJump-2', period: 5 },
          { frameName: 'diagonalJump-3', period: 3 },
          { frameName: 'diagonalJump-4', period: 3 },
          { frameName: 'diagonalJump-5', period: 3 },
          { frameName: 'diagonalJump-6', period: 5 },
          { frameName: 'diagonalJump-7', period: 1 },
        ],
        repeat: 0,
      },
    ],
    [
      'jumpBackward',
      {
        frameSequence: [
          { frameName: 'diagonalJump-6', period: 15 },
          { frameName: 'diagonalJump-5', period: 3 },
          { frameName: 'diagonalJump-4', period: 3 },
          { frameName: 'diagonalJump-3', period: 3 },
          { frameName: 'diagonalJump-2', period: 3 },
          { frameName: 'diagonalJump-1', period: 1 },
        ],
        repeat: 0,
      },
    ],
    [
      'jumpStart',
      {
        frameSequence: [{ frameName: 'jumpStart-1', period: 3 }],
        repeat: 0,
      },
    ],
    [
      'jumpRecovery',
      {
        frameSequence: [
          { frameName: 'jumpStart-1', period: 2 },
          { frameName: 'jumpStart-1', period: 7 },
        ],
        repeat: 0,
      },
    ],
    [
      'crouchDown',
      {
        frameSequence: [
          { frameName: 'crouchDown-1', period: 2 },
          { frameName: 'crouchDown-2', period: 2 },
          { frameName: 'crouched-1', period: 2 },
        ],
        repeat: 0,
      },
    ],
    [
      'crouched',
      {
        frameSequence: [{ frameName: 'crouched-1', period: 1 }],
        repeat: 0,
      },
    ],
    [
      'crouchUp',
      {
        frameSequence: [
          { frameName: 'crouched-1', period: 2 },
          { frameName: 'crouchDown-2', period: 2 },
          { frameName: 'crouchDown-1', period: 2 },
        ],
        repeat: 0,
      },
    ],
  ]),
};
