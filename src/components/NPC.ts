import { Updateable } from "../types/Updateable";
import { Vector } from "../utils/Vector";
import { Entity } from "./Entity";

export class NPC extends Entity implements Updateable {
  public _passive: boolean;
  private _follow: boolean;
  private _roam: boolean;

  private _roamCooldown: number;
  private _lastRoamTime: number;

  // npcs can onkly attack one entity at a time.
  private attacker: Entity | null;

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
    this._roam = true;

    this._roamCooldown = 0;
    this._lastRoamTime = Date.now();
    this.attacker = null;
  }

  public update() {
    super.update();

    // if has attacker, attack them.
    if (this.attackers.size > 0) {
      const firstAttackerInList = Array.from(this.attackers)[0];
      if (this.attacker !== firstAttackerInList) {
        // mark the new attacker
        this.attacker = firstAttackerInList;

        // attack the attacker
        this.mark(this.attacker);
        this.attack();
      }
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
    } else if (this._roam) {
      // roam around
      const now = Date.now();

      if (now - this._lastRoamTime > this._roamCooldown) {
        this._lastRoamTime = now;

        // set new random roam time.
        this._roamCooldown = Math.random() * 2000 + 1000; // Roam every 1-3 seconds

        console.log("roam time!");

        // TODO: Don't roam out of map bounds.

        const roamRadius = 100; // Roam within a radius of 50 units
        const angle = Math.random() * 2 * Math.PI;
        const roamX = this.position.x + roamRadius * Math.cos(angle);
        const roamY = this.position.y + roamRadius * Math.sin(angle);

        const newPosition = new Vector(roamX, roamY);
        this.move(newPosition);
      }
    }

    // attack the player if aggressive or being attacked.
    if (this.opponent && !this._passive) {
      this.attack();
    }
  }

  public follow() {
    this._follow = true;
  }

  public roam() {
    // todo: all npc sshould roam, but if an attackable enemy is in range, they should attack.
    this._roam = true;
  }
}
