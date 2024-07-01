import { Sprite } from "../sprites/Sprite";
import { Room } from "../state";
import { Drawable } from "../types/Drawable";
import { Updateable } from "../types/Updateable";
import { Vector } from "../utils/Vector";
import { Damage } from "./Damage";
import { Health } from "./Health";
import { Projectile } from "./Projectile";
import { Reward } from "./Reward";

export class Entity implements Drawable, Updateable {
  public position: Vector; // position on the map
  public target: Vector | null; // the target position

  public sprite: Sprite; // the sprite of the entity

  public opponent: Entity | null; // the entity that this entity is targeting
  public attacking: boolean; // is the entity attacking
  public health: Health; // the healthpoints of the entity
  public reward: Reward; // the reward of the entity
  public damage: Damage; // the damage of the entity
  public room: Room | null; // the room of the entity

  public speed: number; // the speed of the entity
  private angle: number; // the angle of the entity
  private projectiles: Projectile[]; // the projectiles of the entity
  private firedAt: number; // the last time the entity fired

  private attackers: Set<Entity>; // the entities that are attacking this entity

  constructor(
    sprite: Sprite,
    position: Vector,
    health: Health,
    reward: Reward,
    speed: number,
    damage: Damage,
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

    // projectiles
    this.projectiles = [];
    this.firedAt = Date.now();

    this.reward = reward;
    this.speed = speed;
    this.damage = damage;

    this.attackers = new Set();
    this.room = null;
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

  // todo: rewrite and refactor
  public update() {
    const now = Date.now();

    // keep entity within the bounds of the room.
    if (this.room) {
      if (this.position.x < 0) {
        this.position.x = 0;
      } else if (this.position.x > this.room.width) {
        this.position.x = this.room.width;
      }

      if (this.position.y < 0) {
        this.position.y = 0;
      } else if (this.position.y > this.room.height) {
        this.position.y = this.room.height;
      }
    }

    if (this.target) {
      const distance = this.target.subtract(this.position);
      const direction = distance
        .normalize()
        .multiply(2)

        // todo: figure out how to make this accurate
        .multiply(this.speed / 750);

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
    if (!this.opponent) {
      return;
    }

    this.attacking = true;

    // notify the opponent that it is being attacked
    this.opponent.onHitBy(this);
  }

  public peace() {
    this.attacking = false;

    if (this.opponent) {
      // notify the opponent that it is not being attacked anymore
      this.opponent.onPeaceWith(this);
    }
  }

  public setRoom(room: Room) {
    this.room = room;
  }

  public mark(opponent: Entity) {
    this.opponent = opponent;
    this.attacking = false;
  }

  public atPositionOf(position: Vector) {
    const distance = position.subtract(this.position);
    return distance.length() < this.sprite.height / 2;
  }

  public onHitBy(entity: Entity) {
    this.attackers.add(entity);
  }

  public onPeaceWith(entity: Entity) {
    this.attackers.delete(entity);
  }

  public isBeingAttackedBy(entity: Entity) {
    return this.attackers.has(entity);
  }

  public getLastAttacker() {
    return Array.from(this.attackers)[this.attackers.size - 1];
  }

  private fire() {
    const opponent = this.opponent;

    if (opponent && this.isOpponentInRange()) {
      const projectile = new Projectile(this.position, opponent);
      this.projectiles.push(projectile);

      projectile.onHit((p) => {
        // reduce the health of the opponent
        opponent.health.remove(this.damage.value());

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
