import { ISpriteSheetResource } from "./animation/spriteSheetResource.js";

export const kenResource: ISpriteSheetResource = {
  texturePath: 'assets/images/ken-masters.png',
  image: {
    shadow: {
      source: { x: 0, y: 4065, width: 68, height: 11 },
      offset: { x: 0, y: -7 },
    },
  },
  animation: {
    idle: [
      {
        source: { x: 346, y: 688, width: 60, height: 89 },
        offset: { x: -34, y: -86 },
      },
      {
        source: { x: 2, y: 687, width: 59, height: 90 },
        offset: { x: -33, y: -87 },
      },
      {
        source: { x: 72, y: 685, width: 58, height: 92 },
        offset: { x: -32, y: -89 },
      },
      {
        source: { x: 142, y: 684, width: 55, height: 93 },
        offset: { x: -31, y: -90 },
      },
      {
        source: { x: 72, y: 685, width: 58, height: 92 },
        offset: { x: -32, y: -89 },
      },
      {
        source: { x: 2, y: 687, width: 59, height: 90 },
        offset: { x: -33, y: -87 },
      },
    ],
    walkForward: [
      {
        source: { x: 8, y: 872, width: 53, height: 83 },
        offset: { x: -27, y: -81 },
        frameCount: 3,
      },
      {
        source: { x: 70, y: 687, width: 60, height: 88 },
        offset: { x: -35, y: -86 },
        frameCount: 6,
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
        frameCount: 6,
      },
    ],
    walkBackward: [
      {
        source: { x: 417, y: 868, width: 61, height: 87 },
        offset: { x: -35, y: -85 },
        frameCount: 3,
      },
      {
        source: { x: 487, y: 866, width: 59, height: 90 },
        offset: { x: -36, y: -87 },
        frameCount: 6,
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
        offset: { x: -36, y: -87 },
      },
      {
        source: { x: 773, y: 866, width: 57, height: 89 },
        offset: { x: -36, y: -87 },
        frameCount: 6,
      },
    ],
    neutralJump: [
      {
        source: { x: 724, y: 1036, width: 56, height: 104 },
        offset: { x: -31, y: -107 },
        frameCount: 9,
      },
      {
        source: { x: 792, y: 995, width: 50, height: 89 },
        offset: { x: -25, y: -103 },
        frameCount: 8,
      },
      {
        source: { x: 853, y: 967, width: 54, height: 77 },
        offset: { x: -25, y: -103 },
        frameCount: 8,
      },
      {
        source: { x: 911, y: 966, width: 48, height: 70 },
        offset: { x: -28, y: -101 },
        frameCount: 8,
      },
      {
        source: { x: 975, y: 977, width: 48, height: 86 },
        offset: { x: -25, y: -103 },
        frameCount: 8,
      },
      {
        source: { x: 1031, y: 1008, width: 55, height: 103 },
        offset: { x: -32, y: -103 },
        frameCount: -1,
      },
    ],
    jumpForward: [
      {
        source: { x: 1237, y: 1037, width: 55, height: 103 },
        offset: { x: -25, y: -106 },
        frameCount: 14,
      },
      {
        source: { x: 1301, y: 990, width: 61, height: 78 },
        offset: { x: -22, y: -90 },
        frameCount: 5,
      },
      {
        source: { x: 1363, y: 994, width: 104, height: 42 },
        offset: { x: -61, y: -76 },
        frameCount: 3,
      },
      {
        source: { x: 1468, y: 957, width: 53, height: 82 },
        offset: { x: -28, y: -101 },
        frameCount: 3,
      },
      {
        source: { x: 1541, y: 988, width: 122, height: 44 },
        offset: { x: -71, y: -81 },
        frameCount: 3,
      },
      {
        source: { x: 1664, y: 976, width: 71, height: 87 },
        offset: { x: -53, y: -98 },
        frameCount: 5,
      },
      {
        source: { x: 1748, y: 977, width: 55, height: 103 },
        offset: { x: -32, y: -107 },
        frameCount: -1,
      },
    ],
    jumpBackward: [
      {
        source: { x: 1664, y: 976, width: 71, height: 87 },
        offset: { x: -53, y: -98 },
        frameCount: 15,
      },
      {
        source: { x: 1541, y: 988, width: 122, height: 44 },
        offset: { x: -71, y: -81 },
        frameCount: 3,
      },
      {
        source: { x: 1468, y: 957, width: 53, height: 82 },
        offset: { x: -28, y: -101 },
        frameCount: 3,
      },
      {
        source: { x: 1363, y: 994, width: 104, height: 42 },
        offset: { x: -61, y: -76 },
        frameCount: 3,
      },
      {
        source: { x: 1301, y: 990, width: 61, height: 78 },
        offset: { x: -22, y: -90 },
        frameCount: 3,
      },
      {
        source: { x: 1237, y: 1037, width: 55, height: 103 },
        offset: { x: -25, y: -106 },
        frameCount: -1,
      },
    ],
    jumpStart: [
      {
        source: { x: 660, y: 1060, width: 55, height: 85 },
        offset: { x: -29, y: -83 },
        frameCount: 3,
      },
      {
        source: { x: 660, y: 1060, width: 55, height: 85 },
        offset: { x: -29, y: -83 },
        frameCount: -2,
      },
    ],
    jumpRecovery: [
      {
        source: { x: 660, y: 1060, width: 55, height: 85 },
        offset: { x: -29, y: -83 },
        frameCount: 2,
      },
      {
        source: { x: 660, y: 1060, width: 55, height: 85 },
        offset: { x: -29, y: -83 },
        frameCount: 7,
      },
      {
        source: { x: 660, y: 1060, width: 55, height: 85 },
        offset: { x: -29, y: -83 },
        frameCount: -2,
      },
    ],
    crouchDown: [
      {
        source: { x: 8, y: 779, width: 53, height: 83 },
        offset: { x: -27, y: -81 },
        frameCount: 2,
      },
      {
        source: { x: 79, y: 794, width: 57, height: 69 },
        offset: { x: -25, y: -66 },
        frameCount: 2,
      },
      {
        source: { x: 148, y: 802, width: 61, height: 61 },
        offset: { x: -25, y: -58 },
        frameCount: 2,
      },
      {
        source: { x: 148, y: 802, width: 61, height: 61 },
        offset: { x: -25, y: -58 },
        frameCount: -2,
      },
    ],
    crouched: [
      {
        source: { x: 148, y: 802, width: 61, height: 61 },
        offset: { x: -25, y: -58 },
        frameCount: -1,
      },
    ],
    crouchingLightPunch: [
      {
        source: { x: 10, y: 1425, width: 69, height: 61 },
        offset: { x: -25, y: -58 },
        frameCount: 3,
      },
      {
        source: { x: 89, y: 1425, width: 95, height: 61 },
        offset: { x: -25, y: -58 },
        frameCount: 3,
      },
      {
        source: { x: 10, y: 1425, width: 69, height: 61 },
        offset: { x: -25, y: -58 },
        frameCount: 3,
      },
      {
        source: { x: 10, y: 1425, width: 69, height: 61 },
        offset: { x: -25, y: -58 },
        frameCount: -2,
      },
    ],
    crouchUp: [
      {
        source: { x: 148, y: 802, width: 61, height: 61 },
        offset: { x: -25, y: -58 },
        frameCount: 2,
      },
      {
        source: { x: 79, y: 794, width: 57, height: 69 },
        offset: { x: -25, y: -66 },
        frameCount: 2,
      },
      {
        source: { x: 8, y: 779, width: 53, height: 83 },
        offset: { x: -27, y: -81 },
        frameCount: 2,
      },
      {
        source: { x: 8, y: 779, width: 53, height: 83 },
        offset: { x: -27, y: -81 },
        frameCount: -2,
      },
    ],
    turn: [
      {
        source: { x: 560, y: 683, width: 54, height: 94 },
        offset: { x: -27, y: -90 },
        frameCount: 2,
      },
      {
        source: { x: 488, y: 678, width: 58, height: 98 },
        offset: { x: -30, y: -95 },
        frameCount: 2,
      },
      {
        source: { x: 420, y: 682, width: 54, height: 95 },
        offset: { x: -29, y: -92 },
        frameCount: 2,
      },
      {
        source: { x: 420, y: 682, width: 54, height: 95 },
        offset: { x: -29, y: -92 },
        frameCount: -2,
      },
    ],
    crouchTurn: [
      {
        source: { x: 486, y: 802, width: 53, height: 61 },
        offset: { x: -29, y: -58 },
        frameCount: 2,
      },
      {
        source: { x: 424, y: 802, width: 52, height: 61 },
        offset: { x: -27, y: -58 },
        frameCount: 2,
      },
      {
        source: { x: 356, y: 802, width: 53, height: 61 },
        offset: { x: -26, y: -58 },
        frameCount: 2,
      },
      {
        source: { x: 356, y: 802, width: 53, height: 61 },
        offset: { x: -26, y: -58 },
        frameCount: -2,
      },
    ],
    standingLightPunch: [
      {
        source: { x: 3, y: 1152, width: 64, height: 91 },
        offset: { x: -32, y: -88 },
        frameCount: 3,
      },
      {
        source: { x: 72, y: 1152, width: 92, height: 91 },
        offset: { x: -32, y: -88 },
        frameCount: 4,
      },
      {
        source: { x: 167, y: 1152, width: 64, height: 91 },
        offset: { x: -32, y: -88 },
        frameCount: 4,
      },
      {
        source: { x: 167, y: 1152, width: 64, height: 91 },
        offset: { x: -32, y: -88 },
        frameCount: -2,
      },
    ],
    jumpingLightPunch: [
      {
        source: { x: 1, y: 1487, width: 52, height: 68 },
        offset: { x: -30, y: -100 },
        frameCount: 2,
      },
      {
        source: { x: 54, y: 1487, width: 81, height: 71 },
        offset: { x: -30, y: -100 },
        frameCount: -1,
      },
      {
        source: { x: 1, y: 1487, width: 52, height: 68 },
        offset: { x: -30, y: -100 },
        frameCount: 2,
      },
      {
        source: { x: 1, y: 1487, width: 52, height: 68 },
        offset: { x: -30, y: -100 },
        frameCount: -1,
      },
    ],
    standingHeavyKick: [
      {
        source: { x: 683, y: 1571, width: 61, height: 90 },
        offset: { x: -37, y: -87 },
        frameCount: 3,
      },
      {
        source: { x: 763, y: 1567, width: 95, height: 94 },
        offset: { x: -44, y: -91 },
        frameCount: 5,
      },
      {
        source: { x: 870, y: 1567, width: 120, height: 94 },
        offset: { x: -41, y: -91 },
        frameCount: 9,
      },
      {
        source: { x: 1005, y: 1584, width: 101, height: 77 },
        offset: { x: -38, y: -74 },
        frameCount: 11,
      },
      {
        source: { x: 1147, y: 1580, width: 64, height: 81 },
        offset: { x: -33, y: -78 },
        frameCount: 7,
      },
      {
        source: { x: 1147, y: 1580, width: 64, height: 81 },
        offset: { x: -33, y: -78 },
        frameCount: -2,
      },
    ],
    crouchingHeavyKick: [
      {
        source: { x: 785, y: 2018, width: 52, height: 60 },
        offset: { x: -13, y: -57 },
        frameCount: 4,
      },
      {
        source: { x: 848, y: 2020, width: 121, height: 58 },
        offset: { x: -33, y: -55 },
        frameCount: 7,
      },
      {
        source: { x: 978, y: 2019, width: 62, height: 59 },
        offset: { x: -17, y: -56 },
        frameCount: 7,
      },
      {
        source: { x: 1049, y: 2019, width: 62, height: 59 },
        offset: { x: -37, y: -56 },
        frameCount: 9,
      },
      {
        source: { x: 1123, y: 2017, width: 53, height: 61 },
        offset: { x: -26, y: -58 },
        frameCount: 12,
      },
      {
        source: { x: 1123, y: 2017, width: 53, height: 61 },
        offset: { x: -26, y: -58 },
        frameCount: -2,
      },
    ],
    jumpingHeavyKick: [
      {
        source: { x: 785, y: 2092, width: 60, height: 76 },
        offset: { x: -25, y: -103 },
        frameCount: 2,
      },
      {
        source: { x: 724, y: 2092, width: 63, height: 72 },
        offset: { x: -25, y: -103 },
        frameCount: 3,
      },
      {
        source: { x: 788, y: 2092, width: 110, height: 58 },
        offset: { x: -20, y: -103 },
        frameCount: 7,
      },
      {
        source: { x: 724, y: 2092, width: 63, height: 72 },
        offset: { x: -25, y: -103 },
        frameCount: 3,
      },
      {
        source: { x: 1, y: 1487, width: 52, height: 68 },
        offset: { x: -25, y: -103 },
        frameCount: 3,
      },
      {
        source: { x: 975, y: 977, width: 48, height: 86 },
        offset: { x: -25, y: -103 },
        frameCount: 3,
      },
      {
        source: { x: 1031, y: 1008, width: 55, height: 103 },
        offset: { x: -32, y: -107 },
        frameCount: -1,
      },
    ],
    neutralJumpHeavyKick: [
      {
        source: { x: 129, y: 2092, width: 69, height: 104 },
        offset: { x: -35, y: -105 },
        frameCount: 2,
      },
      {
        source: { x: 199, y: 2080, width: 53, height: 94 },
        offset: { x: -18, y: -115 },
        frameCount: 4,
      },
      {
        source: { x: 253, y: 2084, width: 94, height: 103 },
        offset: { x: -20, y: -111 },
        frameCount: 4,
      },
      {
        source: { x: 348, y: 2089, width: 58, height: 95 },
        offset: { x: -21, y: -105 },
        frameCount: 4,
      },
      {
        source: { x: 407, y: 2087, width: 58, height: 89 },
        offset: { x: -29, y: -106 },
        frameCount: 3,
      },
      {
        source: { x: 975, y: 977, width: 48, height: 86 },
        offset: { x: -25, y: -103 },
        frameCount: 3,
      },
      {
        source: { x: 1031, y: 1008, width: 55, height: 103 },
        offset: { x: -32, y: -107 },
        frameCount: -1,
      },
    ],
  },
};
