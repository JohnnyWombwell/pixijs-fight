export interface IVector2D {
  x: number;
  y: number;
}

// TODO: probably migrate to the structure below
export interface IRectangle {
  position: IVector2D;
  size: IVector2D;
}

export interface IRect {
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
    rect1.position.x + rect1.size.x >= rect2.position.x &&
    rect1.position.x <= rect2.position.x + rect2.size.x &&
    rect1.position.y + rect1.size.y >= rect2.position.y &&
    rect1.position.y <= rect2.position.y + rect2.size.y
  );
}
