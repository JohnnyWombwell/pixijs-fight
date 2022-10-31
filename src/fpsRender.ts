import { Container, Text } from './pixi/pixi.js';

export class FpsRenderer {
  private readonly _text: Text;

  public constructor(container: Container) {
    this._text = new Text('000', {
      fontFamily: 'Press Start 2P',
      fontSize: 8,
    });

    this._text.anchor.set(1, 1);
    this._text.x = 384;
    this._text.y = 224;
    this._text.style.fill = 'green';

    container.addChild(this._text);
  }

  public update(fps: number): void {
    this._text.text = Math.floor(fps + 0.5).toString();
  }

  public render(): void {}
}
