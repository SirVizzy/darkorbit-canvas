import { BossDevolarium, Streuner } from "./entities/npcs/Streuner.NPC";
import { NPCManager } from "./managers/NPCManager";
import { player } from "./player";
import { Drawable } from "./types/Drawable";
import { Updateable } from "./types/Updateable";

// A room is responsible for managing the entities and keep player within the bounds of the map.
export class Room implements Drawable, Updateable {
  public width: number;
  public height: number;

  public manager: NPCManager;

  constructor(width: number, height: number, manager: NPCManager) {
    this.width = width;
    this.height = height;

    this.manager = manager;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#4287f5";
    ctx.fillRect(0, 0, this.width, this.height);
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
entityManager.register(BossDevolarium, 0);
