import { Entity } from "../components/Entity";
import { Streuner } from "../entities/Streuner.Entity";
import { player } from "../player";
import { Updateable } from "../types/Updateable";
import { Vector } from "../utils/Vector";

type EntityConstructor = new (position: Vector) => Entity;

export class EntityManager implements Updateable {
  public entities: Entity[];

  private thresholds: Map<EntityConstructor, number>;

  constructor() {
    this.entities = [];
    this.thresholds = new Map();
  }

  public update() {
    for (const [Entity, threshold] of this.thresholds) {
      if (this.countOf(Entity) < threshold) {
        this.spawn(Entity);
      }
    }
  }

  public register(Entity: EntityConstructor, threshold: number) {
    this.thresholds.set(Entity, threshold);
  }

  private countOf(constructor: EntityConstructor) {
    return this.entities.filter((entity) => entity instanceof constructor)
      .length;
  }

  private spawn(Entity: EntityConstructor) {
    const randomX = Math.random() * 2000 - 1000; // Random x between -1000 and 1000
    const randomY = Math.random() * 2000 - 1000; // Random y between -1000 and 1000

    const position = new Vector(randomX, randomY);

    // Create a new entity of this type with the random position
    const entity = new Entity(position);
    entity.mark(player);
    entity.attack();
    this.entities.push(entity);

    console.log(
      `New ${Entity.name} created at (${randomX}, ${randomY}). Total ${Entity.name}s: ${this.countOf(Entity)}`,
    );
  }
}

const manager = new EntityManager();

manager.register(Streuner, 3);

// for (const key in entityCreationConfigs) {
//   if (entityCreationConfigs.hasOwnProperty(key)) {
//     const config = entityCreationConfigs[key];
//     const entityType = config.entityConstructor;

//     // Check if number of entities of this type is under threshold
//     const countOfType = entities.filter((entity) => entity instanceof entityType).length;
//     if (countOfType < config.threshold) {
//       // Create a random position between -1000 and 1000
//       const randomX = Math.random() * 2000 - 1000; // Random x between -1000 and 1000
//       const randomY = Math.random() * 2000 - 1000; // Random y between -1000 and 1000
//       const randomPosition = new Vector(randomX, randomY);

//       // Create a new entity of this type with the random position
//       const newEntity = new entityType(randomPosition);
//       newEntity.mark(player);
//       newEntity.attack();
//       entities.push(newEntity);

//       console.log(`New ${key} created at (${randomX}, ${randomY}). Total ${key}s: ${countOfType + 1}`);
//     }
//   }
// }
