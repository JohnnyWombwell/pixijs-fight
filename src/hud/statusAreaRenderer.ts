import { IBattle } from '../game/battle.js';
import {
  BaseTexture,
  Container,
  Rectangle,
  Sprite,
  Texture,
} from '../pixi/pixi.js';
import { IRectangle, pixiRectFromRect } from '../geometry.js';
import { ISpriteSheetFrame } from '../animation/animation.js';

export class StatusAreaRenderer {
  private readonly _battle: IBattle;
  private readonly _healthBarSprites: Sprite[] = [];
  private _koSprite?: Sprite;
  private _timerSprites: Sprite[] = [];
  private _fighterNameSprites: Sprite[] = [];

  public constructor(
    battle: IBattle,
    baseTexture: BaseTexture,
    container: Container
  ) {
    this._battle = battle;

    this.setupHealthBars(baseTexture, container);
    this.setupKoSprite(baseTexture, container);
    this.setupTimer(baseTexture, container);
    this.setupFighterLabels(baseTexture, container);
  }

  public render(): void {
    const timeString = String(this._battle.roundTime).padStart(2, '00');
    this._timerSprites[0].texture.frame = pixiRectFromRect(
      numberFrames.get(`time-${timeString[0]}`)!
    );
    this._timerSprites[1].texture.frame = pixiRectFromRect(
      numberFrames.get(`time-${timeString[1]}`)!
    );
  }

  private setupHealthBars(
    baseTexture: BaseTexture,
    container: Container
  ): void {
    let healthBarSprite = new Sprite(new Texture(baseTexture));
    healthBarSprite.texture.frame = new Rectangle(16, 18, 145, 11);
    healthBarSprite.x = 31;
    healthBarSprite.y = 20;

    container.addChild(healthBarSprite);
    this._healthBarSprites.push(healthBarSprite);

    healthBarSprite = new Sprite(new Texture(baseTexture));
    healthBarSprite.texture.frame = new Rectangle(16, 18, 145, 11);
    healthBarSprite.x = 353;
    healthBarSprite.y = 20;
    healthBarSprite.pivot.x = 0.5;
    healthBarSprite.scale.x = -1;

    container.addChild(healthBarSprite);
    this._healthBarSprites.push(healthBarSprite);
  }

  private setupKoSprite(baseTexture: BaseTexture, container: Container): void {
    this._koSprite = new Sprite(new Texture(baseTexture));
    const source = koFrames[0].frame;
    this._koSprite.texture.frame = new Rectangle(
      source.x,
      source.y,
      source.width,
      source.height
    );
    this._koSprite.x = 176;
    this._koSprite.y = 18;
    container.addChild(this._koSprite);
  }

  private setupTimer(baseTexture: BaseTexture, container: Container): void {
    const defaultFrame = numberFrames.values().next().value;
    const defaultFrameRect = pixiRectFromRect(defaultFrame);

    let timerSprite = new Sprite(new Texture(baseTexture));
    timerSprite.texture.frame = defaultFrameRect;
    timerSprite.x = 178;
    timerSprite.y = 33;

    container.addChild(timerSprite);
    this._timerSprites.push(timerSprite);

    timerSprite = new Sprite(new Texture(baseTexture));
    timerSprite.texture.frame = defaultFrameRect;
    timerSprite.x = 192;
    timerSprite.y = 33;

    container.addChild(timerSprite);
    this._timerSprites.push(timerSprite);
  }

  private setupFighterLabels(
    baseTexture: BaseTexture,
    container: Container
  ): void {
    for (const fighterInfo of this._battle.fighters) {
      const sprite = new Sprite(new Texture(baseTexture));
      container.addChild(sprite);
      this._fighterNameSprites.push(sprite);

      const tagFrame = fighterNameTagFrames.get(fighterInfo.name.toLowerCase());
      if (tagFrame) {
        sprite.texture.frame = pixiRectFromRect(tagFrame);
      }
    }

    this._fighterNameSprites[0].x = 32;
    this._fighterNameSprites[0].y = 33;
    this._fighterNameSprites[1].x = 322;
    this._fighterNameSprites[1].y = 33;
  }
}

const koFrames: ISpriteSheetFrame[] = [
  {
    frame: { x: 161, y: 16, width: 32, height: 14 },
  },
];

const numberFrames: Map<string, IRectangle> = new Map([
  ['time-9', { x: 160, y: 32, width: 14, height: 16 }],
  ['time-8', { x: 144, y: 32, width: 14, height: 16 }],
  ['time-7', { x: 128, y: 32, width: 14, height: 16 }],
  ['time-6', { x: 112, y: 32, width: 14, height: 16 }],
  ['time-5', { x: 96, y: 32, width: 14, height: 16 }],
  ['time-4', { x: 80, y: 32, width: 14, height: 16 }],
  ['time-3', { x: 64, y: 32, width: 14, height: 16 }],
  ['time-2', { x: 48, y: 32, width: 14, height: 16 }],
  ['time-1', { x: 32, y: 32, width: 14, height: 16 }],
  ['time-0', { x: 16, y: 32, width: 14, height: 16 }],
]);

const fighterNameTagFrames: Map<string, IRectangle> = new Map([
  ['ryu', { x: 16, y: 56, width: 28, height: 9 }],
  ['ken', { x: 128, y: 56, width: 30, height: 9 }],
]);
