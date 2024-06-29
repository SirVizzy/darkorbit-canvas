import { Sprite } from '../sprites/Sprite';
import { Vector } from '../utils/Vector';

export class Entity {
  public currentPosition: Vector;
  public targetPosition: Vector | null;
  public angle: number;
  public target: Entity | null;
  public isFollowing: boolean;
  public speed = 2;

  private marked: boolean = false;
  private sprite: Sprite;

  constructor(sprite: Sprite, speed: number, current: Vector = new Vector(0, 0)) {
    this.currentPosition = current;
    this.targetPosition = null;
    this.angle = 0;
    this.sprite = sprite;
    this.target = null;
    this.isFollowing = false;
    this.speed = speed;

    // preload the images in the sprite.
    this.sprite.preloadAll();
  }

  public draw(ctx: CanvasRenderingContext2D) {
    // draw a box and set it to the angle
    ctx.save();
    ctx.translate(this.currentPosition.x, this.currentPosition.y);
    this.sprite.draw(ctx);
    ctx.restore();

    ctx.save();
    ctx.translate(this.currentPosition.x, this.currentPosition.y);
    ctx.fillStyle = 'black';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';

    // if marked draw a circle around the entity
    if (this.marked) {
      ctx.beginPath();
      ctx.arc(0, 0, this.sprite.height() / 2, 0, 2 * Math.PI);
      ctx.stroke();
    }

    ctx.fillText(this.constructor.name, 0, this.sprite.height() - 30);
    ctx.fillText(`(${Math.floor(this.currentPosition.x)}, ${Math.floor(this.currentPosition.y)})`, 0, this.sprite.height() - 10);

    // log angle
    ctx.fillText(`${Math.floor((this.angle * 180) / Math.PI)}°`, 0, this.sprite.height() - 50);

    ctx.restore();
  }

  public update() {
    if (this.targetPosition) {
      const distance = this.targetPosition.subtract(this.currentPosition);
      const direction = distance.normalize().multiply(this.speed);
      this.currentPosition = this.currentPosition.add(direction);
    }

    if (this.target) {
      const angle = this.currentPosition.subtract(this.target.currentPosition).angle();
      const normalizedAngle = angle >= 0 ? angle : 2 * Math.PI + angle;
      this.setAngle(normalizedAngle);
    }
  }

  public move = (target: Vector) => {
    this.targetPosition = target;
  };

  public isMouseOnEntity = (mouse: Vector) => {
    // check if mouse is within the bounding box of the entity
    const distance = mouse.subtract(this.currentPosition);
    return distance.length() < this.sprite.height() / 2;
  };

  public setAngle = (angle: number) => {
    this.angle = angle;

    // angle updated. set the sprite to the correct image.
    const images = this.sprite.size();

    // angle is value between 0 and 360 degrees
    const index = Math.floor((this.angle / (2 * Math.PI)) * images) % images;
    this.sprite.update(index);
  };

  public mark = (target: Entity) => {
    this.target = target;
  };

  public setFollow = (follow: boolean) => {
    this.isFollowing = follow;

    // set interval every 100ms pick a new point to  move to, new point is always in a circle around the target

    let lastTargetPosition = this.targetPosition;

    setInterval(() => {
      console.log({ lastTargetPosition, currentPos: this.target?.currentPosition });
      if (this.isFollowing && this.target && !lastTargetPosition?.equals(this.target.currentPosition, 50)) {
        const radius = 200; // Radius of the circle around the player
        const angle = Math.random() * 2 * Math.PI; // Random angle around the circle
        const xOffset = radius * Math.cos(angle);
        const yOffset = radius * Math.sin(angle);

        // Calculate target position around the player
        const targetPosition = this.target.currentPosition.add(new Vector(xOffset, yOffset));

        // Move towards the target
        this.targetPosition = targetPosition;
      }

      lastTargetPosition = this.target?.currentPosition ?? null;
    }, 300);
  };
}
