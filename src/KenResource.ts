import { IRect, IVector2D } from './geometry';

export interface IFrameResource {
  source: IRect;
  offset: IVector2D;
  frameCount?: number;
}

export interface ISpriteResource {
  texturePath: string;
  animation: Record<string, IFrameResource[]>;
}

export const kenResource: ISpriteResource = {
  texturePath: 'assets/images/ken-full-alpha.png',
  animation: {
    idle: [
      {
        source: { x: 1, y: 683, width: 60, height: 94 },
        offset: { x: -30, y: -94 },
      },
      {
        source: { x: 70, y: 683, width: 60, height: 94 },
        offset: { x: -30, y: -94 },
      },
      {
        source: { x: 139, y: 683, width: 60, height: 94 },
        offset: { x: -30, y: -94 },
      },
      {
        source: { x: 208, y: 683, width: 60, height: 94 },
        offset: { x: -30, y: -94 },
      },
      {
        source: { x: 277, y: 683, width: 60, height: 94 },
        offset: { x: -30, y: -94 },
      },
      {
        source: { x: 346, y: 683, width: 60, height: 94 },
        offset: { x: -30, y: -94 },
      },
    ],
    walkForward: [
      {
        source: { x: 8, y: 872, width: 53, height: 83 },
        offset: { x: -27, y: -81 },
      },
      {
        source: { x: 70, y: 683, width: 60, height: 88 },
        offset: { x: -35, y: -86 },
      },
      {
        source: { x: 140, y: 866, width: 64, height: 90 },
        offset: { x: -35, y: -87 },
      },
      {
        source: { x: 215, y: 865, width: 63, height: 89 },
        offset: { x: -29, y: -88 },
      },
      {
        source: { x: 288, y: 866, width: 54, height: 89 },
        offset: { x: -25, y: -87 },
      },
      {
        source: { x: 357, y: 867, width: 50, height: 89 },
        offset: { x: -25, y: -86 },
      },
    ],
    walkBackward: [
      {
        source: { x: 417, y: 868, width: 61, height: 87 },
        offset: { x: -35, y: -85 },
      },
      {
        source: { x: 487, y: 866, width: 59, height: 90 },
        offset: { x: -36, y: -87 },
      },
      {
        source: { x: 558, y: 865, width: 57, height: 90 },
        offset: { x: -36, y: -88 },
      },
      {
        source: { x: 629, y: 864, width: 58, height: 90 },
        offset: { x: -38, y: -89 },
      },
      {
        source: { x: 702, y: 865, width: 58, height: 91 },
        offset: { x: -25, y: -87 },
      },
      {
        source: { x: 773, y: 866, width: 57, height: 89 },
        offset: { x: -36, y: -87 },
      },
    ],
    neutralJump: [
      {
        source: { x: 724, y: 1036, width: 56, height: 104 },
        offset: { x: -32, y: -107 },
        frameCount: 11,
      },
      {
        source: { x: 792, y: 995, width: 50, height: 89 },
        offset: { x: -25, y: -103 },
        frameCount: 6,
      },
      {
        source: { x: 853, y: 967, width: 54, height: 77 },
        offset: { x: -25, y: -103 },
        frameCount: 6,
      },
      {
        source: { x: 911, y: 966, width: 48, height: 70 },
        offset: { x: -28, y: -101 },
        frameCount: 6,
      },
      {
        source: { x: 975, y: 977, width: 48, height: 86 },
        offset: { x: -25, y: -103 },
        frameCount: 6,
      },
      {
        source: { x: 1031, y: 1008, width: 55, height: 103 },
        offset: { x: -32, y: -107 },
        frameCount: -1,
      },
    ],
  },
};
