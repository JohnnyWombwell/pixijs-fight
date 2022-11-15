import { IRectangle, IVector2D } from '../geometry.js';
import { Rectangle, Sprite } from '../pixi/pixi.js';
import {
  Forever,
  IAnimation,
  IPushBoxFrame,
  ISpriteSheetFrame,
} from './animation.js';

export enum Direction {
  Right = 1,
  Left = -1,
}

// TODO: Create a body Animation
// That animates body models with sprites
export interface IRunningAnimation {
  definition: IAnimation;
  spriteSheetFrames: Map<string, ISpriteSheetFrame>;
  sprite: Sprite;
  totalFrames: number;
  framesElapsed: number;
  currentSequenceIndex: number;
  currentFrame: ISpriteSheetFrame;
  currentBody: {
    push: {
      body: IRectangle;
      untilFrame: number;
    };
  };
  frameRefreshes: number;
  ended: boolean;
  position: IVector2D;
  directionX: Direction;
}

export function newAnimation(
  definition: IAnimation,
  spriteSheetFrames: Map<string, ISpriteSheetFrame>,
  spriteSheet: Sprite
): IRunningAnimation {
  return {
    definition,
    spriteSheetFrames,
    sprite: spriteSheet,
    totalFrames: definition.frameSequence.reduce((a, f) => (a += f.period), 0),
    framesElapsed: 0,
    currentSequenceIndex: -1,
    currentFrame: spriteSheetFrames.values().next().value,
    currentBody: {
      push: {
        body: { x: 0, y: 0, width: 0, height: 0 },
        untilFrame: 0,
      },
    },
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
  animation.totalFrames = newAnimation.frameSequence.reduce(
    (a, f) => (a += f.period),
    0
  );
  animation.framesElapsed = 0;

  if (animation.definition.pushBoxSequence) {
    animation.currentBody.push = setBody(
      animation.definition.pushBoxSequence,
      0
    );
  }

  animation.currentSequenceIndex = -1;
  animation.frameRefreshes = 0;
  animation.ended = false;
}

export function refreshAnimation(animation: IRunningAnimation): void {
  updateBody(animation);

  // Note: probably should just do an update
  // A graphics specifc class should the apply the current frame (on change)
  if (updateFrame(animation)) {
    renderCurrentAnimationFrame(animation);
  }

  updateSpritePosition(animation);

  if (animation.ended) {
    return;
  }

  animation.framesElapsed += 1;
  if (animation.framesElapsed === animation.totalFrames) {
    animation.framesElapsed = 0;
  }
}

function updateBody(animation: IRunningAnimation): void {
  if (
    !animation.definition.pushBoxSequence ||
    animation.definition.pushBoxSequence.length <= 1
  ) {
    return;
  }

  if (animation.framesElapsed < animation.currentBody.push.untilFrame) {
    return;
  }

  for (let i = 0; i < animation.definition.pushBoxSequence.length; i++) {
    if (
      animation.definition.pushBoxSequence[i].fromFrame ===
      animation.framesElapsed
    ) {
      animation.currentBody.push = setBody(
        animation.definition.pushBoxSequence,
        i
      );
      return;
    }
  }
}

function setBody(bodyFrames: IPushBoxFrame[], bodyIndex: number) {
  const untilFrame =
    bodyFrames.length > bodyIndex + 1
      ? bodyFrames[bodyIndex + 1].fromFrame
      : 9999;

  return {
    body: bodyFrames[bodyIndex].body,
    untilFrame: untilFrame,
  };
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

  animation.currentFrame = animation.spriteSheetFrames.get(
    animation.definition.frameSequence[animation.currentSequenceIndex].frameName
  )!;

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
  animation.sprite.texture.frame = new Rectangle(
    animation.currentFrame.frame.x,
    animation.currentFrame.frame.y,
    animation.currentFrame.frame.width,
    animation.currentFrame.frame.height
  );
}

function updateSpritePosition(animation: IRunningAnimation) {
  animation.sprite.x =
    animation.position.x +
    (animation.currentFrame.offset
      ? animation.currentFrame.offset.x * animation.directionX
      : 0);

  animation.sprite.y =
    animation.position.y +
    (animation.currentFrame.offset ? animation.currentFrame.offset.y : 0);

  animation.sprite.scale.x = animation.directionX;
}
