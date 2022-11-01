import { IVector2D } from '../geometry.js';
import { Rectangle, Sprite } from '../pixi/pixi.js';
import { Forever, IAnimation, ISpriteFrame } from './animation.js';

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
  ended: boolean;
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
    ended: false,
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
  animation.ended = false;
}

export function refreshAnimation(animation: IRunningAnimation): void {
  if (updateFrame(animation)) {
    renderCurrentAnimationFrame(animation);
  }

  updateSpritePosition(animation);
}

function updateFrame(animation: IRunningAnimation): boolean {
  if (animation.ended) {
    return false;
  }

  if (animation.currentSequenceIndex >= 0) {
    const currentFrame =
      animation.definition.frameSequence[animation.currentSequenceIndex];

    animation.frameRefreshes += 1;

    if (animation.frameRefreshes <= currentFrame.period) {
      if (
        animation.definition.repeat === 0 &&
        animation.frameRefreshes === currentFrame.period &&
        animation.currentSequenceIndex + 1 ===
          animation.definition.frameSequence.length
      ) {
        animation.ended = true;
      }

      // Nothing to do - remain on this frame
      return false;
    }
  }

  const nextFrameIndex = animation.currentSequenceIndex + 1;

  if (nextFrameIndex < animation.definition.frameSequence.length) {
    animation.currentSequenceIndex = nextFrameIndex;
  } else if (animation.definition.repeat === Forever) {
    animation.currentSequenceIndex = 0;
  }

  animation.frameRefreshes = 1;
  if (
    animation.definition.repeat === 0 &&
    animation.definition.frameSequence[animation.currentSequenceIndex]
      .period === 1 &&
    animation.currentSequenceIndex + 1 ===
      animation.definition.frameSequence.length
  ) {
    animation.ended = true;
  }

  return true;
}

export function animationEnded(animation: IRunningAnimation) {
  return animation.ended;
}

function renderCurrentAnimationFrame(animation: IRunningAnimation) {
  /// TODO: cache current frame on this object - update in this method
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
}

function updateSpritePosition(animation: IRunningAnimation) {
  const frameName =
    animation.definition.frameSequence[animation.currentSequenceIndex]
      .frameName;

  const spriteFrame = animation.spriteSheetFrames.get(frameName)!;

  animation.sprite.x =
    animation.position.x +
    (spriteFrame.offset ? spriteFrame.offset.x * animation.directionX : 0);

  animation.sprite.y =
    animation.position.y + (spriteFrame.offset ? spriteFrame.offset.y : 0);

  animation.sprite.scale.x = animation.directionX;
}
