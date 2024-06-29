import { Sprite } from '../sprites/Sprite';
import { Drawable } from '../types/Drawable';
import { Updateable } from '../types/Updateable';
import { Vector } from '../utils/Vector';
import { Health } from './Health';

export class Entity implements Drawable, Updateable {
  public position: Vector; // position on the map
  public sprite: Sprite; // the sprite of the entity

  public target: Vector | null; // the target position of the entity
  public opponent: Entity | null; // the entity that this entity is targeting

  private angle: number; // the angle of the entity
  private attacking: boolean; // is the entity attacking
  private health: Health; // the healthpoints of the entity

  constructor(sprite: Sprite, position: Vector = new Vector(0, 0)) {
    // classes
    this.position = position;
    this.sprite = sprite;

    // nullables
    this.target = null;
    this.opponent = null;

    // values
    this.angle = 0;
    this.attacking = false;
    this.health = new Health(20000, 10000, 0);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    // draw a box and set it to the angle
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    this.sprite.draw(ctx);
    ctx.restore();

    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.fillStyle = 'black';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';

    ctx.fillText(this.constructor.name, 0, this.sprite.height - 30);
    ctx.fillText(`(${Math.floor(this.position.x)}, ${Math.floor(this.position.y)})`, 0, this.sprite.height - 10);

    // log angle
    ctx.fillText(`${Math.floor((this.angle * 180) / Math.PI)}°`, 0, this.sprite.height - 50);

    // draw text healthpoints above playter
    ctx.fillText(`Hull: ${this.health.hull}`, 0, -100);
    ctx.fillText(`Shield: ${this.health.shield}`, 0, -60);
    ctx.fillText(`Health: ${this.health.health}`, 0, -80);

    ctx.restore();
  }

  public update() {
    if (this.target) {
      const distance = this.target.subtract(this.position);
      const direction = distance.normalize().multiply(2);

      const isCloseEnough = distance.length() < direction.length();
      if (isCloseEnough) {
        this.target = null;
      } else {
        this.position = this.position.add(direction);
      }
    }

    if (this.opponent && this.attacking) {
      // calculate the angle and set the sprite to the correct image
      const angle = this.position.subtract(this.opponent.position).angle();
      const normalizedAngle = angle >= 0 ? angle : 2 * Math.PI + angle;
      this.angle = normalizedAngle;

      // angle updated. set the sprite to the correct image.
      const images = this.sprite.size();
      this.sprite.update(Math.floor((this.angle / (2 * Math.PI)) * images) % images);
    } else if (this.target) {
      const angle = this.position.subtract(this.target).angle();
      const normalizedAngle = angle >= 0 ? angle : 2 * Math.PI + angle;
      this.angle = normalizedAngle;

      // angle updated. set the sprite to the correct image.
      const images = this.sprite.size();
      this.sprite.update(Math.floor((this.angle / (2 * Math.PI)) * images) % images);
    }
  }

  public move(target: Vector) {
    this.target = target;
  }

  public attack() {
    if (this.opponent) {
      this.attacking = true;
    }
  }

  public mark(opponent: Entity) {
    this.opponent = opponent;
    this.attacking = false;
  }

  public atPositionOf(position: Vector) {
    const distance = position.subtract(this.position);
    return distance.length() < this.sprite.height / 2;
  }
}
