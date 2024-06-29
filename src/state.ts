import { Entity } from './entities/Entity';
import { Streuner } from './entities/Streuner.Entity';
import { player } from './player';
import { Updateable } from './types/Updateable';
import { Vector } from './utils/Vector';

export const entities: Entity[] = [];

class EntityManager implements Updateable {
  public update() {
    throw new Error('Method not implemented.');
  }
}

const streuner = new Streuner(new Vector(100, 100));
streuner.mark(player);
streuner.attack();
entities.push(streuner);
