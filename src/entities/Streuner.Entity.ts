import { Entity } from '../components/Entity';
import { Health } from '../components/Health';
import { Reward } from '../components/Reward';
import { StreunerSprite } from '../sprites/Streuner.Sprite';
import { Vector } from '../utils/Vector';

export class Streuner extends Entity {
  constructor(position: Vector) {
    super(new StreunerSprite(), position, new Health(800, 400, 0), new Reward(1, 400));
  }
}
