import { Entity } from './components/Entity';
import { Streuner } from './entities/Streuner.Entity';
import { player } from './player';
import { Updateable } from './types/Updateable';
import { Vector } from './utils/Vector';

export const entities: Entity[] = [];

interface EntityCreationConfig {
  entityConstructor: new (position: Vector) => Entity;
  threshold: number;
}

const entityCreationConfigs: { [key: string]: EntityCreationConfig } = {
  Streuner: {
    entityConstructor: Streuner,
    threshold: 3,
  },
  // Add more entity types as needed
};

class EntityManager implements Updateable {
  public update() {
    for (const key in entityCreationConfigs) {
      if (entityCreationConfigs.hasOwnProperty(key)) {
        const config = entityCreationConfigs[key];
        const entityType = config.entityConstructor;

        // Check if number of entities of this type is under threshold
        const countOfType = entities.filter((entity) => entity instanceof entityType).length;
        if (countOfType < config.threshold) {
          // Create a random position between -1000 and 1000
          const randomX = Math.random() * 2000 - 1000; // Random x between -1000 and 1000
          const randomY = Math.random() * 2000 - 1000; // Random y between -1000 and 1000
          const randomPosition = new Vector(randomX, randomY);

          // Create a new entity of this type with the random position
          const newEntity = new entityType(randomPosition);
          newEntity.mark(player);
          newEntity.attack();
          entities.push(newEntity);

          console.log(`New ${key} created at (${randomX}, ${randomY}). Total ${key}s: ${countOfType + 1}`);
        }
      }
    }
  }
}

export const entityManager = new EntityManager();
