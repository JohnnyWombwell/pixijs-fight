import { Rectangle } from "./pixi/pixi.js";

export interface IVector2D {
  x: number;
  y: number;
}

export interface IRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function rectangularCollision(
  rect1: IRectangle,
  rect2: IRectangle
): boolean {
  return (
    rect1.x + rect1.width >= rect2.x &&
    rect1.x <= rect2.x + rect2.width &&
    rect1.y + rect1.height >= rect2.y &&
    rect1.y <= rect2.y + rect2.height
  );
}

export function pixiRectFromRect(rect: IRectangle): Rectangle {
  return new Rectangle(rect.x, rect.y, rect.width, rect.height);
}
