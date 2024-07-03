import { NPCManager } from "../managers/NPCManager";
import { player } from "../player";
import { isInPlayerView } from "../state";
import { Drawable } from "../types/Drawable";
import { Updateable } from "../types/Updateable";
import { Vector } from "../utils/Vector";

// A room is responsible for managing the entities and keep player within the bounds of the map.
export class Room implements Drawable, Updateable {
  public width: number;
  public height: number;

  public manager: NPCManager;

  private stars: Vector[] = [];

  constructor(width: number, height: number, manager: NPCManager) {
    this.width = width;
    this.height = height;

    this.manager = manager;

    const startsToDraw = (this.width * this.height) / 10_000;
    for (let i = 0; i < startsToDraw; i++) {
      const x = Math.random() * this.width;
      const y = Math.random() * this.height;

      this.stars.push(new Vector(x, y));
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.width, this.height);

    // draw stars
    ctx.fillStyle = "white";
    for (const star of this.stars) {
      if (isInPlayerView(star)) {
        ctx.fillRect(star.x, star.y, 1, 1);
      }
    }

    this.manager.draw(ctx);
  }

  public update() {
    this.manager.update();
    this.manager.spawnAllIn(this);

    // attack the player if aggresive and in range
    for (const npc of this.manager.npcs) {
      if (npc.inRangeOf(player) && npc.isAggressive() && npc.isNotAttacking()) {
        npc.mark(player);
        npc.attack();
      }

      npc.inBoundsOf(this);
      player.inBoundsOf(this);
    }
  }
}
