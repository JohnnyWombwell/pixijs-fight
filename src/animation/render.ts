import { IVector2D } from '../geometry.js';
import { Rectangle, Sprite } from '../pixi/pixi.js';
import { IAnimation, ISpriteFrame } from './animation.js';

export enum Direction {
  Right = 1,
  Left = -1,
}

export interface IRunningAnimation {
  definition: IAnimation;
  spriteSheetFrames: Map<string, ISpriteFrame>;
  sprite: Sprite;
  currentSequenceIndex: number;
  frameRefreshes: number;
  position: IVector2D;
  directionX: Direction;
}

export function newAnimation(
  definition: IAnimation,
  spriteSheetFrames: Map<string, ISpriteFrame>,
  spriteSheet: Sprite
): IRunningAnimation {
  return {
    definition,
    spriteSheetFrames,
    sprite: spriteSheet,
    currentSequenceIndex: -1,
    frameRefreshes: 0,
    position: { x: 0, y: 0 },
    directionX: Direction.Right,
  };
}

export function switchAnimation(
  animation: IRunningAnimation,
  newAnimation: IAnimation
) {
  animation.definition = newAnimation;
  animation.currentSequenceIndex = -1;
  animation.frameRefreshes = 0;
}

export function refreshAnimation(animation: IRunningAnimation): void {
  if (animation.currentSequenceIndex >= 0) {
    const currentFrame =
      animation.definition.frameSequence[animation.currentSequenceIndex];

    const frameRefreshes = animation.frameRefreshes;
    animation.frameRefreshes += 1;

    if (frameRefreshes !== 0 && frameRefreshes < currentFrame.period) {
      // Nothing to do - remain on this frame
      return;
    }
  }

  const nextFrameIndex = animation.currentSequenceIndex + 1;

  if (nextFrameIndex < animation.definition.frameSequence.length) {
    animation.currentSequenceIndex = nextFrameIndex;
  } else {
    if (animation.definition.repeat === 0) {
      // Remain on the last frame
      return;
    }

    // ...else repeat the animation
    animation.currentSequenceIndex = 0;
  }

  animation.frameRefreshes = 1;
  renderCurrentAnimationFrame(animation);
}

function renderCurrentAnimationFrame(animation: IRunningAnimation) {
  const frameName =
    animation.definition.frameSequence[animation.currentSequenceIndex]
      .frameName;

  const spriteFrame = animation.spriteSheetFrames.get(frameName)!;

  animation.sprite.texture.frame = new Rectangle(
    spriteFrame.frame.x,
    spriteFrame.frame.y,
    spriteFrame.frame.width,
    spriteFrame.frame.height
  );

  animation.sprite.x =
    animation.position.x +
    (spriteFrame.offset ? spriteFrame.offset.x * animation.directionX : 0);

  animation.sprite.y =
    animation.position.y + (spriteFrame.offset ? spriteFrame.offset.y : 0);

  animation.sprite.scale.x = animation.directionX;
}
