export interface IVector2D {
  x: number;
  y: number;
}

export interface IRectangle {
  position: IVector2D;
  size: IVector2D;
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
