import { Streuner } from "./entities/Streuner.Entity";
import { NPCManager } from "./managers/NPCManager";
import { Drawable } from "./types/Drawable";
import { Updateable } from "./types/Updateable";

// A room is responsible for managing the entities and keep player within the bounds of the map.
export class Room implements Drawable, Updateable {
  public width: number;
  public height: number;

  private manager: NPCManager;

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
    // spawn new entities if needed

    this.manager.update();
    this.manager.spawnAllIn(this);

    // entityManager.update();
  }
}

export const entityManager = new NPCManager();
export const room = new Room(1000, 1000, entityManager);

entityManager.register(Streuner, 5);
