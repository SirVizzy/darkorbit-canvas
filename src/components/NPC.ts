import { Updateable } from "../types/Updateable";
import { Vector } from "../utils/Vector";
import { Entity } from "./Entity";

export class NPC extends Entity implements Updateable {
  public _passive: boolean;
  private _follow: boolean;

  constructor(entity: Entity, passive: boolean) {
    super(
      entity.sprite,
      entity.position,
      entity.health,
      entity.reward,
      entity.speed,
      entity.damage,
    );

    this._follow = false;
    this._passive = passive;
  }

  public update() {
    super.update();

    // if is aggresive immediately attack.
    if (this.attacking || !this.opponent) {
      // already attacking or no opponent right now.
      return;
    }

    // attack the player if aggressive or being attacked.
    if (!this._passive || this.isBeingAttackedBy(this.opponent)) {
      this.attack();
    }

    // For now just follow always 100 units behind the player, behind them meaning not in front or anything so angle maters.
    if (this.opponent && this._follow) {
      const distanceToFollow = 100;
      const distance = this.position.distance(this.opponent.position);

      if (distance > distanceToFollow) {
        // move towards the player
        this.move(this.opponent.position);
      } else {
        // we are already close, dont move.
        this.target = null;
      }
    }
  }

  public follow() {
    this._follow = true;
  }
}
