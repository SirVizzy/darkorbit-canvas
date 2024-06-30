import { Sprite } from "../sprites/Sprite";
import { Drawable } from "../types/Drawable";
import { Updateable } from "../types/Updateable";
import { Vector } from "../utils/Vector";
import { Health } from "./Health";
import { Projectile } from "./Projectile";
import { Reward } from "./Reward";

export class Entity implements Drawable, Updateable {
  public position: Vector; // position on the map

  public sprite: Sprite; // the sprite of the entity

  public target: Vector | null; // the target position
  public opponent: Entity | null; // the entity that this entity is targeting
  public attacking: boolean; // is the entity attacking
  public health: Health; // the healthpoints of the entity
  public reward: Reward; // the reward of the entity

  private angle: number; // the angle of the entity
  private projectiles: Projectile[]; // the projectiles of the entity
  private following: boolean; // is the entity following the target
  private firedAt: number; // the last time the entity fired

  constructor(
    sprite: Sprite,
    position: Vector,
    health: Health,
    reward: Reward,
  ) {
    // classes
    this.position = position;
    this.sprite = sprite;

    // nullables
    this.target = null;
    this.opponent = null;

    // values
    this.angle = 0;
    this.attacking = false;
    this.health = health;
    this.following = false;

    // projectiles
    this.projectiles = [];
    this.firedAt = Date.now();

    this.reward = reward;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    // draw a box and set it to the angle
    ctx.save();
    ctx.translate(this.position.x, this.position.y);

    if (this.health.dead) {
      // Draw death animation (example: replace with actual animation logic)
      ctx.fillStyle = "black";
      ctx.font = "bold 100px Arial";
      ctx.textAlign = "center";
      ctx.fillText("☠️", 0, 0);
    } else {
      this.sprite.draw(ctx);
    }

    ctx.restore();

    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.fillStyle = "black";
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";

    ctx.fillText(this.constructor.name, 0, this.sprite.height - 30);
    ctx.fillText(
      `(${Math.floor(this.position.x)}, ${Math.floor(this.position.y)})`,
      0,
      this.sprite.height - 10,
    );

    // log angle
    ctx.fillText(
      `${Math.floor((this.angle * 180) / Math.PI)}°`,
      0,
      this.sprite.height - 50,
    );

    // draw text healthpoints above playter
    ctx.fillText(`Hull: ${this.health.hull}`, 0, -100);
    ctx.fillText(`Shield: ${this.health.shield}`, 0, -60);
    ctx.fillText(`Health: ${this.health.health}`, 0, -80);

    ctx.restore();

    // draw projectiles
    this.projectiles.forEach((projectile) => projectile.draw(ctx));
  }

  public update() {
    const now = Date.now();

    if (this.opponent && this.following && !this.target) {
      const circleCenter = this.opponent.position;
      const circleRadius = 200; // Adjust the radius as needed

      const distanceToOpponent = this.position.distance(this.opponent.position);

      // Generate a random angle for the position on the circle
      const randomAngle = Math.random() * 2 * Math.PI;

      // Calculate the random position on the circle
      const randomPosition = new Vector(
        circleCenter.x + circleRadius * Math.cos(randomAngle),
        circleCenter.y + circleRadius * Math.sin(randomAngle),
      );

      if (distanceToOpponent >= circleRadius) {
        this.move(randomPosition);
      }
    } else if (this.target) {
      const distance = this.target.subtract(this.position);
      const direction = distance.normalize().multiply(2);

      const isCloseEnough = distance.length() < direction.length();

      if (isCloseEnough) {
        this.target = null;
      } else {
        this.position = this.position.add(direction);
      }
    }

    // if opponent is dead, stop attacking
    if (this.opponent && this.opponent.health.dead) {
      this.opponent = null;
      this.attacking = false;
      this.projectiles = [];
    }

    if (this.opponent && this.attacking) {
      // calculate the angle and set the sprite to the correct image
      const angle = this.position.subtract(this.opponent.position).angle();
      const normalizedAngle = angle >= 0 ? angle : 2 * Math.PI + angle;
      this.angle = normalizedAngle;

      // angle updated. set the sprite to the correct image.
      const images = this.sprite.size();
      this.sprite.update(
        Math.floor((this.angle / (2 * Math.PI)) * images) % images,
      );

      // fire projectile every second
      if (now - this.firedAt >= 1000) {
        this.fire();
        this.firedAt = now;
      }
    } else if (this.target) {
      const angle = this.position.subtract(this.target).angle();
      const normalizedAngle = angle >= 0 ? angle : 2 * Math.PI + angle;
      this.angle = normalizedAngle;

      // angle updated. set the sprite to the correct image.
      const images = this.sprite.size();
      this.sprite.update(
        Math.floor((this.angle / (2 * Math.PI)) * images) % images,
      );
    }

    // update projectiles
    this.projectiles.forEach((projectile) => projectile.update());
  }

  public move(target: Vector) {
    this.target = target;
  }

  public attack() {
    if (this.opponent) {
      this.attacking = true;
    }
  }

  public peace() {
    this.attacking = false;
  }

  public mark(opponent: Entity) {
    this.opponent = opponent;
    this.attacking = false;
  }

  public atPositionOf(position: Vector) {
    const distance = position.subtract(this.position);
    return distance.length() < this.sprite.height / 2;
  }

  public follow() {
    this.following = true;
  }

  private fire() {
    const opponent = this.opponent;

    if (opponent && this.isOpponentInRange()) {
      const projectile = new Projectile(this.position, opponent);
      this.projectiles.push(projectile);

      projectile.onHit((p) => {
        // reduce the health of the opponent
        opponent.health.remove(Math.round(Math.random() * 10000));

        this.projectiles = this.projectiles.filter(
          (projectile) => projectile !== p,
        );
      });
    }
  }

  private isOpponentInRange() {
    if (!this.opponent) {
      return false;
    }

    return this.position.subtract(this.opponent.position).length() < 1000;
  }
}
