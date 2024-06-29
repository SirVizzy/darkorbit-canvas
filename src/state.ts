import { Entity, Entity2 } from './entities/Entity';
import { Goliath } from './entities/Goliath.Entity';
import { Streuner } from './entities/Streuner.Entity';
import { player } from './player';
import { Vector } from './utils/Vector';

//  new Entity(new GoliathSprite()
export const entities: Entity[] = [];

// Draw a bunch of streuners randomly
// for (let i = 0; i < 10; i++) {
//   const x = Math.random() * 750;
//   const y = Math.random() * 750;

//   // todo make entity target streuner and make them always aim towards the target

//   const entity = new Streuner(new Vector(x, y));
//   entity.mark(player);
//   entities.push(entity);
// }

//  Draw a bunch of random streuners between -500 and 500 x and y
const randomNumberBetween = (min: number, max: number) => Math.random() * (max - min) + min;

for (let i = 0; i < 100; i++) {
  // only spawn entites outside of the viewport.
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Calculate random positions outside the viewport
  const x = randomNumberBetween(-width, 2 * width);
  const y = randomNumberBetween(-height, 2 * height);

  // Create either a Streuner or a Goliath with equal chances
  const entity = Math.random() > 0.1 ? new Streuner(new Vector(x, y)) : new Goliath(new Vector(x, y));

  // todo make entity target streuner and make them always aim towards the target

  // entity.target(player);

  entity.mark(player);
  entity.attack();

  entities.push(entity);

  // const entity2 = new Entity2(new Vector(0, 0));
  // entities.push(entity2);
}
