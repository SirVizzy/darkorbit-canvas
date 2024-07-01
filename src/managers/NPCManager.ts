import { NPC } from "../components/NPC";
import { player } from "../player";
import { Room, isInPlayerView } from "../state";
import { Drawable } from "../types/Drawable";
import { Updateable } from "../types/Updateable";
import { Vector } from "../utils/Vector";

type Constructor = new (position: Vector) => NPC;

export class NPCManager implements Updateable, Drawable {
  public npcs: NPC[];

  private thresholds: Map<Constructor, number>;

  constructor() {
    this.npcs = [];
    this.thresholds = new Map();
  }

  public update() {
    this.updateAll();
    this.removeAllDead();
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.npcs.forEach((npc) => {
      // For performance considerations only draw NPCs that are close to the player.
      if (
        isInPlayerView(npc.position) ||
        player.opponent === npc ||
        npc.opponent === player
      ) {
        npc.draw(ctx);
      }
    });
  }

  public spawnAllIn(room: Room) {
    for (const [NPC, threshold] of this.thresholds) {
      if (this.countOf(NPC) < threshold) {
        this.spawn(NPC, room);
      }
    }
  }

  public register(NPC: Constructor, threshold: number) {
    this.thresholds.set(NPC, threshold);
  }

  private updateAll() {
    this.npcs.forEach((npc) => npc.update());
  }

  private removeAllDead() {
    this.npcs = this.npcs.filter((npc) => !npc.health.dead);
  }

  private countOf(constructor: Constructor) {
    return this.npcs.filter((npc) => npc instanceof constructor).length;
  }

  private spawn(NPC: Constructor, room: Room) {
    const randomX = Math.random() * room.width;
    const randomY = Math.random() * room.height;

    const position = new Vector(randomX, randomY);
    // Create a new entity of this type with the random position
    const entity = new NPC(position);
    // entity.mark(player);
    // // entity.attack();
    entity.follow(); // follow instant for now, future roam() method will be added

    // set entity's room
    entity.roam();
    entity.setRoom(room);

    this.npcs.push(entity);
    console.log(
      `New ${NPC.name} created at (${randomX}, ${randomY}). Total ${NPC.name}s: ${this.countOf(NPC)}`,
    );
  }
}
