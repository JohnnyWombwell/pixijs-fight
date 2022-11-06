import { expect } from '@esm-bundle/chai';
import { Camera } from '../camera.js';
import { CharacterSimulation } from '../character.js';
import { Sprite } from '../pixi/pixi.js';

const ViewSize = {
  width: 384,
  height: 224,
};

const StageSize = {
  width: 768,
  height: 256,
};

describe('Camera', () => {
  it('initialises view port to view size', () => {
    const sut = new Camera({ x: 0, y: 0 }, []);
    expect(sut.viewPort).to.include({
      width: ViewSize.width,
      height: ViewSize.height,
    });
  });

  it('initialises view port to correct position', () => {
    const sut = new Camera({ x: 101, y: 202 }, []);
    expect(sut.viewPort).to.include({
      x: 101,
      y: 202,
    });
  });

  // TODO: tests for movement based on chars

  describe('Camera does not exceed stage bounds', () => {
    it('aligns to left edge of stage when characters at far left', () => {
      const charactersAtLeftEdge = [
        new CharacterSimulation({ x: 0, y: 0 }, new Sprite(), new Sprite()),
        new CharacterSimulation({ x: 0, y: 0 }, new Sprite(), new Sprite()),
      ];

      const sut = new Camera(
        { x: StageSize.width / 4, y: 16 },
        charactersAtLeftEdge
      );

      sut.update();

      expect(sut.viewPort.x).to.equal(0);
    });

    it('aligns to right edge of stage when characters at far right', () => {
      const charactersAtLeftEdge = [
        new CharacterSimulation(
          { x: StageSize.width, y: 0 },
          new Sprite(),
          new Sprite()
        ),
        new CharacterSimulation(
          { x: StageSize.width, y: 0 },
          new Sprite(),
          new Sprite()
        ),
      ];

      const sut = new Camera(
        { x: StageSize.width / 4, y: 16 },
        charactersAtLeftEdge
      );

      sut.update();

      expect(sut.viewPort.x).to.equal(StageSize.width - ViewSize.width);
    });
  });
});
