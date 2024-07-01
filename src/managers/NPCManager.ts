import { Entity } from "../components/Entity";
import { NPC } from "../components/NPC";
import { player } from "../player";
import { Room } from "../state";
import { Updateable } from "../types/Updateable";
import { Vector } from "../utils/Vector";

type EntityConstructor = new (position: Vector) => NPC;

export class NPCManager implements Updateable {
  public entities: Entity[];

  private thresholds: Map<EntityConstructor, number>;

  constructor() {
    this.entities = [];
    this.thresholds = new Map();
  }

  public update() {
    this.updateAll();
    this.removeAllDead();
  }

  public spawnAllIn(room: Room) {
    for (const [Entity, threshold] of this.thresholds) {
      if (this.countOf(Entity) < threshold) {
        this.spawn(Entity, room);
      }
    }
  }

  public register(Entity: EntityConstructor, threshold: number) {
    this.thresholds.set(Entity, threshold);
  }

  private updateAll() {
    this.entities.forEach((entity) => entity.update());
  }

  private removeAllDead() {
    this.entities = this.entities.filter((entity) => !entity.health.dead);
  }

  private countOf(constructor: EntityConstructor) {
    return this.entities.filter((entity) => entity instanceof constructor)
      .length;
  }

  private spawn(Entity: EntityConstructor, room: Room) {
    const randomX = Math.random() * room.width;
    const randomY = Math.random() * room.height;

    const position = new Vector(randomX, randomY);
    // Create a new entity of this type with the random position
    const entity = new Entity(position);
    entity.mark(player);
    // entity.attack();
    entity.follow(); // follow instant for now, future roam() method will be added

    // set entity's room
    entity.setRoom(room);

    this.entities.push(entity);
    console.log(
      `New ${Entity.name} created at (${randomX}, ${randomY}). Total ${Entity.name}s: ${this.countOf(Entity)}`,
    );
  }
}
