import { Entity } from './entities/Entity';
import { Health } from './entities/Health';
import { PhoenixSprite } from './sprites/Phoenix.Sprite';
import { Vector } from './utils/Vector';

class Player extends Entity {
  constructor() {
    super(new PhoenixSprite(), new Vector(0, 0), new Health(200000, 100000, 0));
  }
}

export const player = new Player();
