import { BossDevolarium, Streuner } from "./entities/npcs/Streuner.NPC";
import { NPCManager } from "./managers/NPCManager";
import { player } from "./player";
import { Drawable } from "./types/Drawable";
import { Updateable } from "./types/Updateable";
import { Vector } from "./utils/Vector";

export const isInPlayerView = (position: Vector) => {
  // check if location is in view of player (window width and height).
  const x = position.x - player.position.x;
  const y = position.y - player.position.y;

  return (
    Math.abs(x) < window.innerWidth / 2 && Math.abs(y) < window.innerHeight / 2
  );
};

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

    // generate stars
    for (let i = 0; i < 5000; i++) {
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
    // todo: make this class responsible of keeping all entities in bounds

    this.manager.update();
    this.manager.spawnAllIn(this);

    // attack the player if aggresive and in range
    for (const npc of this.manager.npcs) {
      if (npc.inRangeOf(player) && npc.isAggressive() && npc.isNotAttacking()) {
        npc.mark(player);
        npc.attack();
      }
    }
  }
}

export const entityManager = new NPCManager();
export const room = new Room(10000, 10000, entityManager);

entityManager.register(Streuner, 1000);
entityManager.register(BossDevolarium, 10);
