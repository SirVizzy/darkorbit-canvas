import { Sprite } from '../sprites/Sprite';
import { Vector } from '../utils/Vector';

export class Entity {
  public current: Vector;
  public target: Vector | null;
  public angle: number;

  private sprite: Sprite;

  constructor(sprite: Sprite, current: Vector = new Vector(0, 0)) {
    this.current = current;
    this.target = null;
    this.angle = 0;
    this.sprite = sprite;

    // preload the images in the sprite.
    this.sprite.preloadAll();
  }

  public draw(ctx: CanvasRenderingContext2D) {
    // draw a box and set it to the angle
    ctx.save();
    ctx.translate(this.current.x, this.current.y);
    this.sprite.draw(ctx);
    ctx.restore();

    ctx.save();
    ctx.translate(this.current.x, this.current.y);
    ctx.fillStyle = 'black';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';

    ctx.fillText(this.constructor.name, 0, this.sprite.height() - 30);
    ctx.fillText(`(${Math.floor(this.current.x)}, ${Math.floor(this.current.y)})`, 0, this.sprite.height() - 10);

    ctx.restore();
  }

  public update() {
    if (this.target) {
      const distance = this.target.subtract(this.current);
      const direction = distance.normalize().multiply(2);
      this.current = this.current.add(direction);
    }
  }

  public moveTo = (target: Vector) => {
    this.target = target;
  };

  public setAngle = (angle: number) => {
    this.angle = angle;

    // angle updated. set the sprite to the correct image.
    const images = this.sprite.size();

    // angle is value between 0 and 360 degrees
    const index = Math.floor((angle / (2 * Math.PI)) * images) % images;
    this.sprite.update(index);
  };
}
