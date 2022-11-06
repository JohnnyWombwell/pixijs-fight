import { expect } from '@esm-bundle/chai';
import { Camera } from '../camera.js';

const expectedViewPortSize = {
  width: 384,
  height: 224,
};

describe('Camera', () => {
  it('initialises view port to correct size', () => {
    const sut = new Camera({ x: 0, y: 0 }, []);
    expect(sut.viewPort).to.include({
      width: expectedViewPortSize.width,
      height: expectedViewPortSize.height,
    });
  });

  it('initialises view port to correct position', () => {
    const sut = new Camera({ x: 101, y: 202 }, []);
    expect(sut.viewPort).to.include({
      x: 101,
      y: 202,
    });
  });
});
