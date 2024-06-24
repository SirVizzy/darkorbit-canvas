import { Vector } from './Vector';

export class Entity {
  current: Vector;
  target: Vector | null;

  constructor(position: Vector) {
    this.current = position;
    this.target = null;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.current.x, this.current.y, 50, 0, 2 * Math.PI);
    ctx.fill();
  }

  public update() {
    if (this.target) {
      const distance = this.target.subtract(this.current);
      const direction = distance.normalize();
      this.current = this.current.add(direction);
    }
  }

  public moveTo = (target: Vector) => {
    this.target = target;
  };
}
