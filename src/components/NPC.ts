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

    // if is aggressive, attack the player.
    if (!this._passive || this.isBeingAttackedBy(this.opponent)) {
      this.attack();
    }

    if (this.opponent && this._follow && !this.target) {
      const circleCenter = this.opponent.position;
      const circleRadius = 200; // Adjust the radius as needed

      const distanceToOpponent = this.position.distance(this.opponent.position);

      // Check if within the circle and move to the border if true
      if (distanceToOpponent < circleRadius) {
        const angleToCenter = this.position.subtract(circleCenter).angle();
        const borderPosition = new Vector(
          circleCenter.x + circleRadius * Math.cos(angleToCenter),
          circleCenter.y + circleRadius * Math.sin(angleToCenter),
        );
        this.move(borderPosition);
      } else {
        // Generate a random angle for the position on the circle
        const randomAngle = Math.random() * 2 * Math.PI;

        // Calculate the random position on the circle
        const randomPosition = new Vector(
          circleCenter.x + circleRadius * Math.cos(randomAngle),
          circleCenter.y + circleRadius * Math.sin(randomAngle),
        );
        this.move(randomPosition);
      }
    }
  }

  public follow() {
    this._follow = true;
  }
}
