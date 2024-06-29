import { Drawable } from "../types/Drawable";
import { Updateable } from "../types/Updateable";
import { Vector } from "../utils/Vector";
import { Entity } from "./Entity";

export class Projectile implements Drawable, Updateable {
  public position: Vector;
  public target: Entity;

  public hit: boolean;

  private firedAt: number;
  private duration: number;

  private onHitHandler: (projectile: Projectile) => void;

  constructor(position: Vector, target: Entity, duration: number = 10_000) {
    this.position = position;
    this.target = target;

    this.hit = false;
    this.firedAt = Date.now();
    this.duration = duration;

    // TODO: Make projectile hit the target visually given the duration.

    this.onHitHandler = () => {};
  }

  public callToFunction() {}

  public test() {
    const variable = "tr";

    return variable;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);

    // shoot red circle
    if (!this.hit) {
      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
    }

    ctx.restore();
  }

  public update() {
    if (!this.hit) {
      const elapsed = Date.now() - this.firedAt;
      // move the projectile towards the target
      const distance = this.target.position.subtract(this.position);
      const direction = distance.normalize().multiply(2);

      this.position = this.position.add(direction);

      if (
        elapsed >= this.duration ||
        this.position.distance(this.target.position) < 10
      ) {
        this.onHitHandler(this);
        this.hit = true;
      }
    }
  }

  public onHit(onHitHandler: (projectile: Projectile) => void) {
    this.onHitHandler = onHitHandler;
  }
}
