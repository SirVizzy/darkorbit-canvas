import { Entity } from './entities/Entity';
import { player } from './player';
import { BossDevolariumSprite } from './sprites/BossDevolarium.Sprite';
import { SentinelSprite } from './sprites/Sentinel.Sprite';
import { Sprite } from './sprites/Sprite';
import { StreunerSprite } from './sprites/Streuner.Sprite';
import { Vector } from './utils/Vector';

//  new Entity(new GoliathSprite()
export const entities: Entity[] = [];

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

  // take one random from sprite objects.
  const sprites = [
    {
      sprite: new StreunerSprite(),
      weight: 10,
    },
    {
      sprite: new SentinelSprite(),
      weight: 1,
    },
    {
      sprite: new BossDevolariumSprite(),
      weight: 1,
    },
  ];

  const getRandomSprite = () => {
    const total = sprites.reduce((acc, sprite) => acc + sprite.weight, 0);
    const random = Math.random() * total;

    let sum = 0;
    for (const sprite of sprites) {
      sum += sprite.weight;
      if (random < sum) {
        return sprite.sprite;
      }
    }

    return sprites[0].sprite as Sprite;
  };

  const entity = new Entity(getRandomSprite(), new Vector(x, y));

  entity.mark(player);
  entity.attack();

  entities.push(entity);
}
