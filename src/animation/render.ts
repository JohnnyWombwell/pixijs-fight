import { Rectangle, Sprite } from '../pixi/pixi.js';
import { IAnimation, ISpriteFrame } from './animation.js';

export interface IRunningAnimation {
  definition: IAnimation;
  spriteSheetFrames: Map<string, ISpriteFrame>;
  spriteSheet: Sprite;
  currentSequenceIndex: number;
  frameRefreshes: number;
}

export function startAnimation(animation: IRunningAnimation): void {
  animation.currentSequenceIndex = 0;
  animation.frameRefreshes = 1;
  renderCurrentAnimationFrame(animation);
}

export function refreshAnimation(animation: IRunningAnimation): void {
  const currentFrame =
    animation.definition.frameSequence[animation.currentSequenceIndex];

  const frameRefreshes = animation.frameRefreshes;
  animation.frameRefreshes += 1;

  if (frameRefreshes < currentFrame.period) {
    // Nothing to do - remain on this frame
    return;
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

  animation.frameRefreshes = 0;
  renderCurrentAnimationFrame(animation);
}

function renderCurrentAnimationFrame(animation: IRunningAnimation) {
  const frameName =
    animation.definition.frameSequence[animation.currentSequenceIndex]
      .frameName;
  const spriteFrame = animation.spriteSheetFrames.get(frameName)!;

  animation.spriteSheet.texture.frame = new Rectangle(
    spriteFrame.frame.x,
    spriteFrame.frame.y,
    spriteFrame.frame.width,
    spriteFrame.frame.height
  );

  // TODO: offsets on the sprite would be applied to the sprite
  // position here - implies the object has a current position
  // independent of the pixi sprite position
}
