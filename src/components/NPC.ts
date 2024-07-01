import { Updateable } from "../types/Updateable";
import { Vector } from "../utils/Vector";
import { Entity } from "./Entity";

export class NPC extends Entity implements Updateable {
  private _passive: boolean;
  private _follow: boolean;

  constructor(entity: Entity) {
    super(
      entity.sprite,
      entity.position,
      entity.health,
      entity.reward,
      entity.speed,
      entity.damage,
    );

    this._follow = false;
    this._passive = false;
  }

  public update() {
    super.update();

    if (this.opponent && this._follow && !this.target) {
      const circleCenter = this.opponent.position;
      const circleRadius = 200; // Adjust the radius as needed

      const distanceToOpponent = this.position.distance(this.opponent.position);

      console.log(distanceToOpponent);

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

  public passive() {
    // only attack when attacked
    this._passive = true;
  }
}
